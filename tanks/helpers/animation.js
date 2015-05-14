function handleKeys()
{
    if (currentlyPressedKeys[KEY_W]) 
    {
        moveTank(0, 1, 0);
    }
    if (currentlyPressedKeys[KEY_S]) 
    {
        moveTank(0, -1, 0);
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

function moveTank(x, z, xRot)
{
    // backward
    objects.map.pos[0] += x;

    // left and right
    objects.map.pos[2] += z;

    // TODO: rotate left

    // TODO: rotate right
}

function rotateView(x, z)
{
    objects.map.xRot += x;
    objects.map.zRot += z;
}

// this is a function that contains the rules of animation
// for each object
function animationRules()
{
    // map rules
    // don't le the rotation go farther than overhead
    if (objects.map.xRot > 90)
        objects.map.xRot = 90;

    // don't let the rotation go under the terrain
    if (objects.map.xRot < 0)
        objects.map.xRot = 0;
    if (objects.map.zRot > 360)
        objects.map.zRot -= 360;

    // don't zoom in too far
    if (objects.map.pos[2] >= -5)
        objects.map.pos[2] = -5;

    // skybox constant motion
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        objects.sky.xRot -= (75 * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}