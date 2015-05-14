function handleKeys()
{
    if (currentlyPressedKeys[KEY_M]) 
    {
        viewZoom(1);
    }
    if (currentlyPressedKeys[KEY_N]) 
    {
        viewZoom(-1);
    }
    if (currentlyPressedKeys[KEY_UP]) 
    {
        rotateView(1, 0);
    }    
    if (currentlyPressedKeys[KEY_DOWN]) 
    {
        rotateView(-1, 0);    
    }
    if (currentlyPressedKeys[KEY_RIGHT]) 
    {
        rotateView(0, .75);
    }
    if (currentlyPressedKeys[KEY_LEFT]) 
    {
        rotateView(0, -.75);
    }

    animationRules();
}

function viewZoom(z)
{
    for (var i = 0; i < objects.length; i++) 
    {
        if (i != SKYBOX) 
        {
            objects[i].pos[2] += z;
        };
    };
}

function rotateView(x, z)
{
    for (var i = 0; i < objects.length; i++) 
    {
        objects[i].xRot += x;
        objects[i].zRot += z;
    };
}

// this is a function that contains the rules of animation
// for each object
function animationRules()
{
    // [TERRAIN] rules
    // don't le the rotation go farther than overhead

    // rotation rules
    for (var i = 0; i < objects.length; i++) 
    {
        if (objects[i].xRot > 90)
            objects[i].xRot = 90;

        // don't let the rotation go under the terrain
        if (objects[i].xRot < 0)
            objects[i].xRot = 0;

        // don't let the rotation increment too much
        if (objects[i].zRot > 360)
            objects[i].zRot -= 360;
    };

    for (var i = 0; i < objects.length; i++) 
    {
        // don't zoom in or out too far
        if (i != SKYBOX) 
        {
            if (objects[i].pos[2] > -5)
                objects[i].pos[2] = -5;
            if (objects[i].pos[2] < -50)
                objects[i].pos[2] = -50;
        };

    };

}