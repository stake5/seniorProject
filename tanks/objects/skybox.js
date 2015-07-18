function Skybox(x, y, z)
{
    this.position = [x, y, z];
    this.direction = [0, 0, 0]; 
    this.distance = 0.0;
    this.rotation = [0, 0, 0];
}

// Fill the buffer with the values that define Skybox.
Skybox.prototype.setGeometry = function(gl) 
{
    //TODO: make this able to be tracked
    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    this.vertices = new Float32Array([
          // Front face
        -5.0, -5.0,  5.0, 
        -5.0,  5.0,  5.0,
         5.0, -5.0,  5.0,

        -5.0,  5.0,  5.0,
         5.0,  5.0,  5.0,
         5.0, -5.0,  5.0,

        // Back face
        -5.0, -5.0, -5.0,
         5.0, -5.0, -5.0,
        -5.0,  5.0, -5.0,

        -5.0,  5.0, -5.0,
         5.0, -5.0, -5.0,
         5.0,  5.0, -5.0,

        // Top face
        -5.0,  5.0, -5.0,
         5.0,  5.0, -5.0,
        -5.0,  5.0,  5.0,

        -5.0,  5.0,  5.0,
         5.0,  5.0, -5.0,
         5.0,  5.0,  5.0,

        // Bottom face
        -5.0, -5.0, -5.0,
        -5.0, -5.0,  5.0,
         5.0, -5.0, -5.0,

        -5.0, -5.0,  5.0,
         5.0, -5.0,  5.0,
         5.0, -5.0, -5.0,

        // Right face
         5.0, -5.0, -5.0,
         5.0, -5.0,  5.0,
         5.0,  5.0, -5.0,

         5.0, -5.0,  5.0,
         5.0,  5.0,  5.0,
         5.0,  5.0, -5.0,

        // Left face
        -5.0, -5.0, -5.0,
        -5.0,  5.0, -5.0,
        -5.0, -5.0,  5.0,

        -5.0,  5.0, -5.0,
        -5.0,  5.0,  5.0,
        -5.0, -5.0,  5.0
    ]);
    
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    this.vbo.itemSize = 3;
    this.vbo.numItems = this.vertices.length / this.vbo.itemSize;
}

Skybox.prototype.setColors = function(gl) 
{
    this.cbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.cbo);
    // this.colors = new Uint8Array(helpers.randomColors(this.vertices.length));
   this.colors = new Uint8Array([
         // left column front
       0,    0,   0,
       0,  191, 255,
       0,    0,   0,
       0,  191, 255,
       0,  191, 255,
       0,    0,   0,

           // left column front
       0,    0,   0,
       0,    0,   0,
       0,  191, 255,
       0,  191, 255,
       0,    0,   0,
       0,  191, 255,
           // left column front
       0,  191, 255,
       0,  191, 255,
       0,  191, 255,
       0,  191, 255,
       0,  191, 255,
       0,  191, 255,
           // left column front
       0,    0,   0,
       0,    0,   0,
       0,    0,   0,
       0,    0,   0,
       0,    0,   0,
       0,    0,   0,
           // left column front
       0,    0,   0,
       0,    0,   0,
       0,  191, 255,
       0,    0,   0,
       0,  191, 255,
       0,  191, 255,
           // left column front
       0,    0,   0,
       0,  191, 255,
       0,    0,   0,
       0,  191, 255,
       0,  191, 255,
       0,    0,   0,
       ]);
    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    this.cbo.itemSize = 3;
    this.cbo.numItems = this.colors.length / this.cbo.itemSize;
}
