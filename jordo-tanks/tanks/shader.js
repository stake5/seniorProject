function Pencil(gl) {
    this.gl = gl;
    this.view = mat4ID();
    this.projection = mat4ID();

    this.square = createSquare(gl);
    this.cube = createCube(gl);

    this.cp  = new ColorProgram(gl);
    this.scp = new SolidColorProgram(gl);
    this.tp  = new TextureProgram(gl);
    this.dlp = new DirectionalLightProgram(gl);

    this.mapTexture = new TextureObject(gl, "image.png");
}


function SolidColorProgram(gl) {
    this.gl = gl;
    this.numElements = 0;
    this.programID = getShaderProgram(gl, "scp.vs", "scp.fs");
    gl.useProgram(this.programID);

    // Vertex
    this.vertexID = gl.getAttribLocation(this.programID, "vertex");

    // Matrix
    this.mvpID   = gl.getUniformLocation(this.programID, "mvp");
    this.colorID = gl.getUniformLocation(this.programID, "color");

    this.setColor(1, 1, 1, 1);
}

SolidColorProgram.prototype.cleanup = function() {
    var gl = this.gl;
    gl.deleteProgram(this.programID);
    gl.useProgram(0);
};

SolidColorProgram.prototype.bind = function(vbo, numElements) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.enableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(this.vertexID, 3, gl.FLOAT, false, 0, 0);

    this.numElements = numElements;
};

SolidColorProgram.prototype.setColor = function(r, g, b, a) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.uniform4f(this.colorID, r, g, b, a);
};

SolidColorProgram.prototype.draw = function(mvp) {
    var gl = this.gl;
    gl.useProgram(this.programID);

    var mvpTranspose = mat4Transpose(mvp);
    gl.uniformMatrix4fv(this.mvpID, false, new Float32Array(mvpTranspose));
    //gl.drawElements(gl.TRIANGLES, this.numElements, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, this.numElements);
};

SolidColorProgram.prototype.drawLines = function(mvp) {
    var gl = this.gl;
    gl.useProgram(this.programID);

    var mvpTranspose = mat4Transpose(mvp);
    gl.uniformMatrix4fv(this.mvpID, false, new Float32Array(mvpTranspose));
    gl.drawArrays(gl.LINES, 0, this.numElements);
};




function ColorProgram(gl) {
    this.gl = gl;
    this.numElements = 0;
    this.programID = getShaderProgram(gl, "color.vs", "color.fs");
    gl.useProgram(this.programID);

    // Vertex
    this.vertexID = gl.getAttribLocation(this.programID, "vertex");
    this.colorID  = gl.getAttribLocation(this.programID, "color");

    // Matrix
    this.mvpID   = gl.getUniformLocation(this.programID, "mvp");
}

ColorProgram.prototype.cleanup = function() {
    var gl = this.gl;
    gl.deleteProgram(this.programID);
    gl.useProgram(0);
};

ColorProgram.prototype.bind = function(vbo, cbo, numElements) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(this.vertexID, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cbo);
    gl.vertexAttribPointer(this.colorID, 4, gl.FLOAT, false, 0, 0);

    this.numElements = numElements;
};

ColorProgram.prototype.bindElements = function(vbo, cbo, ibo, numElements) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(this.vertexID, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cbo);
    gl.vertexAttribPointer(this.colorID, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    this.numElements = numElements;
};

ColorProgram.prototype.draw = function(mvp) {
    var gl = this.gl;
    gl.useProgram(this.programID);

    var mvpTranspose = mat4Transpose(mvp);
    gl.uniformMatrix4fv(this.mvpID, false, new Float32Array(mvpTranspose));
    //gl.drawElements(gl.TRIANGLES, this.numElements, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, this.numElements);
};

ColorProgram.prototype.drawElements = function(mvp) {
    var gl = this.gl;
    gl.useProgram(this.programID);

    var mvpTranspose = mat4Transpose(mvp);
    gl.uniformMatrix4fv(this.mvpID, false, new Float32Array(mvpTranspose));
    gl.drawElements(gl.TRIANGLES, this.numElements, gl.UNSIGNED_SHORT, 0);
};








function DirectionalLightProgram(gl) {
    this.gl = gl;
    this.numElements = 0;
    this.programID = getShaderProgram(gl, "dlp.vs", "dlp.fs");
    gl.useProgram(this.programID);

    // Attributes
    this.vertexID = gl.getAttribLocation(this.programID, "vertex");
    this.normalID = gl.getAttribLocation(this.programID, "normal");

    // Uniforms
    this.mvpID          = gl.getUniformLocation(this.programID, "mvp");
    this.normalMatrixID = gl.getUniformLocation(this.programID, "normalMatrix");
    this.colorID        = gl.getUniformLocation(this.programID, "color");
    this.lightDirID     = gl.getUniformLocation(this.programID, "lightDir");

    this.setColor(1, 1, 1, 1);
    this.setLightDirection(0, 1, 0);
}

DirectionalLightProgram.prototype.cleanup = function() {
    var gl = this.gl;
    gl.deleteProgram(this.programID);
    gl.useProgram(0);
};

DirectionalLightProgram.prototype.bind = function(vbo, nbo, numElements) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(this.vertexID, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, nbo);
    gl.vertexAttribPointer(this.normalID, 3, gl.FLOAT, false, 0, 0);

    this.numElements = numElements;
};

DirectionalLightProgram.prototype.setColor = function(r, g, b, a) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.uniform4f(this.colorID, r, g, b, a);
};

DirectionalLightProgram.prototype.setLightDirection = function(x, y, z) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.uniform3f(this.lightDirID, x, y, z);
};

DirectionalLightProgram.prototype.draw = function(m, v, p) {
    var gl = this.gl;
    gl.useProgram(this.programID);

    var normalMatrix = mat4ToMat3(m);
    var normalMatrixTranspose = mat3Transpose(normalMatrix);

    var mvp = mat4_x_mat4_chain(p, v, m);
    var mvpTranspose = mat4Transpose(mvp);

    gl.uniformMatrix4fv(this.mvpID, false, new Float32Array(mvpTranspose));
    gl.uniformMatrix3fv(this.normalMatrixID, false, new Float32Array(normalMatrixTranspose));

    gl.drawArrays(gl.TRIANGLES, 0, this.numElements);

    // gl.disableVertexAttribArray(1);
    // gl.disableVertexAttribArray(2);
};








function TextureProgram(gl) {
    this.gl = gl;
    this.numElements = 0;
    this.programID = getShaderProgram(gl, "tp.vs", "tp.fs");
    gl.useProgram(this.programID);

    // Attributes
    this.vertexID = gl.getAttribLocation(this.programID, "vertex");
    this.uvID     = gl.getAttribLocation(this.programID, "uv");

    // Uniforms
    this.mvpID     = gl.getUniformLocation(this.programID, "mvp");
    this.colorID   = gl.getUniformLocation(this.programID, "color");
    this.samplerID = gl.getUniformLocation(this.programID, "sampler");

    this.setColor(1, 1, 1, 1);
}

TextureProgram.prototype.cleanup = function() {
    var gl = this.gl;
    gl.deleteProgram(this.programID);
    gl.useProgram(0);
};

TextureProgram.prototype.bind = function(vbo, uvb, numElements) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(this.vertexID, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, uvb);
    gl.vertexAttribPointer(this.uvID, 2, gl.FLOAT, false, 0, 0);

    this.numElements = numElements;
};

TextureProgram.prototype.bindTexture = function(textureID) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureID);
    gl.uniform1i(this.samplerID, 0);
};

TextureProgram.prototype.setColor = function(r, g, b, a) {
    var gl = this.gl;
    gl.useProgram(this.programID);
    gl.uniform4f(this.colorID, r, g, b, a);
};

TextureProgram.prototype.draw = function(mvp) {
    var gl = this.gl;
    gl.useProgram(this.programID);

    var mvpTranspose = mat4Transpose(mvp);
    gl.uniformMatrix4fv(this.mvpID, false, new Float32Array(mvpTranspose));

    gl.drawArrays(gl.TRIANGLES, 0, this.numElements);
};






function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        console.log("Shader could not be found with id: " + id);
        return null;
    }

    var shader;
    if (shaderScript.type == "fragment_shader")
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    else if (shaderScript.type == "vertex_shader")
        shader = gl.createShader(gl.VERTEX_SHADER);
    else return null;

    gl.shaderSource(shader, shaderScript.innerHTML);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function getShaderProgram(gl, vShaderID, fShaderID) {
    var fragmentShader = this.getShader(gl, vShaderID);
    var vertexShader   = this.getShader(gl, fShaderID);
    var programID = gl.createProgram();
    gl.attachShader(programID, vertexShader);
    gl.attachShader(programID, fragmentShader);
    gl.linkProgram(programID);
    if (!gl.getProgramParameter(programID, gl.LINK_STATUS))
        console.log("Could not initialise shaders");
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return programID;
}

