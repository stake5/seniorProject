var currentlyPressedKeys = {};

//rotation direction variables
var x = 0;
var y = 0;

function handleKeyDown(event) {
  currentlyPressedKeys[event.keyCode] = true;

  if (String.fromCharCode(event.keyCode) == "F") {
    filter += 1;
    if (filter == 3) {
      filter = 0;
    }
  }
}

function handleKeyUp(event) {
  currentlyPressedKeys[event.keyCode] = false;
}

function handleKeys() {
  if (currentlyPressedKeys[37]) 
  {
    // Left cursor key
    //this.objectRotation -= 1;
    console.log("left arrow");
  }
  else if (currentlyPressedKeys[39]) 
  {
    // Right cursor key
    //.objectRotation += 1;
    console.log("right arrow");
  }
  /*
  if (currentlyPressedKeys[38]) 
  {
    // Up cursor key
    x = 1;
    console.log("up arrow");
  }
  else if (currentlyPressedKeys[40]) 
  {
    // Down cursor key
    x = -1;
    console.log("down arrow");
  }
  else
  {
    x = 0;
  }*/
}
