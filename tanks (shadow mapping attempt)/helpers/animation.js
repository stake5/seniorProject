function handleKeys() {
    // check keys
    if (!currentlyPressedKeys[KEY_F])
        F = false;
    // zoom controls
    if (currentlyPressedKeys[KEY_SUBTRACT])
        viewZoom(.5);
    if (currentlyPressedKeys[KEY_ADD]) 
        viewZoom(-.5);
    if (currentlyPressedKeys[KEY_N])
        viewZoom(.5);
    if (currentlyPressedKeys[KEY_M]) 
        viewZoom(-.5);
    
    // camera height
    if (currentlyPressedKeys[KEY_UP])
        changeCameraHeight(1);
    if (currentlyPressedKeys[KEY_DOWN])
        changeCameraHeight(-1);
    
    // camera rotation
    if (currentlyPressedKeys[KEY_LEFT])
        rotateCamera(-1.25);
    if (currentlyPressedKeys[KEY_RIGHT])
        rotateCamera(1.25);
    
    // object rotation
    if (currentlyPressedKeys[KEY_A])
        rotateTank(1);
    if (currentlyPressedKeys[KEY_D])
        rotateTank(-1);
    
    // object movement
    if (currentlyPressedKeys[KEY_W])
        moveTank(-objects[FOCUS].speed);
    if (currentlyPressedKeys[KEY_S])
        moveTank(objects[FOCUS].speed);
    
    // focus changes
    if (currentlyPressedKeys[KEY_1])
        changeFocus(SHERMAN);
    if (currentlyPressedKeys[KEY_2])
        changeFocus(HETZER);
    if (currentlyPressedKeys[KEY_3])
        changeFocus(KVTWO);
    if (currentlyPressedKeys[KEY_4])
        changeFocus(ATEIGHT);
    if (currentlyPressedKeys[KEY_5])
        changeFocus(TEIGHTEEN);
    if (currentlyPressedKeys[KEY_6])
        changeFocus(ELCAMX);
    if (currentlyPressedKeys[KEY_7])
        changeFocus(BATCHAT);
    
    if (currentlyPressedKeys[KEY_F])
        shoot();
    
    rotateTurret();
    animationRules();
}

function viewZoom(z)
{
    cameraZ += z;
}

function changeCameraHeight(height)
{
    cameraHeight += height;
}

function rotateCamera(angle)
{
    cameraAngleRadians += degToRad(angle);
}

function rotateTurret()
{
    if (FOCUSCHILD != -1)
    {
        if (children[FOCUSCHILD].rotation[Y] < (cameraAngleRadians - degToRad(180)))
            children[FOCUSCHILD].rotation[Y] += .01;
        if (children[FOCUSCHILD].rotation[Y] > (cameraAngleRadians - degToRad(180)))
            children[FOCUSCHILD].rotation[Y] -= .01;
    }
}

function moveTank(distance)
{
    for (var i = 0; i < objects.length; i++) 
    {
        if (i != FOCUS) 
        {
            var z = Math.cos(objects[FOCUS].rotation[Y]) * distance;
            var x = Math.sin(objects[FOCUS].rotation[Y]) * distance;

            objects[i].position[Z] += z;
            objects[i].position[X] += x;
        };
    }; 
    for (var i = 0; i < children.length; i++) 
    {
        if (i != FOCUSCHILD) 
        {
            var z = Math.cos(objects[FOCUS].rotation[Y]) * distance;
            var x = Math.sin(objects[FOCUS].rotation[Y]) * distance;

            children[i].position[Z] += z;
            children[i].position[X] += x;
        };
    }; 
}

function rotateTank(y)
{
    objects[FOCUS].rotation[Y] += degToRad(y);
}

function shoot()
{
    if (!F)
    {
        playSounds();
        if (FOCUSCHILD != -1)
            kick(1);
        else
            moveTank(1);
        F = true;
    }
}

function kick(distance)
{
    for (var i = 0; i < objects.length; i++) 
    {
        if (i != FOCUS) 
        {
            var z = Math.cos(children[FOCUSCHILD].rotation[Y]) * distance;
            var x = Math.sin(children[FOCUSCHILD].rotation[Y]) * distance;

            objects[i].position[Z] += z;
            objects[i].position[X] += x;
        };
    }; 
    for (var i = 0; i < children.length; i++) 
    {
        if (i != FOCUSCHILD) 
        {
            var z = Math.cos(children[FOCUSCHILD].rotation[Y]) * distance;
            var x = Math.sin(children[FOCUSCHILD].rotation[Y]) * distance;

            children[i].position[Z] += z;
            children[i].position[X] += x;
        };
    }; 
}

function changeFocus(newFocus)
{
    FOCUS = newFocus;
    changeChildFocus(FOCUS);
    var difference = subArrays(objects[OLDFOCUS].position, objects[FOCUS].position);

    // move all objects relative to the distance between the old focus 
    // object and the new focus object
    for (var i = 0; i < objects.length; i++) 
    {
            // change the position of each object relative to the position of the focus object.
            objects[i].position = addArrays(objects[i].position, difference); 
    };
    for (var i = 0; i < children.length; i++) 
    {
            // change the position of each object relative to the position of the focus object.
            children[i].position = addArrays(children[i].position, difference); 
    };
    
    
    OLDFOCUS = FOCUS;
}

function changeChildFocus(focus)
{
    switch(focus)
    {
        case SHERMAN:
            FOCUSCHILD = SHERMANTURRET;
            break;
        case KVTWO:
            FOCUSCHILD = KVTWOTURRET;
            break;
        case ELCAMX:
            FOCUSCHILD = ELCTURRET;
            break;
        case BATCHAT:
            FOCUSCHILD = BATCHATTURRET;
            break;
        default:
            FOCUSCHILD = -1;
            break;
    }
}

function playSounds()
{
    var fire = new Audio('./assets/fire.wav');
    var ricochet = new Audio('./assets/ricochet.wav');
    fire.play();
    
    setTimeout(function(){
        ricochet.play();
    }, 500);
}

function animationRules()
{
    // apply restrictions to camera angle
    cameraAngle = radToDeg(cameraAngleRadians);
    if (cameraAngle > 360)
    {
        cameraAngle -= 360;
        // if (FOCUSCHILD != -1)
        // {
        //     children[FOCUSCHILD].rotation[Y] -= 360;
        // } TODO: implement or deprecate
    }
    if (cameraAngle < 0)
    {
        cameraAngle += 360;
        // if (FOCUSCHILD != -1)
        // {
        //     children[FOCUSCHILD].rotation[Y] += 360;
        // }
    }
    cameraAngleRadians = degToRad(cameraAngle);
    
    // apply restriction to object rotation
    for (var i = 0; i < objects.length; i++)
    {
        var rotation = radToDeg(objects[i].rotation[Y]);
        if (rotation > 360)
            rotation -= 360;
        if (rotation < 0)
            rotation += 360;
        objects[i].rotation[Y] = degToRad(rotation);
    }
    
    if (cameraZ < 5)
        cameraZ = 5;
    if (cameraZ > 590)
        cameraZ = 590;    

    if (cameraHeight < 0)
        cameraHeight = 0;   
    if (cameraHeight > 1760)
        cameraHeight = 1760;   
}