function createSquare(bl, tl, tr, br)
{
	
}

function createCircle(center, radius, height, numPoints)
{
	circle = new Array();
	result = new Array();
	var reference = new Array();
	var stepSize = ((2*Math.PI)/numPoints);

    for (var d = 0; d <= (2*Math.PI)-stepSize; d += stepSize) 
    {
    	var x = ((Math.sin(d) * radius) + center[X]);
    	var y = height;
    	var z = ((Math.cos(d) * radius) + center[Y]);
    	circle.push([x,y,z]);
    }

    console.log(numPoints / 4);

    // adda a semicircle
    for (var i = 0; i < ((circle.length / 2) - 2); i++) {
    	result = pushVertex(result, circle[i]);
    	result = pushVertex(result, circle[i + 1]);
    	result = pushVertex(result, circle[i + 2]);
    };

    result = pushVertex(result, circle[2]);
    return result;
}

function pushVertex(array, vertex)
{
	for (var i = vertex.length - 1; i >= 0; i--) {
		array.push(vertex[i]);
	};
	return array;
}
