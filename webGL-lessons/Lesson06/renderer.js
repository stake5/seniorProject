function Renderer(canvas, gl) {
    this.canvas = canvas;
    this.gl = gl;
    this.aspectRatio = 0;
    this.fieldOfView = 70;
    this.screenSize = new vec2();
    this.reshape(canvas.width, canvas.height);

    gl.clearColor(0,0,0,1);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    this.initTextureShader(gl);
    this.initTextureCube(gl);
    this.bindObjectToTextureShader(gl);
    this.objectRotation = 0;

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    this.tank1 = { "rotationY": 0.0, "rotationX":0.0 };
}

Renderer.prototype.initTextureShader = function(gl) {
    // Shaders defined in index.html
    this.shaderProgramID = getShaderProgram(gl, "texture_v", "texture_f");
    gl.useProgram(this.shaderProgramID);

    this.vertexAttributeID = gl.getAttribLocation(this.shaderProgramID, "vertex");
    this.uvAttributeID     = gl.getAttribLocation(this.shaderProgramID, "uv");

    this.mvpID = gl.getUniformLocation(this.shaderProgramID, "mvp");
    this.samplerID = gl.getUniformLocation(this.shaderProgramID, "sampler");

    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
};

Renderer.prototype.initTextureCube = function(gl) {
    var hs = 0.5;
    var l = -hs, r =  hs; // left, right
    var n =  hs, f = -hs; // near, far
    var b = -hs, t =  hs; // bottom, top

    var vertices = [
        // front face
        l,b,n,  r,b,n,  r,t,n,
        l,b,n,  r,t,n,  l,t,n,

        // back face
        r,b,f,  l,b,f,  l,t,f,
        r,b,f,  l,t,f,  r,t,f,

        // right face
        r,b,n,  r,b,f,  r,t,f,
        r,b,n,  r,t,f,  r,t,n,

        // left face
        l,b,f,  l,b,n,  l,t,n,
        l,b,f,  l,t,n,  l,t,f,

        // top face
        l,t,n,  r,t,n,  r,t,f,
        l,t,n,  r,t,f,  l,t,f,

        // bottom face
        l,b,f,  r,b,f,  r,b,n,
        l,b,f,  r,b,n,  l,b,n
    ];
    this.numVertices = vertices.length / 3;

    // NEED TO KNOW WHAT THIS IS
    var uvs = [];
    for (var i = 0; i < 6; i++) {
        uvs.push(
            0,0,  1,0,  1,1,
            0,0,  1,1,  0,1
        );
    }

    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    this.uvb = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);

    // create a texture reference 
    this.textureID = gl.createTexture();

    // make tankTexture the current texture to use
    loadTexture(gl, this.textureID, "tankTexture.png");
};

Renderer.prototype.bindObjectToTextureShader = function(gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.vertexAttribPointer(this.vertexAttributeID, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvb);
    gl.vertexAttribPointer(this.uvAttributeID, 2, gl.FLOAT, false, 0, 0);

    // the active texture is texture 0
    gl.activeTexture(gl.TEXTURE0);

    // bind the texture to the cube
    gl.bindTexture(gl.TEXTURE_2D, this.textureID);

    // uniform texture
    gl.uniform1i(this.samplerID, 0);
};

Renderer.prototype.reshape = function(w, h) {
    this.screenSize.x = w;
    this.screenSize.y = h;
    this.aspectRatio = w / h;
    this.gl.viewport(0, 0, w, h);
    this.perspectiveMatrix = perspectiveAspect(this.aspectRatio, this.fieldOfView, 0.1, 5000.0);
};

Renderer.prototype.update = function() {
    if (currentlyPressedKeys[37]) {
        this.tank1.rotationY += 1;
    }
    if (currentlyPressedKeys[39]) {
        this.tank1.rotationY -= 1;
    }
    if (currentlyPressedKeys[38]) {
        this.tank1.rotationX += 1;
    }
    if (currentlyPressedKeys[40]) {
        this.tank1.rotationX -= 1;
    }

   // this.objectRotation += .25;
    if (this.objectRotation > 360)
        this.objectRotation -= 360;
};

Renderer.prototype.draw = function(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var viewMatrix = translate(0,0,-100);
    var mvp = mat4_x_mat4_chain(
        this.perspectiveMatrix,
        viewMatrix,
        scale(50,50,50),
        rotateY(this.tank1.rotationY),
        rotateX(this.tank1.rotationX));
    var mvpTranspose = mat4Transpose(mvp);
    gl.uniformMatrix4fv(this.mvpID, false, new Float32Array(mvpTranspose));
    gl.drawArrays(gl.TRIANGLES, 0, this.numVertices);

    gl.flush();
};

