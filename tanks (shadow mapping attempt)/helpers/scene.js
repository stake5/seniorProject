function initScene()
{ 
    // Set Geometry and colors
    skybox.setGeometry();
    skybox.setColors();
    skybox.setNormals();
    objects.forEach(function(object)
    {
        object.setGeometry();
        object.setColors();
        object.setNormals();
    });
    children.forEach(function(childObject)
    {
        childObject.setGeometry();
        childObject.setColors();
        childObject.setNormals();
    });
}