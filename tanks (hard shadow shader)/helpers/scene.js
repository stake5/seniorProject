function initScene()
{ 
    // Set Geometry and colors
    skybox.setGeometry();
    skybox.setColors();
    objects.forEach(function(object)
    {
        object.setGeometry();
        object.setColors();
    });
    children.forEach(function(childObject)
    {
        childObject.setGeometry();
        childObject.setColors();
    });
}