function Renderer(canvas, gl) {
    this.canvas = canvas;
    this.gl = gl;
    this.aspectRatio = 0;
    this.fieldOfView = 70;
    this.screenSize = new vec2();
    this.reshape(canvas.width, canvas.height);

    gl.clearColor(0,0,0,1);
    gl.enable(gl.DEPTH_TEST);

    this.initColorShader(gl);
    this.initPyramid(gl);
    this.bindObjectToColorShader(gl);
    this.objectRotation = 0; // different
}

// Load shaders, get attribute locations, and get uniform locations
Renderer.prototype.initColorShader = function(gl) {
    // Shaders defined in index.html
    this.shaderProgramID = getShaderProgram(gl, "color_v", "color_f");
    gl.useProgram(this.shaderProgramID);

    this.vertexAttributeID = gl.getAttribLocation(this.shaderProgramID, "vertex");
    this.colorAttributeID  = gl.getAttribLocation(this.shaderProgramID, "color");

    this.mvpID = gl.getUniformLocation(this.shaderProgramID, "mvp");

    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
};

Renderer.prototype.initPyramid = function(gl) {
    // initial starting point of our pyramid
    var vertices = 
    [
        // front face
         0.0,  0.5,  0.0, // top vertex
        -0.5, -0.5,  0.5, // bottom left vertex
         0.5, -0.5,  0.5, // bottom right vertex

        // right face
         0.0,  0.5,  0.0, // top vertex
         0.5, -0.5,  0.5, // bottom left vertex
         0.5, -0.5, -0.5, // bottom right vertex

        // left face
         0.0,  0.5,  0.0, // top vertex
        -0.5, -0.5, -0.5, // bottom left vertex
        -0.5, -0.5,  0.5, // bottom right vertex

        // back face
         0.0,  0.5,  0.0, // top vertex
         0.5, -0.5, -0.5, // bottom left vertex
        -0.5, -0.5, -0.5  // bottom right vertex      

    ];

    // this array operates off of each specific vertex 
    // the 4 values are [red, green, blue, alpha]
    // alpha is a measure of opaqueness
    var colors = 
    [
        [1.0, 0.0, 0.0, 1.0], // Front face
        [1.0, 0.0, 1.0, 1.0], // Right face
        [0.0, 0.0, 1.0, 1.0], // Left face
        [1.0, 1.0, 0.0, 1.0]  // Back face
    ];

    //unpack the color array for each side
    var unpackedColors = [];
    for (var i in colors) 
    {
        var color = colors[i];
        for (var j=0; j < 3; j++) 
        {
            unpackedColors = unpackedColors.concat(color);
        }
    }

    // create the vertex buffer for the pyramid
    this.vbo = gl.createBuffer();

    // bind the buffer for the pyramid
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    
    // get the vertices ready to pass to webGL to fill its buffers
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // and each vertex has 3 elements
    this.numVertices = vertices.length / 3;

    // create the color buffer for the pyramid
    this.cbo = gl.createBuffer();

    // bind the color buffer for the pyramid
    gl.bindBuffer(gl.ARRAY_BUFFER, this.cbo);

    // get the vertices ready to pass to webGL to fill its buffers
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);
};

Renderer.prototype.bindObjectToColorShader = function(gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.vertexAttribPointer(this.vertexAttributeID, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.cbo);
    gl.vertexAttribPointer(this.colorAttributeID, 4, gl.FLOAT, false, 0, 0);
};

Renderer.prototype.reshape = function(w, h) {
    this.screenSize.x = w;
    this.screenSize.y = h;
    this.aspectRatio = w / h;
    this.gl.viewport(0, 0, w, h);
    this.perspectiveMatrix = perspectiveAspect(this.aspectRatio, this.fieldOfView, 0.1, 5000.0);
};

Renderer.prototype.update = function(rdirection) {
    this.objectRotation += rdirection;
    if (this.objectRotation > 360)
        this.objectRotation -= 360;
};

Renderer.prototype.draw = function(gl) {
    // reset the buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // you may want to draw back to front

    // define the view matrix
    var viewMatrix = translate(0,0,-100);

    // apply the transformation matrices
    var mvp = mat4_x_mat4_chain(
        this.perspectiveMatrix,
        viewMatrix,
        scale(50,50,50),
        rotateY(this.objectRotation));

    var mvpTranspose = mat4Transpose(mvp);
    gl.uniformMatrix4fv(this.mvpID, false, new Float32Array(mvpTranspose));
    gl.drawArrays(gl.TRIANGLES, 0, this.numVertices);

    gl.flush();
};