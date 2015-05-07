
function Tank(x, y, z, width, height, length, r, g, b) {
	this.position = new vec3(x,y,z);
	this.baseDirection = new vec4(1,0,0,1);
	this.direction = new vec4(1,0,0,1);
	this.width = width;
	this.height = height;
	this.length = length;
	this.color = new vec4(r, g, b, 1.0);
	this.rotation = 0.0;
}

Tank.prototype.update = function(keysDown) {
	var rotationDirection = 0.0;
	if (keysDown[KEY_A]) rotationDirection -= 1;
	if (keysDown[KEY_D]) rotationDirection += 1;
	this.rotation += rotationDirection * 2;
	this.direction = mat4_x_vec4(rotateY(this.rotation), this.baseDirection);

	var movementDirection = 0.0;
	if (keysDown[KEY_S]) movementDirection -= 1;
	if (keysDown[KEY_W]) movementDirection += 1;
	this.position.x += this.direction.x * movementDirection;
	this.position.z += this.direction.z * movementDirection;
};

Tank.prototype.draw = function(pencil, cameraRotation) {
	var mvp = mat4_x_mat4_chain(
		pencil.projection,
		pencil.view,
		translate(this.position.x, this.position.y, this.position.z),
		rotateY(this.rotation),
		scale(this.length, this.height, this.width)
	);
    pencil.scp.bind(pencil.cube.vbo, pencil.cube.numElements);
    pencil.scp.setColor(this.color.x, this.color.y, this.color.z, this.color.w);
    pencil.scp.draw(mvp);

	mvp = mat4_x_mat4_chain(
		pencil.projection,
		pencil.view,
		translate(this.position.x, this.position.y + this.height * .5, this.position.z),
		rotateY(cameraRotation.y),
		scale(this.height, this.height * .5, this.height)
	);
    pencil.scp.setColor(0,0,0,1);
    pencil.scp.draw(mvp);

	mvp = mat4_x_mat4_chain(
		pencil.projection,
		pencil.view,
		translate(this.position.x, this.position.y + this.height * .5, this.position.z),
		rotateY(cameraRotation.y),
		scale(this.height, this.height * .5, this.height)
	);
    pencil.scp.setColor(0,0,0,1);
    pencil.scp.draw(mvp);
};
