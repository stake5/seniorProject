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

function updateHUD()
{
	// document.getElementById("pitch").innerHTML = objects[FOCUS].rotation[Z];
	document.getElementById("yaw").innerHTML = objects[FOCUS].rotation[Y];
	document.getElementById("roll").innerHTML = objects[FOCUS].rotation[X];

	document.getElementById("x").innerHTML = objects[FOCUS].pos[X];
	document.getElementById("y").innerHTML = objects[FOCUS].pos[Y];
	document.getElementById("z").innerHTML = objects[FOCUS].pos[Z];

	document.getElementById("tx").innerHTML = objects[TERRAIN].pos[X];
	document.getElementById("ty").innerHTML = objects[TERRAIN].pos[Y];
	document.getElementById("tz").innerHTML = objects[TERRAIN].pos[Z];

	document.getElementById("focus").innerHTML = objects[FOCUS].name;


}