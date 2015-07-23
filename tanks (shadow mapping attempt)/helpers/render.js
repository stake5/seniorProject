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
    draw(skybox, cameraMatrix, viewMatrix, projectionMatrix);
    gl.clear(gl.DEPTH_BUFFER_BIT); // send the skybox to the background

    objects.forEach(function(object)
    {
        draw(object);
    });
    children.forEach(function(childObject)
    {
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
    gl.uniformMatrix4fv(shaderProgram.matrixLocation, false, matrix);

    // Create a buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
    gl.enableVertexAttribArray(shaderProgram.positionLocation);
    gl.vertexAttribPointer(shaderProgram.positionLocation, object.vbo.itemSize, gl.FLOAT, false, 0, 0);

    // Create a buffer for colors.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.cbo);
    gl.enableVertexAttribArray(shaderProgram.colorLocation);
    gl.vertexAttribPointer(shaderProgram.colorLocation, object.cbo.itemSize, gl.UNSIGNED_BYTE, true, 0, 0); 

    gl.bindBuffer(gl.ARRAY_BUFFER, object.nbo);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, object.nbo.itemSize, gl.FLOAT, false, 0, 0);

    // add the input for red green and blue ambient light to the uniform matrix
    gl.uniform3f(
        shaderProgram.ambientColorUniform,
        parseFloat(1.0),
        parseFloat(1.0),
        parseFloat(1.0)
    );

    // contain the input for lighting direction in an array
    var lightingDirection = [
        parseFloat(1.0),
        parseFloat(1.0),
        parseFloat(1.0)
    ];

    // create the lighting direction vec3
    var adjustedLD = vec3.create();

    // normalize the created lighting direction using the inputs for lighting direction
    vec3.normalize(lightingDirection, adjustedLD);

    // reverse the direction of the lighting
    vec3.scale(adjustedLD, -1);

    // pass the lighting to the shader programs
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, adjustedLD);

    // copy the directional lightings color components to the shader uniform
    gl.uniform3f(
        shaderProgram.directionalColorUniform,
        parseFloat(1.0),
        parseFloat(1.0),
        parseFloat(1.0)
    );


    // Draw the geometry.
    gl.drawArrays(gl.TRIANGLES, 0, object.vbo.numItems);
}