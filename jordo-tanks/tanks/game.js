
function Game(canvas, gl, mapData) {
    this.canvas = canvas;
    this.gl = gl;
    GLOBAL_PARTICLES.gl = gl;

    // Keyboard state
    this.keysDown = [];
    for (var i = 0; i < 256; i++) this.keysDown[i] = false;
    this.mouse = new vec2(0,0);

    gl.clearColor(0,.75,1,1);
    // gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    //gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.reshape(canvas.width, canvas.height);

    // Pencil
    this.pencil = new Pencil(gl);

    this.tank = new Tank(0,0,0, 20,10,30, 1,0,0);

    this.cameraPosition = new vec3(100, 100, 0);
    this.cameraRotation = new vec3(0,0,0);
}

Game.prototype.reshape = function(w, h) {
    var halfW = w * .5;
    var halfH = h * .5;
    this.aspectRatio = w / h;
    this.gl.viewport(0, 0, w, h);

    var viewDist = 10000.0;
    this.perspectiveProjection = perspectiveAspect(this.aspectRatio, 70.0, 0.1, viewDist);
    this.orthoProjection = ortho(-halfW, halfW, -halfH, halfH, 0.1, viewDist);
    this.hudProjection = ortho(0, w, 0, h, 0.1, viewDist);
};

Game.prototype.keyDown = function(key) {
    if (this.keysDown[key]) return;
    if (this.keysDown[KEY_TAB]) console.log(key);
    this.keysDown[key] = true;
};
Game.prototype.keyUp = function(key) {
    this.keysDown[key] = false;
};
Game.prototype.mouseMoved = function(x, y) {
    var mouseChangeX = x - this.mouse.x;
    var mouseChangeY = y - this.mouse.y;
    this.cameraRotation.y += mouseChangeX * .25;
    this.cameraRotation.z -= mouseChangeY * .25;
    while (this.cameraRotation.y < -360) this.cameraRotation.y += 360;
    while (this.cameraRotation.y >  360) this.cameraRotation.y -= 360;
    if (this.cameraRotation.z <  5) this.cameraRotation.z =  5;
    if (this.cameraRotation.z > 89) this.cameraRotation.z = 89;

    var rotationMatrix = mat4_x_mat4_chain(
        rotateY(this.cameraRotation.y),
        rotateZ(this.cameraRotation.z));
    this.cameraPosition = mat4_x_vec3(rotationMatrix, new vec3(150,0,0));

    this.mouse.x = x;
    this.mouse.y = y;
};
Game.prototype.mouseDown = function(x, y) {
    this.mouse.x = x;
    this.mouse.y = y;
};

Game.prototype.update = function() {
    this.tank.update(this.keysDown);
};

Game.prototype.draw = function(t) {
    var pencil = this.pencil;
    var gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var w = this.canvas.width;
    var h = this.canvas.height;
    var halfW = w * .5;
    var halfH = h * .5;

    // Matrices
    var cam = this.cameraPosition.addVec(this.tank.position);
    pencil.view = lookAt(cam, this.tank.position, new vec3(0,1,0));
    pencil.projection = this.perspectiveProjection;

    var mvp = mat4_x_mat4_chain(
        pencil.projection,
        pencil.view,
        translate(0,-100,0),
        scale(200,200,200)
    );
    pencil.scp.bind(pencil.cube.vbo, pencil.cube.numElements);
    pencil.scp.setColor(0,0,1,1);
    pencil.scp.draw(mvp);

    this.tank.draw(pencil, this.cameraRotation);

    gl.flush();
};
