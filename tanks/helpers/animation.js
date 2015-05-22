function handleKeys()
{
    // zoom controls
    if (currentlyPressedKeys[KEY_M]) 
        viewZoom(1);
    if (currentlyPressedKeys[KEY_N]) 
        viewZoom(-1);

    // rotation controls
    if (currentlyPressedKeys[KEY_UP]) 
        rotateView(1, 0, 0);
    if (currentlyPressedKeys[KEY_DOWN]) 
        rotateView(-1, 0, 0);    
    if (currentlyPressedKeys[KEY_RIGHT]) 
        rotateView(0, -.75, 0);
    if (currentlyPressedKeys[KEY_LEFT]) 
        rotateView(0, .75, 0);

    // movement controls
    if (currentlyPressedKeys[KEY_W])
        moveTank(.1);
    if (currentlyPressedKeys[KEY_S])
        moveTank(-.1);
    if (currentlyPressedKeys[KEY_A])
        rotateObject(0, -1, 0);
    if (currentlyPressedKeys[KEY_D])
        rotateObject(0, 1, 0);

    // focus controls
    if (currentlyPressedKeys[KEY_1]) 
        changeFocus(SHERMAN);
    // if (currentlyPressedKeys[KEY_2]) 
    //     changeFocus(TANK2);
    // if (currentlyPressedKeys[KEY_3]) 
    //     changeFocus(TANK3);
    // if (currentlyPressedKeys[KEY_4]) 
    //     changeFocus(TANK4);
    // if (currentlyPressedKeys[KEY_5]) 
    //         changeFocus(TANK5);
    // if (currentlyPressedKeys[KEY_6]) 
    //     changeFocus(TANK6);
    // if (currentlyPressedKeys[KEY_7]) 
    //     changeFocus(TANK7);

    // restrict animation    
    animationRules();
}

function viewZoom(z)
{
    for (var i = 0; i < objects.length; i++) 
    {
        if (i != SKYBOX) 
        {
            objects[i].pos[Z] += z;
        };
    };
}

function rotateView(x, y, z)
{
    for (var i = 0; i < objects.length; i++) 
    {
        objects[i].rotation[X] += x;
        objects[i].rotation[Y] += y;
        objects[i].rotation[Z] += z;

        objects[i].direction[X] += x;
        objects[i].direction[Y] += y;
        objects[i].direction[Z] += z;

        objects[i].focusDirection[X] -= x;
        objects[i].focusDirection[Y] -= y;
        objects[i].focusDirection[Z] -= z;
    };

    for (var i = 0; i < objects.length; i++) 
    {
        objects[i].distanceToFocus = "";
        if (i != SKYBOX && i != FOCUS) 
        {
            var z = Math.cos(degToRad(objects[i].focusDirection[Z])) * objects[i].distanceToFocus;
            var y = Math.sin(degToRad(objects[i].focusDirection[Y])) * objects[i].distanceToFocus;
            var x = Math.sin(degToRad(objects[i].focusDirection[X])) * objects[i].distanceToFocus;

            objects[i].pos[Z] += z;
            objects[i].pos[Y] += y; 
            objects[i].pos[X] += x;

        };
    }; // TODO FINISH THIS
}

function moveTank(distance)
{
    for (var i = 0; i < objects.length; i++) 
    {
        objects[FOCUS].distance = distance;
        if (i != SKYBOX && i != FOCUS) 
        {
            var z = Math.cos(degToRad(objects[FOCUS].direction[Y])) * objects[FOCUS].distance;
            var x = Math.sin(degToRad(objects[FOCUS].direction[Y])) * objects[FOCUS].distance;

            objects[i].pos[Z] += z;
            objects[i].pos[X] += x;

        };
    };
}

function rotateObject(x, y, z)
{
    objects[FOCUS].rotation[Y] -= y;
    objects[FOCUS].direction[Y] -= y;
}

function changeFocus(newFocus)
{
    FOCUS = newFocus;

    var difference = subArrays(objects[OLDFOCUS].pos, objects[FOCUS].pos);

    // move all objects relative to the distance between the old focus 
    // object and the new focus object
    for (var i = 0; i < objects.length; i++) 
    {
        if (i != SKYBOX) 
        {
            // change the position of each object relative to the position of the focus object.
            objects[i].pos = addArrays(objects[i].pos, difference); 

            // update the focus direction for each object
            for (var j = 0; j < objects[i].focusDirection.length; j++) {
                console.log(j);
                objects[i].focusDirection[j] = objects[i].pos[j] - objects[FOCUS].pos[j];
            };
        };
    };
    
    OLDFOCUS = FOCUS;
}

// this is a function that contains the rules of animation
// for each object
function animationRules()
{
    // don't le the rotation go farther than overhead

    // rotation rules
    for (var i = 0; i < objects.length; i++) 
    {
        if (objects[i].rotation[X] > 90)
            objects[i].rotation[X] = 90;

        // don't let the rotation go under the terrain
        if (objects[i].rotation[X] < 0)
            objects[i].rotation[X] = 0;

        // don't let the rotation increment too much
        if (objects[i].rotation[Y] > 360)
            objects[i].rotation[Y] -= 360;
        if (objects[i].direction[Y] > 360)
            objects[i].direction[Y] -= 360;
        if (objects[i].rotation[Y] < 0)
            objects[i].rotation[Y] += 360;
        if (objects[i].direction[Y] < 0)
            objects[i].direction[Y] += 360;
    };

    for (var i = 0; i < objects.length; i++) 
    {

        if (objects[FOCUS].pos[Z] > -5)
            objects[FOCUS].pos[Z] = -5;
        // don't zoom in or out too far
        if (i != SKYBOX && i != TERRAIN) 
        {

            // if (objects[i].pos[2] < -50)
            //     objects[i].pos[2] = -50;
        };

    };

}