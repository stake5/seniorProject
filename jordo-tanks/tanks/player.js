
function Player(x,y, w,h, keyboard) {
    this.keyboard = keyboard;
    this.gamepad = null;
    this.controller = keyboard;
    var v = BLOCK_SIZE * .23;
    this.MAX_VEL = new vec2(BLOCK_SIZE * .03, v);
    this.MIN_VEL = new vec2(-v, -v);
    this.jumpVel = this.MAX_VEL.y;
    this.accel = BLOCK_SIZE * 0.01;
    this.gravityInc = BLOCK_SIZE * -0.02;
    this.spawn(x,y, w,h);
};

Player.prototype.spawn = function(x,y, w,h) {
    this.box = new box2(x,y, w,h);
    this.vel = new vec2(0,0);
    this.vel.x = this.MAX_VEL.x;
    this.alive = true;
    this.airborne = false;

    this.attackDir = new vec2(1,0);
    this.attacking = false;
    this.attackCounter = 0;
};

Player.prototype.jump = function() {
    if (!this.airborne) {
        this.airborne = true;
        this.vel.y = this.jumpVel;
    }
};

Player.prototype.update = function(map) {
    this.vel.y += this.gravityInc;
    this.vel.y = clamp(this.vel.y, this.MIN_VEL.y, this.MAX_VEL.y);

    var won = false;
    this.box.moveY(this.vel.y);
    var b = map.intersectsBox(this.box);
    if (b) {
        var type = b[0];
        b = b[1];
        won = (type == BLOCK_TYPE_GOLD);
        this.box.moveY(b.y);
        if (this.vel.y < 0) this.airborne = false;
        this.vel.y = 0.0;
    }
    else this.airborne = true;

    this.box.moveX(this.vel.x);
    b = map.intersectsBox(this.box);
    if (b) {
        var type = b[0];
        b = b[1];
        won = won || (type == BLOCK_TYPE_GOLD);
        this.box.moveX(b.x);
        var d = this.vel.x > 0 ? 1 : -1;
        if (map.canJump(this.box.pos, d)) this.jump();
        else if (!this.airborne) this.vel.x *= -1;
    }

    return won;
};

Player.prototype.draw = function(pencil) {
    pencil.scp.bind(pencil.square.vbo, pencil.square.numElements);
    pencil.scp.setColor(0,0,0,1);
    var size = this.box.width;
    var mvp = mat4_x_mat4_chain(
        pencil.projection,
        pencil.view,
        translate(this.box.pos.x, this.box.pos.y, 0),
        scale(size, size, 0)
    );
    pencil.scp.draw(mvp);

    // var p = new vec2(this.box.pos.x, this.box.pos.y);
    // size = this.box.width * .5;
    // p = p.addVec(this.attackDir.scale(size));
    // if (this.attacking) p = p.addVec(this.attackDir.scale(size*.5));
    // mvp = mat4_x_mat4_chain(
    //     pencil.projection,
    //     pencil.view,
    //     translate(p.x, p.y, 0),
    //     scale(size, size, 0)
    // );
    // pencil.scp.draw(mvp);
};






function Particle(x,y, dx,dy, color, sz) {
    this.pos = new vec2(x,y);
    this.vel = new vec2(dx,dy);
    this.color = color;
    this.size = sz;
    this.rotation = randomFromTo(0,360);
}

Particle.prototype.update = function(map) {
    // this.pos = this.pos.addVec(this.vel);

    this.pos.x += this.vel.x;
    if (map.intersectsPoint(this.pos)) {
        this.pos.x -= this.vel.x;
        this.vel.x *= -1;
    }

    this.pos.y += this.vel.y;
    if (map.intersectsPoint(this.pos)) {
        this.pos.y -= this.vel.y;
        // this.vel.y *= -.8;
        var r = (.2 + Math.random());
        if (r > .5) r = .5;
        this.vel.y *= -r;
    }

    this.vel.y -= BLOCK_SIZE * .01;

    if (this.vel.x < 0) this.rotation += 2;
    else if (this.vel.x > 0) this.rotation -= 2;

    this.color.w -= .03;
    this.size *= .98;
    this.vel = this.vel.scale(.98);
    return (this.color.w <= 0.1 || this.size <= .5);
};

Particle.prototype.draw = function(pencil) {
    pencil.scp.setColor(this.color.x, this.color.y, this.color.z, this.color.w);

    var mvp = mat4_x_mat4_chain(
        pencil.projection,
        pencil.view,
        translate(this.pos.x, this.pos.y, 0),
        rotateZ(this.rotation),
        scale(this.size, this.size, this.size)
    );
    pencil.scp.draw(mvp);
};

function ParticleManager(gl) {
    this.particles = [];
    this.mesh = null;
    this.gl = gl;
}

ParticleManager.prototype.constructMesh = function() {
    var gl = this.gl;
    var vertices = [];
    var colors = [];
    var z = 0;

    for (var i = 0; i < this.particles.length; i++) {
        var p = this.particles[i].pos;
        var halfSize = this.particles[i].size * .5;
        var c = this.particles[i].color;
        var l = p.x - halfSize;
        var r = p.x + halfSize;
        var b = p.y - halfSize;
        var t = p.y + halfSize;

        vertices.push(l, b, z);
        vertices.push(r, b, z);
        vertices.push(r, t, z);
        vertices.push(l, b, z);
        vertices.push(r, t, z);
        vertices.push(l, t, z);

        for (var j = 0; j < 6; j++) colors.push(c.x, c.y, c.z, c.w);
    }

    if (this.mesh) {
        gl.deleteBuffer(this.mesh.vbo);
        gl.deleteBuffer(this.mesh.cbo);
    }

    var mesh = {};
    mesh.vbo = createBufferObject(gl, vertices);
    mesh.cbo = createBufferObject(gl, colors);
    mesh.numElements = vertices.length / 3;
    this.mesh = mesh;
};

ParticleManager.prototype.addFlame = function(n, x,y, size, velMin, velMax, dx,dy) {
    var color = new vec4(1,.2,0,1);
    for (var i = 0; i < n; i++) {
        var d = new vec2(dx,dy);
        var randomRotation = -5 + (randomFromTo(0,10));
        d.rotate(vec2RotateInfo(randomRotation), new vec2(0,0));
        var randomVel = velMin + ((randomFromTo(0,100)/100.0) * velMax);
        d = d.scale(randomVel);
        var p = new Particle(x,y, d.x,d.y, color, size);
        this.particles.push(p);
    }
};

ParticleManager.prototype.addExplosion = function(n, x,y, size, velMin, velMax, r,g,b) {
    var startx = x - HALF_BLOCK_SIZE;
    var starty = y - HALF_BLOCK_SIZE;
    for (var i = 0; i < n; i++) {
        var d = new vec2(1,0);
        var randomRotation = randomFromTo(0,360);
        d.rotate(vec2RotateInfo(randomRotation), new vec2(0,0));
        var randomVel = velMin + ((randomFromTo(0,100)/100.0) * velMax);
        d = d.scale(randomVel);
        x = startx + randomFromTo(0, BLOCK_SIZE);
        y = starty + randomFromTo(0, BLOCK_SIZE);
        var p = new Particle(x,y, d.x,d.y, new vec4(r,g,b,2), size);
        this.particles.push(p);
    }
};

ParticleManager.prototype.update = function(map) {
    for (var i = 0; i < this.particles.length; i++) {
        if (this.particles[i].update(map)) {
            this.particles.splice(i, 1);
            i--;
        }
    }
    // this.constructMesh();
};

ParticleManager.prototype.draw = function(pencil) {
    // if (this.mesh == null) return;
    // var gl = this.gl;
    // var mvp = mat4_x_mat4_chain(pencil.projection, pencil.view, mat4ID());
    // pencil.cp.bind(this.mesh.vbo, this.mesh.cbo, this.mesh.numElements);
    // pencil.cp.draw(mvp);

    var gl = pencil.gl;
    pencil.scp.bind(pencil.square.vbo, pencil.square.numElements);
    for (var i = 0; i < this.particles.length; i++) this.particles[i].draw(pencil);
};

var GLOBAL_PARTICLES = new ParticleManager();

