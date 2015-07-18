function handleKeys() {
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
    updateObjects();
}

function rotateView(x, y, z)
{
    cameraAngleRadians = cameraAngleRadians -= degToRad(y);
    console.log(cameraAngleRadians);
};
//
//
//    for (var i = 0; i < objects.length; i++) 
//    {
//        // sqrt((x - x)^2 + (y - y)^2 + (z - z)^2)
//        // sqrt((x - x)^2 + (z - z)^2)
//
//        //s = o/h 
//        //s^-1(o/h) = 0
//        
//        //s(0) * h = opp
//        //c = a/h
//        
//        // t = o/a
//
//        if (i != SKYBOX && i != FOCUS && i != TERRAIN) 
//        {
//            // calculate the distance between focus and other objects
//            
//            // make focus the origin
//            objects[i].pos = subArrays(objects[i].pos, objects[FOCUS].pos);
//            
//            //calculate the direction and distance to the object from the origin
//            var distance = Math.sqrt(Math.pow(objects[i].pos[X], 2) + Math.pow(objects[i].pos[Z], 2))
//            console.log("Distance: " + distance);
//            
//            var direction = radToDeg(Math.atan(objects[i].pos[Z] / objects[i].pos[X]));
//            console.log("Direction: " + direction);
//            
//            if (direction < 0)
//                direction += 360;
//            if (direction > 360)
//                direction -= 360;
//            // calculate the change of the direction and keep the same distance
//            
////            console.log("distance to focus:" + objects[i].distanceToFocus); // debug
//
//            // x and z coordinates from focus
//            z = Math.cos(degToRad(direction)) * distance;
//            x = Math.sin(degToRad(direction)) * distance;
//
//            // set the position of the object
//            objects[i].pos[Z] = z;
//            objects[i].pos[X] = x;
//            // objects[i].pos[Y] += y; 
//            
//            // bring focus back to where it was
//            objects[i].pos = addArrays(objects[i].pos, objects[FOCUS].pos);
//
////            console.log("x:" + objects[i].pos[X] + " y:" + objects[i].pos[Y] + " z:" + objects[i].pos[Z]);
//        };
//    }; // TODO FINISH THIS on 2 dimensions
//    
//    updateObjects();
//}

function moveTank(distance)
{
    for (var i = 0; i < objects.length; i++) 
    {
        objects[FOCUS].distance = distance;
        if (i != SKYBOX && i != FOCUS) 
        {
            var z = Math.cos(degToRad(objects[FOCUS].rotation[Y])) * objects[FOCUS].distance;
            var x = Math.sin(degToRad(objects[FOCUS].rotation[Y])) * objects[FOCUS].distance;
            //var y = Math.sin(degToRad(objects[FOCUS].rotation[Z] - objects[FOCUS].rotation[X])) * objects[FOCUS].distance;

            objects[i].pos[Z] += z;
            objects[i].pos[X] += x;
//            objects[i].pos[Y] += y;

        };
    }; //TODO: add the 3rd dimension
    
    updateObjects();
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

        };
    };
    
    updateObjects();
    
    OLDFOCUS = FOCUS;
}

function updateObjects()
{

    for (var i = 0; i < objects.length; i++) 
    {
        if (i != SKYBOX)
        {
            // update the focus direction for each object
            objects[i].focusDirection[X] = radToDeg(Math.atan(objects[i].pos[Y] / objects[i].pos[Z]));
            objects[i].focusDirection[Y] = radToDeg(Math.atan(objects[i].pos[Z] / objects[i].pos[X]));
            objects[i].focusDirection[Z] = radToDeg(Math.atan(objects[i].pos[Y] / objects[i].pos[X]));

//            console.log("QUESTION: " + (objects[i].focusDirection[Y]+ 360));

//            console.log("position: " + objects[i].pos[X] + " " + objects[i].pos[Z]);
//            console.log("focus position: " + objects[FOCUS].pos[X] + " " + objects[FOCUS].pos[Z]);

            var z = objects[i].pos[Z] - objects[FOCUS].pos[Z];
            var x = objects[i].pos[X] - objects[FOCUS].pos[X];
//            console.log("X: " + x + " Z: " + z)

            objects[i].distanceToFocus = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
        }
    }
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

        // don't let the rotation increment or decrement too much
        for (var j = 0; j < 3; j++) 
        {
            // increment
            if (objects[i].rotation[j] > 360)
                objects[i].rotation[j] -= 360;
            if (objects[i].direction[j] > 360)
                objects[i].direction[j] -= 360;
            if (objects[i].focusDirection[j] > 360)
                objects[i].focusDirection[j] -= 360;

            // decrement
            if (objects[i].rotation[j] < 0)
                objects[i].rotation[j] += 360;
            if (objects[i].direction[j] < 0)
                objects[i].direction[j] += 360;
            if (objects[i].focusDirection[j] < 0)
                objects[i].focusDirection[j] += 360;
        };




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