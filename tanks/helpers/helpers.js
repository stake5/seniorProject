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

Helpers.prototype.black = function(length)
{
    var temp = new Array();
    
    for (var i = 0; i < length; i++)
    {
        temp.push(0);
    }
    
    return temp;
}

Helpers.prototype.flatten = function(array)
{
	var result = new Array();
	var temp;
	var slopeX;
	var slopeZ;

	for (var i = 0; i < array.length; i++) {
		temp = i % 3;
		switch(temp) {
			case 0:
	  			slopeX = (light[Y]-array[i + 1]) / (light[X]-array[i]);
  	  			result.push(light[X] - (light[Y] / slopeX));
	  			break;
			case 1:
				result.push(0)
				break;
			case 2:
	  			slopeZ = (light[Y]-array[i - 1]) / (light[Z]-array[i]);
				result.push(light[Z] - (light[Y] / slopeZ));
				break;
		}
	};
	return result;
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

	for (var i = 0; i < array1.length; i++) 
	{
		result[i] = array1[i] + array2[i];
	};

	return result;
}

function setOrigionalPositionsAndRotation()
{
	objects[SHERMAN].position = [0,0,0];
	objects[SHERMAN].rotation = [0,0,0];
	children[SHERMANTURRET].position = [0,0,0];
	children[SHERMANTURRET].rotation = [0,0,0];	

	objects[HETZER].position = [0,0,50];
	objects[HETZER].rotation = [0,degToRad(180),0];

	objects[KVTWO].position = [20,0,0];
	objects[KVTWO].rotation = [0,0,0];
	children[KVTWOTURRET].position = [20,0,0];
	children[KVTWOTURRET].rotation = [0,0,0];

	objects[ATEIGHT].position = [20,0,50];
	objects[ATEIGHT].rotation = [0,degToRad(180),0];

	objects[TEIGHTEEN].position = [-20,0,0];
	objects[TEIGHTEEN].rotation = [0,0,0];

	objects[ELCAMX].position = [-20,0,50];
	objects[ELCAMX].rotation = [0,degToRad(180),0];
	children[ELCTURRET].position = [-20,0,50];
	children[ELCTURRET].rotation = [0,degToRad(180),0];

	objects[BATCHAT].position = [40,0,0];
	objects[BATCHAT].rotation = [0,0,0];
	children[BATCHATTURRET].position = [40,0,0];
	children[BATCHATTURRET].rotation = [0,0,0];

	objects[8].position = [40,0,0];

	objects[9].position = [20,0,0];

	objects[10].position = [0,0,0];

	objects[11].position = [-20,0,0];

	objects[12].position = [20,0,50];
	objects[12].rotation = [0,degToRad(180),0];

	objects[13].position = [0,0,50];
	objects[13].rotation = [0,degToRad(180),0];

	objects[14].position = [-20,0,50];
	objects[14].rotation = [0,degToRad(180),0];

	objects[15].position = [45,0,7];

	objects[16].position = [25,0,7];

	objects[17].position = [5,0,7];

	objects[18].position = [-15,0,7];

	objects[19].position = [15,0,43];

	objects[20].position = [-5,0,43];

	objects[21].position = [-25,0,43];
}