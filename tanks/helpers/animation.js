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
        moveTank(.05);
    if (currentlyPressedKeys[KEY_S])
        moveTank(-.05);
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
    };

    // // code for keeping the boxes in place relative to the focus
    // for (var i = 0; i < objects.length; i++) 
    // {
    //     if (i != SKYBOX && i != TERRAIN && i != FOCUS)
    //     {
    //         objects[i].pos[X] = objects[FOCUS].pos[X] - objects[i].direction;
    //     }
    // };
}

function moveTank(distance)
{
    for (var i = 0; i < objects.length; i++) 
    {
        objects[FOCUS].distance += distance;
        if (i != SKYBOX && i != FOCUS) 
        {
            // soh cah toa

            // cos(angle) = a / h

            // cos(angle) * h = a

            var adjacent = Math.cos(degToRad(objects[FOCUS].direction[Y])) * objects[FOCUS].distance;
            var opposite = Math.sin(degToRad(objects[FOCUS].direction[Y])) * objects[FOCUS].distance;
            console.log("direction: " + objects[FOCUS].direction[Y]);
            console.log("distance: " + objects[FOCUS].distance);

            objects[i].pos[X] = adjacent;
            objects[i].pos[Z] = opposite;
            console.log("adjacent: " + adjacent);
            console.log("opposite: " + opposite);
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
            objects[i].pos = addArrays(objects[i].pos, difference); 
            // objects[i].direction = degToRad(objects[i].pos[X] / objects[i].pos[Z]); // TODO: fix this may not even need this
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
        // don't zoom in or out too far
        if (i != SKYBOX) 
        {
            if (objects[i].pos[2] > -5)
                objects[i].pos[2] = -5;
            // if (objects[i].pos[2] < -50)
            //     objects[i].pos[2] = -50;
        };

    };

}