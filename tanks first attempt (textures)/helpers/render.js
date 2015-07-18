function draw(object, viewMatrix, projectionMatrix)
{
//    var translationMatrix = makeTranslation(object.pos[X], object.pos[Y], object.pos[Z]);
//
//    // Multiply the matrices.
//    var matrix = translationMatrix;
//    matrix = matrixMultiply(matrix, viewMatrix);
//    matrix = matrixMultiply(matrix, projectionMatrix);
//
//    // Set the matrix.
//    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    //////////////

     mat4.identity(mvMatrix);

     mat4.translate(mvMatrix, object.pos);

     mvPushMatrix();
     mat4.rotate(mvMatrix, degToRad(object.rotation[X]), [1, 0, 0]);
     mat4.rotate(mvMatrix, degToRad(object.rotation[Y]), [0, 1, 0]);
     mat4.rotate(mvMatrix, degToRad(object.rotation[Z]), [0, 0, 1]);

    gl.bindBuffer(gl.ARRAY_BUFFER, object.vertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, object.vertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, object.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, object.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, object.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    mvPopMatrix();
}

function handleLoadedTexture(object) 
{
    gl.bindTexture(gl.TEXTURE_2D, object.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, object.texture.image);
    // gl.generateMipmap(gl.TEXTURE_2D);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

function initTexture(object) {
    object.texture = gl.createTexture();
    object.texture.image = new Image();
    object.texture.image.onload = function () {
        handleLoadedTexture(object);
    }

    object.texture.image.src = object.textureAsset;
}
