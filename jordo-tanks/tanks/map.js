
var MAP_SIZE = 5;
var shortestWindowDimension = window.innerHeight;
if (window.innerWidth < window.innerHeight)
    shortestWindowDimension = window.innerWidth;
var BLOCK_SIZE = shortestWindowDimension / (MAP_SIZE + 1);
var HALF_BLOCK_SIZE = BLOCK_SIZE * .5;

var BLOCK_TYPE_NULL      = 0;
var BLOCK_TYPE_DIRT      = 1;
var BLOCK_TYPE_ROCK      = 2;
var BLOCK_TYPE_SAND      = 3;
var BLOCK_TYPE_EXPLOSIVE = 4;
var BLOCK_TYPE_GOLD      = 5;

var EXPLOSION_RADIUS     = 2.5;
var EXPLOSION_RADIUS_INT = 3;

function GameMap(gl, mapData) {
    mapData = mapData.split(" ");
    this.gl = gl;
    this.playerSpawnPoint = new vec2(0,0);

    var dataIndex = 0;
    this.w = parseInt(mapData[dataIndex++]);
    this.h = parseInt(mapData[dataIndex++]);

    MAP_SIZE = this.w;
    shortestWindowDimension = window.innerHeight;
    if (window.innerWidth < window.innerHeight)
        shortestWindowDimension = window.innerWidth;
    BLOCK_SIZE = shortestWindowDimension / (MAP_SIZE + 1);
    HALF_BLOCK_SIZE = BLOCK_SIZE * .5;

    this.blocks = [];
    this.sandBlocks = [];
    for (var c = 0; c < this.w; c++) {
        var x = (c * BLOCK_SIZE) + HALF_BLOCK_SIZE;
        this.blocks.push([]);
        for (var r = 0; r < this.h; r++) {
            var y = (r * BLOCK_SIZE) + HALF_BLOCK_SIZE;
            if (c == 1 && r == this.h-2)
                this.playerSpawnPoint = new vec2(x,y);
            var type = parseInt(mapData[dataIndex++]);
            var block = new box2(x,y, BLOCK_SIZE, BLOCK_SIZE, type);
            this.blocks[c].push(block);
            if (type == BLOCK_TYPE_SAND) {
                // this.sandBlocks.push(block);
            }
        }
    }

    // this.w = MAP_SIZE;
    // this.h = MAP_SIZE;
    // this.blocks = [];
    // for (var c = 0; c < this.w; c++) {
    //     var x = (c * BLOCK_SIZE) + HALF_BLOCK_SIZE;
    //     this.blocks.push([]);
    //     for (var r = 0; r < this.h; r++) {
    //         var y = (r * BLOCK_SIZE) + HALF_BLOCK_SIZE;
    //         var type = BLOCK_TYPE_DIRT;
    //         if (c == 0 || c == this.w-1 || r == 0 || r == this.h-1)
    //             type = BLOCK_TYPE_ROCK;
    //         else if (randomFromTo(0,20) == 0)
    //             type = BLOCK_TYPE_EXPLOSIVE;

    //         var a = randomFromTo(3, 50);
    //         if (a == 10) type = BLOCK_TYPE_ROCK;

    //         if ((c == 1 && r == this.h-2) || (c == 2 && r == this.h-2)) {
    //             type = BLOCK_TYPE_NULL;
    //             this.playerSpawnPoint = new vec2(x, y);
    //         }

    //         var block = new box2(x,y, BLOCK_SIZE, BLOCK_SIZE, type);
    //         this.blocks[c].push(block);
    //     }
    // }

    // this.blocks[this.w-2][1].type = BLOCK_TYPE_GOLD;

    this.center = new vec2(this.w * HALF_BLOCK_SIZE, this.h * HALF_BLOCK_SIZE);
    var halfMap = new vec2(this.w * HALF_BLOCK_SIZE, this.h * HALF_BLOCK_SIZE);
    var windowCenter = new vec2(window.innerWidth * .5, window.innerHeight * .5);
    this.bottomLeft = new vec2(windowCenter.x - halfMap.x, windowCenter.y - halfMap.y);

    // this.recursiveExplosions = [];
    this.mesh = null;
    this.constructMesh();
}

GameMap.prototype.getColor = function(block_type) {
    switch (block_type) {
        case BLOCK_TYPE_DIRT: {
            return new vec4(.2,.2,.2,1);
            break;
        }
        case BLOCK_TYPE_ROCK: {
            return new vec4(0,0,0,1);
            break;
        }
        case BLOCK_TYPE_EXPLOSIVE: {
            return new vec4(1,0,0,1);
            break;
        }
        case BLOCK_TYPE_SAND: {
            return new vec4(1,1,.5,1);
            break;
        }
        case BLOCK_TYPE_GOLD: {
            return new vec4(1,1,0,1);
            break;
        }
        default: {
            return new vec4(1,1,1,1);
            break;
        }
    }
};

GameMap.prototype.constructMesh = function() {
    var gl = this.gl;
    var vertices = [];
    var colors = [];
    var bufferUVs = [];
    var uvs = getUVs(512, 512, 32, 32, 0.005);
    var z = 0;

    for (var c = 0; c < this.w; c++) {
        for (var r = 0; r < this.h; r++) {
            if (true) {//this.blocks[c][r].type != BLOCK_TYPE_NULL) {
                var bl = this.blocks[c][r].min;
                var tr = this.blocks[c][r].max;
                var br = new vec2(tr.x, bl.y);
                var tl = new vec2(bl.x, tr.y);

                vertices.push(bl.x, bl.y, z);
                vertices.push(br.x, br.y, z);
                vertices.push(tr.x, tr.y, z);

                vertices.push(bl.x, bl.y, z);
                vertices.push(tr.x, tr.y, z);
                vertices.push(tl.x, tl.y, z);

                var color = this.getColor(this.blocks[c][r].type);
                for (var i = 0; i < 6; i++)
                    colors.push(color.x, color.y, color.z, color.w);

                var ti = this.blocks[c][r].type;
                var uv = ti * 4;
                bufferUVs.push(uvs[uv  ].x, uvs[uv  ].y);
                bufferUVs.push(uvs[uv+1].x, uvs[uv+1].y);
                bufferUVs.push(uvs[uv+2].x, uvs[uv+2].y);

                bufferUVs.push(uvs[uv  ].x, uvs[uv  ].y);
                bufferUVs.push(uvs[uv+2].x, uvs[uv+2].y);
                bufferUVs.push(uvs[uv+3].x, uvs[uv+3].y);
            }
        }
    }

    if (this.mesh) {
        gl.deleteBuffer(this.mesh.vbo);
        gl.deleteBuffer(this.mesh.cbo);
        gl.deleteBuffer(this.mesh.uvb);
    }

    var mesh = {};
    mesh.vbo = createBufferObject(gl, vertices);
    mesh.cbo = createBufferObject(gl, colors);
    mesh.uvb = createBufferObject(gl, bufferUVs);
    mesh.numElements = vertices.length / 3;
    this.mesh = mesh;
};

GameMap.prototype.setBlock = function(p, t) {
    var b = this.blockIndicesAtPoint(p);
    this.blocks[b.x][b.y].type = t;
    this.constructMesh();
};

GameMap.prototype.intersectsBox = function(b) {
    var min = this.blockIndicesAtPoint(b.min);
    var max = this.blockIndicesAtPoint(b.max);
    for (var c = min.x; c <= max.x; c++) {
        for (var r = min.y; r <= max.y; r++) {
            if (this.blocks[c][r].type) {
                if (intersects_box2_box2(b, this.blocks[c][r]))
                    return [ this.blocks[c][r].type, tv_box2_box2(b, this.blocks[c][r]) ];
            }
        }
    }
    return null;
};

GameMap.prototype.intersectsPoint = function(p) {
    var i = this.blockIndicesAtPoint(p);
    if (this.blocks[i.x][i.y].type)
        if (intersects_box2_point(this.blocks[i.x][i.y], p))
            return true;
    return false;
};

GameMap.prototype.blockIndicesAtPoint = function(p) {
    var c = clamp(Math.floor(p.x / BLOCK_SIZE), 0, this.w - 1);
    var r = clamp(Math.floor(p.y / BLOCK_SIZE), 0, this.h - 1);
    return new vec2(c, r);
};

GameMap.prototype.blockIsNull = function(c, r) {
    if (c < 0 || c >= this.w || r < 0 || r >= this.h) return true;
    return this.blocks[c][r].type == BLOCK_TYPE_NULL;
};

GameMap.prototype.canBeAttacked = function(type) {
    return (type == BLOCK_TYPE_DIRT || type == BLOCK_TYPE_BRITTLE || type == BLOCK_TYPE_EXPLOSIVE);
};

GameMap.prototype.explode = function(c, r) {
    if (this.blockIsNull(c, r)) return null;
    var type = this.blocks[c][r].type;
    if (type == BLOCK_TYPE_EXPLOSIVE) {
        this.explodeMany(c, r, EXPLOSION_RADIUS, EXPLOSION_RADIUS_INT);
        this.constructMesh();
        var dir = p.subtVec(this.blocks[c][r].pos);
        dir.normalize();
        return dir;
    }
    else {
        if (this.explodeOne(c, r)) {
            this.constructMesh();
            return new vec2(0,0);
        }
    }
    return null;
};

GameMap.prototype.explodeOne = function(c, r) {
    if (this.blocks[c][r].type == BLOCK_TYPE_ROCK ||
        this.blocks[c][r].type == BLOCK_TYPE_NULL) return false;
    p = this.blocks[c][r].pos;
    var cl = this.getColor(this.blocks[c][r].type);
    GLOBAL_PARTICLES.addExplosion(4, p.x,p.y, BLOCK_SIZE * .5, 1,1, cl.x,cl.y,cl.z);
    this.blocks[c][r].type = BLOCK_TYPE_NULL;
    return true;
};

GameMap.prototype.explodeMany = function(c, r, radius, radiusInt) {
    var minc = c-radiusInt; var maxc = c+radiusInt;
    var minr = r-radiusInt; var maxr = r+radiusInt;
    minc = clamp(minc, 0, this.w-1);
    maxc = clamp(maxc, 0, this.w-1);
    minr = clamp(minr, 0, this.h-1);
    maxr = clamp(maxr, 0, this.h-1);
    var a = new vec2(c, r);
    var recursiveExplosions = [];
    for (var c = minc; c <= maxc; c++) {
        for (var r = minr; r <= maxr; r++) {
            var b = new vec2(c, r);
            if (a.distance(b) <= radius) {
                if (this.blocks[c][r].type == BLOCK_TYPE_EXPLOSIVE)
                    recursiveExplosions.push([c,r]);
                this.explodeOne(c,r);
            }
        }
    }
    for (var i = 0; i < recursiveExplosions.length; i++) {
        var c = recursiveExplosions[i][0];
        var r = recursiveExplosions[i][1];
        this.explodeMany(c,r, radius, radiusInt);
    }
};

GameMap.prototype.attack = function(p, d) {
    var b = this.blockIndicesAtPoint(p);
    b.x += d.x;
    b.y += d.y;
    if (this.blockIsNull(b.x, b.y)) return null;
    var type = this.blocks[b.x][b.y].type;
    if (type == BLOCK_TYPE_EXPLOSIVE) {
        this.explodeMany(b.x, b.y, EXPLOSION_RADIUS, EXPLOSION_RADIUS_INT);
        this.constructMesh();
        var dir = p.subtVec(this.blocks[b.x][b.y].pos);
        dir.normalize();
        return dir;
    }
    else {
        if (this.explodeOne(b.x, b.y)) {
            this.constructMesh();
            return new vec2(0,0);
        }
    }
    return null;
};

GameMap.prototype.canJump = function(p, d) {
    // var p0 = p.addVec(new vec2(p.x + d * BLOCK_SIZE, p.y));
    // var p1 = p0.addVec(new vec2(0, p0.y + BLOCK_SIZE));
    var p0 = new vec2(p.x,                    p.y + BLOCK_SIZE);
    var p1 = new vec2(p.x + (d * BLOCK_SIZE), p.y + BLOCK_SIZE);
    var b0 = this.blockIndicesAtPoint(p0);
    var b1 = this.blockIndicesAtPoint(p1);
    return this.blockIsNull(b0.x, b0.y) && this.blockIsNull(b1.x, b1.y);
};

GameMap.prototype.alertMap = function() {
    var str = "" + this.w + " " + this.h + " ";
    for (var c = 0; c < this.w; c++) {
        for (var r = 0; r < this.h; r++) {
            str += this.blocks[c][r].type + " ";
        }
    }
    alert(str);
};

GameMap.prototype.update = function() {
    // if (this.recursiveExplosions.length > 1) {
    //     var c = this.recursiveExplosions[0][0];
    //     var r = this.recursiveExplosions[0][1];
    //     this.recursiveExplosions.splice(0,1);
    //     this.explodeMany(c, r, EXPLOSION_RADIUS, EXPLOSION_RADIUS_INT);
    //     this.constructMesh();
    // }
};

GameMap.prototype.draw = function(pencil) {
    if (this.mesh == null) return;
    var gl = this.gl;

    var mvp = mat4_x_mat4_chain(pencil.projection, pencil.view, mat4ID());
    pencil.cp.bind(this.mesh.vbo, this.mesh.cbo, this.mesh.numElements);
    pencil.cp.draw(mvp);

    // var c = this.getColor(BLOCK_TYPE_SAND);
    // pencil.scp.bind(pencil.square.vbo, this.mesh.numElements);
    // pencil.scp.setColor(c.x, c.y, c.z, c.w);
    // for (var i = 0; i < this.sandBlocks.length; i++) {
    //     var p = this.sandBlocks[i].pos;
    //     mvp = mat4_x_mat4_chain(
    //         pencil.projection, pencil.view,
    //         translate(p.x, p.y, 0),
    //         scale(BLOCK_SIZE, BLOCK_SIZE, 0));
    //         pencil.scp.draw(mvp);
    // }

    // pencil.tp.bind(this.mesh.vbo, this.mesh.uvb, this.mesh.numElements);
    // pencil.tp.setColor(1,1,1,1);
    // pencil.tp.bindTexture(pencil.tilesheet.glID);
    // pencil.tp.draw(mvp);
};

