function Skybox()
{
    this.position = [0, 0, 0];
    this.direction = [0, 0, 0]; 
    this.distance = 0.0;
    this.rotation = [0, 0, 0];
}

// Fill the buffer with the values that define Skybox.
Skybox.prototype.setGeometry = function() 
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

Skybox.prototype.setColors = function() 
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

Skybox.prototype.setNormals = function() 
{
    this.nbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.nbo);
    this.normals = new Float32Array([
            // Front face
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,

            // Back face
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,

            // Top face
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,

            // Bottom face
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,

            // Right face
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,

            // Left face
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0
        ]);
    
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    this.nbo.itemSize = 3;
    this.nbo.numItems = this.normals.length / this.nbo.itemSize;
}