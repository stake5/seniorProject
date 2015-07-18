function terrain(x,y,z, asset)
{
    this.pos = [x, y, z];
    this.rotation = [0, 0, 0];
    this.texture;
    this.textureAsset = asset;
    this.direction = [0, 0, 0]; 
    this.distance = 0.0;
    this.distanceToFocus = 0.0;
    this.focusDirection = [0, 0, 0];
}

terrain.prototype.init = function(length, width)
{
    this.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    this.vertices = new Array();
    var row = length;
    var col = width;
    for(var i = 0; i < length; i++) {
        col = width;
        for (var j = 0; j < width; j++) {
            var temp = [
                col, -1.0, (row - 2),

                col, -1.0, row,

                (col - 2), -1.0, (row - 2),

                (col - 2), -1.0, row
            ];
            this.vertices = this.vertices.concat(temp);
            col -= 2;
        };
        row -= 2;
    };

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    this.vertexPositionBuffer.itemSize = 3;
    this.vertexPositionBuffer.numItems = this.vertices.length / this.vertexPositionBuffer.itemSize;

    // keep an array of normals so that angles of light can be calculated
    this.vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
    this.vertexNormals = new Array();
    for (var i = 0; i < (length * width); i++) 
    {
        var temp = [
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0
        ]
        this.vertexNormals = this.vertexNormals.concat(temp);
    };
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals), gl.STATIC_DRAW);
    this.vertexNormalBuffer.itemSize = 3;
    this.vertexNormalBuffer.numItems = this.vertexNormals.length / this.vertexNormalBuffer.itemSize;

    this.vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
    this.textureCoords = new Array();
    for (var i = 0; i < (length * width); i++) 
    {
        var temp = [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
        ]
        this.textureCoords = this.textureCoords.concat(temp);
    };

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), gl.STATIC_DRAW);
    this.vertexTextureCoordBuffer.itemSize = 2;
    this.vertexTextureCoordBuffer.numItems = this.textureCoords.length / this.vertexTextureCoordBuffer.itemSize;

    this.vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
    this.vertexIndices = new Array();
    var vert = 0;
    for (var i = 0; i < (length * width); i++) 
    {
        temp = [
            vert++, vert, vert + 1,   vert++, vert++, vert++
        ];
        this.vertexIndices = this.vertexIndices.concat(temp);

    };
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.vertexIndices), gl.STATIC_DRAW);
    this.vertexIndexBuffer.itemSize = 1;
    this.vertexIndexBuffer.numItems = this.vertexIndices.length;
}

terrain.prototype.move = function(dir, distance)
{
    this.pos[0] += dir.x * distance;
    this.pos[1] += dir.y * distance;
    this.pos[2] += dir.z * distance;
}

