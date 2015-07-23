function Terrain()
{
    this.name = "Terrain";
    this.position = [0, 0, 0];
    this.direction = [0, 0, 0]; 
    this.distance = 0.0;
    this.rotation = [0, 0, 0];
}

// Fill the buffer with the values that define Terrain.
Terrain.prototype.setGeometry = function() 
{
    this.vbo = gl.createBuffer();
    var array = new Array();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);

    var ends = 500000;
    this.vertices = new Float32Array([
        // Top face
        -ends,  -1, -ends,
        -ends,  -1,  ends,
         ends,  -1, -ends,

        -ends,  -1,  ends,
         ends,  -1,  ends,
         ends,  -1, -ends
    ]);

    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    this.vbo.itemSize = 3;
    this.vbo.numItems = this.vertices.length / this.vbo.itemSize;
}

Terrain.prototype.setColors = function() 
{
    this.cbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.cbo);
    // this.colors = new Uint8Array(helpers.randomColors(this.vertices.length));
    // 76, 153, 0
    var temp = [0, 51, 0];
    var colors = new Array();
    for (var i = 0; i < this.vertices.length; i++)
    {
        colors = colors.concat(temp);
    }

    this.colors = new Uint8Array(colors);

    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    this.cbo.itemSize = 3;
    this.cbo.numItems = this.colors.length / this.cbo.itemSize;
}

Terrain.prototype.changeColors = function(array) 
{
    this.cbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.cbo);
    // this.colors = new Uint8Array(helpers.randomColors(this.vertices.length));


    this.colors = new Uint8Array(array);

    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    this.cbo.itemSize = 3;
    this.cbo.numItems = this.colors.length / this.cbo.itemSize;
}