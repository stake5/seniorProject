function getShader(gl, htmlScriptId) {
    var shaderScript = document.getElementById(htmlScriptId);
    if (!shaderScript) {
        console.log("Shader could not be found with id: " + htmlScriptId);
        return null;
    }
    var shaderCode = shaderScript.innerHTML;

    var shader;
    if (shaderScript.type == "VertexShader")
        shader = gl.createShader(gl.VERTEX_SHADER);
    else if (shaderScript.type == "FragmentShader")
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    else return null;

    gl.shaderSource(shader, shaderCode);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function getShaderProgram(gl, vShaderId, fShaderId) {
    var vertexShader   = this.getShader(gl, vShaderId);
    var fragmentShader = this.getShader(gl, fShaderId);
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

function loadTexture(gl, textureID, path) {
    var image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, textureID);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // gl.generateMipmap(gl.TEXTURE_2D);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // gl.bindTexture(gl.TEXTURE_2D, null);
    }
    image.src = path;
}

function loadOBJFile(gl, filePath, mesh, vbo, nbo) {
    if (filePath == null || filePath == "") return null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var lines = xmlhttp.responseText.split("\n");
            var vertices = [];
            var uvs = [];
            var normals = [];
            parseOBJ(lines, vertices, uvs, normals);

            mesh.numVertices = vertices.length / 3;
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, nbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
         }
    };
    xmlhttp.open("GET", filePath, true);
    xmlhttp.send();
}

function parseOBJ(lines, vertices, uvs, normals) {
    var vertArray = [];
    var vertIndices = [];
    var uvArray = [];
    var uvIndices = [];
    var normArray = [];
    var normIndices = [];

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.substring(0, 2) == "v ") {
            var strs = line.substring(2).split(" ");
            var v = new vec3(parseFloat(strs[0]), parseFloat(strs[1]), parseFloat(strs[2]));
            vertArray.push(v);
        }
        else if (line.substring(0, 2) == "vt") {
            var strs = line.substring(3).split(" ");
            var uv = new vec2(parseFloat(strs[0]), parseFloat(strs[1]));
            uvArray.push(uv);
        }
        else if (line.substring(0, 2) == "vn") {
            var strs = line.substring(3).split(" ");
            var n = new vec3(parseFloat(strs[0]), parseFloat(strs[1]), parseFloat(strs[2]));
            normArray.push(n);
        }
        else if (line.substring(0, 2) == "f ") {
            var fStrs = line.substring(2).split(" ");
            var a = fStrs[0].split("/");
            var b = fStrs[1].split("/");
            var c = fStrs[2].split("/");

            var vi  = new vec3(parseInt(a[0]), parseInt(b[0]), parseInt(c[0]));
            var uvi = new vec3(parseInt(a[1]), parseInt(b[1]), parseInt(c[1]));
            var ni  = new vec3(parseInt(a[2]), parseInt(b[2]), parseInt(c[2]));

            if (!vi.x) vi.x = 1;   if (!vi.y) vi.y = 1;   if (!vi.z) vi.z = 1;
            if (!uvi.x) uvi.x = 1; if (!uvi.y) uvi.y = 1; if (!uvi.z) uvi.z = 1;
            if (!ni.x) ni.x = 1;   if (!ni.y) ni.y = 1;   if (!ni.z) ni.z = 1;

            vertIndices.push(vi.x - 1);
            vertIndices.push(vi.y - 1);
            vertIndices.push(vi.z - 1);

            uvIndices.push(uvi.x - 1);
            uvIndices.push(uvi.y - 1);
            uvIndices.push(uvi.z - 1);

            normIndices.push(ni.x - 1);
            normIndices.push(ni.y - 1);
            normIndices.push(ni.z - 1);
        }
    }

    for (var i = 0; i < vertIndices.length; i++) {
        var vert = vertArray[vertIndices[i]];
        vertices.push(vert.x);
        vertices.push(vert.y);
        vertices.push(vert.z);

        var uv = uvArray[uvIndices[i]];
        uvs.push(uv.x);
        uvs.push(uv.y);

        var norm = normArray[normIndices[i]];
        normals.push(norm.x);
        normals.push(norm.y);
        normals.push(norm.z);
    }
}
