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

function displayPos()
{
	for (var i = 0; i < objects.length; i++) {
		console.log(i + ": ")
		console.log(objects[i].pos)
	};
}