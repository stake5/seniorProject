this.tanks = [];
this.tanks.push(new Tank(0,0,0, 0, m4Model, m4Texture));
this.tanks.push(new Tank(0,0,0, 0, shermanModel, shermanTextur));

    if (this.keysDown[12]) {
        this.currentTank.moveForward();
    }


function Tank(x,y,z, rotation, model, texture) {
    this.pos = new vec3(x,y,z);
    this.rotation = rotation;
    this.texture = texture;
}

Tank.prototype.move = function(dir, distance) {
    this.pos.x += dir.x * distance;
    this.pos.y += dir.y * distance;
    this.pos.z += dir.z * distance;
};


function OpenGLTexture(gl, filePath) {
    this.glID = gl.createTexture();
}

    var camoTexture = new OpenGLTexture(gl, "assets/camo.png");
    var m4 = new Tank(0,0,0, 0, 

     = gl.createTexture();
    tankTexture.image = new Image();

    tankTexture.image.onload = function() {
      handleLoadedTexture(tankTexture)
    }

    tankTexture.image.src = "/home/stake/Pictures/tankTexture.gif";
}

                // handle the rotation by keypress
                document.addEventListener('keydown', function(event) {

                    if(event.keyCode == 37) {
                        this.keysDown[event.keyCode] = true;
                        rdirection = -1;
                        event.keyCode = 0;
                    }
                    else if(event.keyCode == 39) {
                        rdirection = 1;
                        event.keyCode = 0;

                    }
                    else
                    {
                        rdirection = 0;
                    }
                });

                document.addEventListener('keyup'), function(event) {
                    this.keysDown[event.keyCode] = false;
                });