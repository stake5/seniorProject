function Helpers(){}

Helpers.prototype.randomColors = function(length)
{
    var temp = new Array();
    
    for (var i = 0; i < length; i++)
    {
        temp.push(Math.floor((Math.random() * 255) + 1));
    }
    
    return temp;
}

function radToDeg(r) {
return r * 180 / Math.PI;
}

function degToRad(d) {
return d * Math.PI / 180;
}

function subArrays(array1, array2)
{
	var result = new Array();

	for (var i = 0; i < array1.length; i++) {
		result[i] = array1[i] - array2[i];
	};

	return result;
}

function addArrays(array1, array2)
{
	var result = new Array();

	for (var i = 0; i < array1.length; i++) {
		result[i] = array1[i] + array2[i];
	};

	return result;
}