function createBufferObject(gl, data) {
    var bufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    return bufferObject;
}

function createElementBuffer(gl, data) {
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    return ibo;
}

function createLine(gl) {
    var vertices = [ -.5,0,0,   .5,0,0 ];

    var mesh = {};
    mesh.vbo = createBufferObject(gl, vertices);
    mesh.numElements = vertices.length / 3;
    return mesh;
}

function createLink(gl) {
    var w = .15;
//    var x0 =  -w; var x1 =  0; var x2 =   w;
//    var y0 = 0.0; var y1 = x2; var y2 = 1.0;
//    var z0 =  -w; var z1 =  0; var z2 =   w;
    var x0 = 0.0; var x1 = w; var x2 = 1.0;
    var y0 =  -w; var y1 = 0; var y2 =   w;
    var z0 =  -w; var z1 = 0; var z2 =   w;

    var l = new vec3(x0, y1, z1);
    var r = new vec3(x2, y1, z1);
    var b = new vec3(x1, y0, z1);
    var t = new vec3(x1, y2, z1);
    var n = new vec3(x1, y1, z0);
    var f = new vec3(x1, y1, z2);

    var vertices = [
     t.x,t.y,t.z,   l.x,l.y,l.z,   n.x,n.y,n.z,
     t.x,t.y,t.z,   n.x,n.y,n.z,   r.x,r.y,r.z,
     t.x,t.y,t.z,   r.x,r.y,r.z,   f.x,f.y,f.z,
     t.x,t.y,t.z,   f.x,f.y,f.z,   l.x,l.y,l.z,

     b.x,b.y,b.z,   n.x,n.y,n.z,   l.x,l.y,l.z,
     b.x,b.y,b.z,   r.x,r.y,r.z,   n.x,n.y,n.z,
     b.x,b.y,b.z,   r.x,r.y,r.z,   f.x,f.y,f.z,
     b.x,b.y,b.z,   f.x,f.y,f.z,   l.x,l.y,l.z
    ];

    var lineVertices = [
     t.x,t.y,t.z,   l.x,l.y,l.z,
     t.x,t.y,t.z,   r.x,r.y,r.z,
     t.x,t.y,t.z,   n.x,n.y,n.z,
     t.x,t.y,t.z,   f.x,f.y,f.z,

     b.x,b.y,b.z,   l.x,l.y,l.z,
     b.x,b.y,b.z,   r.x,r.y,r.z,
     b.x,b.y,b.z,   n.x,n.y,n.z,
     b.x,b.y,b.z,   f.x,f.y,f.z,

     l.x,l.y,l.z,   n.x,n.y,n.z,
     n.x,n.y,n.z,   r.x,r.y,r.z,
     r.x,r.y,r.z,   f.x,f.y,f.z,
     f.x,f.y,f.z,   l.x,l.y,l.z
     ];

    l.x -= w; r.x -= w;
    var n1 = new vec3(l.x,t.y,n.z);
    var n2 = new vec3(r.x,t.y,n.z);
    var n3 = new vec3(r.x,t.y,f.z);
    var n4 = new vec3(l.x,t.y,f.z);
    var n5 = new vec3(l.x,b.y,n.z);
    var n6 = new vec3(r.x,b.y,n.z);
    var n7 = new vec3(r.x,b.y,f.z);
    var n8 = new vec3(l.x,b.y,f.z);

//    var n1 = t.cross(n);
//    var n2 = n.cross(b);
//    var n3 = b.cross(f);
//    var n4 = f.cross(t);
//
//    n.x -= 1.0; f.x -= 1.0;
//    b.x -= 1.0; t.x -= 1.0;
//
//    var n5 = n.cross(t);
//    var n6 = b.cross(n);
//    var n7 = f.cross(b);
//    var n8 = t.cross(f);

    n1.normalize();
    n2.normalize();
    n3.normalize();
    n4.normalize();
    n5.normalize();
    n6.normalize();
    n7.normalize();
    n8.normalize();

    var normals = [
     n1.x, n1.y, n1.z,   n1.x, n1.y, n1.z,   n1.x, n1.y, n1.z,
     n2.x, n2.y, n2.z,   n2.x, n2.y, n2.z,   n2.x, n2.y, n2.z,
     n3.x, n3.y, n3.z,   n3.x, n3.y, n3.z,   n3.x, n3.y, n3.z,
     n4.x, n4.y, n4.z,   n4.x, n4.y, n4.z,   n4.x, n4.y, n4.z,

     n5.x, n5.y, n5.z,   n5.x, n5.y, n5.z,   n5.x, n5.y, n5.z,
     n6.x, n6.y, n6.z,   n6.x, n6.y, n6.z,   n6.x, n6.y, n6.z,
     n7.x, n7.y, n7.z,   n7.x, n7.y, n7.z,   n7.x, n7.y, n7.z,
     n8.x, n8.y, n8.z,   n8.x, n8.y, n8.z,   n8.x, n8.y, n8.z,
    ];

    var mesh = {};

    mesh.vbo = createBufferObject(gl, vertices);
    mesh.nbo = createBufferObject(gl, normals);
    mesh.numElements = vertices.length / 3;

    mesh.vboLines = createBufferObject(gl, lineVertices);
    mesh.numLineElements = lineVertices.length / 3;

    return mesh;
}

function createCube(gl) {
    var l = -.5; var r = .5; // left   right
    var b = -.5; var t = .5; // bottom top
    var n = -.5; var f = .5; // near   far

    var vertices = [
     // Left
     l, b, f,   l, b, n,   l, t, n,
     l, b, f,   l, t, n,   l, t, f,

     // Right
     r, b, n,   r, b, f,   r, t, f,
     r, b, n,   r, t, f,   r, t, n,

     // Bottom
     l, b, n,   l, b, f,   r, b, f,
     l, b, n,   r, b, f,   r, b, n,

     // Top
     l, t, n,   r, t, n,   r, t, f,
     l, t, n,   r, t, f,   l, t, f,

     // Near
     l, b, n,   r, b, n,   r, t, n,
     l, b, n,   r, t, n,   l, t, n,

     // Far
     r, b, f,   l, b, f,   l, t, f,
     r, b, f,   l, t, f,   r, t, f,
     ];

     var uvs = [
        0, 0,   1, 0,   1, 1,
        0, 0,   1, 1,   0, 1,

        0, 0,   1, 0,   1, 1,
        0, 0,   1, 1,   0, 1,

        0, 0,   1, 0,   1, 1,
        0, 0,   1, 1,   0, 1,

        0, 0,   1, 0,   1, 1,
        0, 0,   1, 1,   0, 1,

        0, 0,   1, 0,   1, 1,
        0, 0,   1, 1,   0, 1,

        0, 0,   1, 0,   1, 1,
        0, 0,   1, 1,   0, 1
     ];

    var normals = [
     -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
     -1, 0, 0,  -1, 0, 0,  -1, 0, 0,

     1, 0, 0,   1, 0, 0,   1, 0, 0,
     1, 0, 0,   1, 0, 0,   1, 0, 0,

     0, -1, 0,  0, -1, 0,  0, -1, 0,
     0, -1, 0,  0, -1, 0,  0, -1, 0,

     0, 1, 0,  0, 1, 0,  0, 1, 0,
     0, 1, 0,  0, 1, 0,  0, 1, 0,

     0, 0, -1,  0, 0, -1,  0, 0, -1,
     0, 0, -1,  0, 0, -1,  0, 0, -1,

     0, 0, 1,  0, 0, 1,  0, 0, 1,
     0, 0, 1,  0, 0, 1,  0, 0, 1
    ];

    var mesh = {};
    mesh.vbo = createBufferObject(gl, vertices);
    mesh.uvb = createBufferObject(gl, uvs);
    mesh.nbo = createBufferObject(gl, normals);
    mesh.numElements = vertices.length / 3;
    return mesh;
}

function createSquare(gl) {
    var vertices = [
        -0.5, -0.5, 0.0, // bl
         0.5, -0.5, 0.0, // br
         0.5,  0.5, 0.0, // tr

        -0.5, -0.5, 0.0, // bl
         0.5,  0.5, 0.0, // tr
        -0.5,  0.5, 0.0  // tl
    ];

    var uvs = [
        0, 0,
        1, 0,
        1, 1,

        0, 0,
        1, 1,
        0, 1
    ];

    var normals  = [
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        0, 0, -1,
        0, 0, -1,
        0, 0, -1
    ];

    var mesh = {};
    mesh.vbo = createBufferObject(gl, vertices);
    mesh.uvb = createBufferObject(gl, uvs);
    mesh.nbo = createBufferObject(gl, normals);
    mesh.numElements = vertices.length / 3;
    return mesh;
}

function createSphere(gl, numLats, numLons, c1, c2) {
    var vertices = [];
    var uvs = [];
    var colors = [];
    var normals = [];
    var elements = [];

    var currentVertIdx = 0;
    var radsPerLat = Math.PI / numLats;
    var radsPerLon = (2.0 * Math.PI) / numLons;
    for (var lat = 0; lat <= numLats; lat++) {
        var theta = lat * radsPerLat;
        var y = Math.cos(theta);
        var xz = Math.sin(theta);
        var v = (y - 1) / -2.0;
        // var v = 1.0 - (lat / numLats);

        var c = new vec4(
            lerp(c1.x, c2.x, v),
            lerp(c1.y, c2.y, v),
            lerp(c1.z, c2.z, v),
            1 //lerp(c1.w, c2.w, v)
        );

        for (var lon = 0; lon <= numLons; lon++) {
            var phi = radsPerLon * lon;
            var x = Math.cos(phi) * xz;
            var z = Math.sin(phi) * -xz;
            var u = 1.0 - (lon / numLons);

            if ((lat != 0) && (lat != numLats)) {
                var myVertPos = currentVertIdx;
                var right = myVertPos + 1;
                var above = myVertPos - (numLons + 1);
                var below = right + (numLons + 1);

                elements.push(myVertPos);
                elements.push(above);
                elements.push(right);
                elements.push(myVertPos);
                elements.push(right);
                elements.push(below);
            }

            vertices.push(x); vertices.push(y); vertices.push(z);
            uvs.push(u); uvs.push(v);
            // colors.push(0.0); colors.push(.4 + v); colors.push(1.0); colors.push(1.0);
            colors.push(c.x); colors.push(c.y); colors.push(c.z); colors.push(c.w);
            normals.push(x); normals.push(y); normals.push(z);
            currentVertIdx++;
        }
        vertices.push(xz); vertices.push(y); vertices.push(0);
        uvs.push(1); uvs.push(v);
        colors.push(c.x); colors.push(c.y); colors.push(c.z); colors.push(c.w);
        normals.push(xz); normals.push(y); normals.push(0);
        currentVertIdx++;
    }

    var theVertices = [];
    var theUVs = [];
    var theColors = [];
    var theNormals = [];

    var vi  = 0;
    var uvi = 0;
    var ci  = 0;

    for (var i = 0; i < elements.length; i++) {
        var ei = elements[i];
        vi  = ei * 3;
        uvi = ei * 2;
        ci  = ei * 4;
        theVertices.push(vertices[vi+0]);
        theVertices.push(vertices[vi+1]);
        theVertices.push(vertices[vi+2]);

        theUVs.push(uvs[uvi+0]);
        theUVs.push(uvs[uvi+1]);

        theColors.push(colors[ci+0]);
        theColors.push(colors[ci+1]);
        theColors.push(colors[ci+2]);
        theColors.push(colors[ci+3]);

        theNormals.push(normals[vi+0]);
        theNormals.push(normals[vi+1]);
        theNormals.push(normals[vi+2]);
    }

    var mesh = {};
    mesh.vbo = createBufferObject(gl, theVertices);
    mesh.uvb = createBufferObject(gl, theUVs);
    mesh.cbo = createBufferObject(gl, theColors);
    mesh.nbo = createBufferObject(gl, theNormals);
    // mesh.ibo = createElementBuffer(gl, elements);
    mesh.numElements = theVertices.length / 3;
    return mesh;
}

function getUVs(w, h, tileW, tileH, l) {
    var numTiles = Math.floor((w * h) / (tileW * tileH));
    var widthInTiles = Math.floor(w / tileW);
    var x = tileW / w;
    var y = tileH / h;
    var x1 = 0.0;
    var y1 = 0.0;
    if (!l) l = 0.0; //.003;

    var uvs = [];
    for (var t = 0; t < numTiles; t++) {
        uvs.push(new vec2(x1 + l    , y1 + l    )); // bl
        uvs.push(new vec2(x1 - l + x, y1 + l    )); // br
        uvs.push(new vec2(x1 - l + x, y1 - l + y)); // tr
        uvs.push(new vec2(x1 + l    , y1 - l + y)); // tl
        if ((t + 1) % widthInTiles == 0) {
            y1 += y;
            x1 = 0.0;
        }
        else x1 += x;
    }
    return uvs;
}

//function setSprites(vector<GLuint>& sprites, vector<vec2> uvs)
function getUVBufferArray(uvbs, uvs, gl) {
    var uvData = [0, 0, 0, 0, 0, 0, 0, 0];
    var length = uvs.length / 4;
    for (var i = 0; i < length; i++) {
        var tex = i * 4;
        uvData[0] = uvs[tex  ].x; uvData[1] = uvs[tex  ].y; // bl
        uvData[2] = uvs[tex+1].x; uvData[3] = uvs[tex+1].y; // br
        uvData[4] = uvs[tex+2].x; uvData[5] = uvs[tex+2].y; // tr
        uvData[6] = uvs[tex+3].x; uvData[7] = uvs[tex+3].y; // tl

        var uvb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvData), gl.STATIC_DRAW);
        sprites.push(uvb);
    }
}

function TextureObject(gl, imagePath) {
    this.glID = gl.createTexture();
    var self = this;

    var image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, self.glID);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // gl.generateMipmap(gl.TEXTURE_2D);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    image.src = imagePath;
}

