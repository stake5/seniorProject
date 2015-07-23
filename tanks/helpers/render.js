// Draw the scene.
function drawScene() 
{
    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Compute the projection matrix
    aspect = canvas.clientWidth / canvas.clientHeight;
    projectionMatrix =
        makePerspective(fieldOfViewRadians, aspect, 1, 2000);

    // Use matrix math to compute a position on the circle.
    cameraMatrix = makeTranslation(0, cameraHeight, cameraZ);
    cameraMatrix = matrixMultiply(
        cameraMatrix, makeYRotation(cameraAngleRadians));


    // Get the camera's postion from the matrix we computed
    cameraPosition = [
        cameraMatrix[12],
        cameraMatrix[13],
        cameraMatrix[14]];

    up = [0, 1, 0];

    // Compute the camera's matrix using look at.
    cameraMatrix = makeLookAt(cameraPosition, objects[FOCUS].position, up);

    // Make a view matrix from the camera matrix.
    viewMatrix = makeInverse(cameraMatrix);

    // center the skybox around the camera and send the walls of the box to the background
    skybox.position = cameraPosition;
    draw(skybox);
    gl.clear(gl.DEPTH_BUFFER_BIT); // send the skybox to the background

    objects.forEach(function(object)
    {
        if (object.name != "Terrain")
            drawShadow(object);
            draw(object);
    });
    children.forEach(function(childObject)
    {
        drawShadow(childObject);
        draw(childObject);
    });
}

function draw(object)
{    
    // setup the translation of the object
    var translationMatrix = makeTranslation(object.position[X], object.position[Y], object.position[Z]);

    var rotationYMatrix = makeYRotation(object.rotation[Y]);
    
    // Multiply the matrices.
    var matrix = rotationYMatrix;
    matrix = matrixMultiply(matrix, translationMatrix);
    matrix = matrixMultiply(matrix, viewMatrix);
    matrix = matrixMultiply(matrix, projectionMatrix);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    // Create a buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, object.vbo.itemSize, gl.FLOAT, false, 0, 0);

    // Create a buffer for colors.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.cbo);
    gl.enableVertexAttribArray(colorLocation);

    // We'll supply RGB as bytes.
    gl.vertexAttribPointer(colorLocation, object.cbo.itemSize, gl.UNSIGNED_BYTE, true, 0, 0); 

    // Draw the geometry.
    gl.drawArrays(gl.TRIANGLES, 0, object.vbo.numItems);
}

function drawShadow(object)
{    
    // setup the translation of the object
    var translationMatrix = makeTranslation(object.position[X], object.position[Y], object.position[Z]);

    var rotationYMatrix = makeYRotation(object.rotation[Y]);
    var rotationXMatrix = makeXRotation(degToRad(90));
    var shadow = makeScale(1,0,1);
    
    // Multiply the matrices.
    var matrix = rotationYMatrix;
    // matrix = matrixMultiply(matrix, rotationYMatrix);
    matrix = matrixMultiply(matrix, shadow);
    matrix = matrixMultiply(matrix, translationMatrix);
    matrix = matrixMultiply(matrix, viewMatrix);
    matrix = matrixMultiply(matrix, projectionMatrix);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    // Create a buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, object.vbo.itemSize, gl.FLOAT, false, 0, 0);

    // Create a buffer for colors.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.shadow.cbo);
    gl.enableVertexAttribArray(colorLocation);

    // We'll supply RGB as bytes.
    gl.vertexAttribPointer(colorLocation, object.shadow.cbo.itemSize, gl.UNSIGNED_BYTE, true, 0, 0); 

    // Draw the geometry.
    gl.drawArrays(gl.TRIANGLES, 0, object.vbo.numItems);
}

function turnBlack(colors)
{
    var result = new Array();
    for (var i = 0; i < colors.length; i++) {
        result = result.concat([0]);
    };
    return result;
}