function draw(object, cameraMatrix, viewMatrix, projectionMatrix, gl, matrixLocation)
{
    
    // draw 2 fs
    var translationMatrix = makeTranslation(object.position[0], object.position[1], object.position[2]);

    // Multiply the matrices.
    var matrix = translationMatrix;
    matrix = matrixMultiply(matrix, viewMatrix);
    matrix = matrixMultiply(matrix, projectionMatrix);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    
    // Create a buffer.
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, object.vbo.itemSize, gl.FLOAT, false, 0, 0);

    // Create a buffer for colors.
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, object.cbo);
    gl.enableVertexAttribArray(colorLocation);

    // We'll supply RGB as bytes.
    gl.vertexAttribPointer(colorLocation, object.cbo.itemSize, gl.UNSIGNED_BYTE, true, 0, 0); 
    
    // Draw the geometry.
    gl.drawArrays(gl.TRIANGLES, 0, object.vbo.numItems);
}