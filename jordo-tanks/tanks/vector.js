
function vec2(a, b) {
    if (!a) a = 0;
    if (!b) b = 0;
    this.x = a; this.y = b;
}
vec2.prototype.dot = function(rhs) {
    return (this.x * rhs.x) + (this.y * rhs.y);
};
vec2.prototype.subtVec = function(rhs) {
    return new vec2(this.x - rhs.x, this.y - rhs.y);
};
vec2.prototype.addVec = function(rhs) {
    return new vec2(this.x + rhs.x, this.y + rhs.y);
};
vec2.prototype.multVec = function(rhs) {
    return new vec2(this.x * rhs.x, this.y * rhs.y);
};
vec2.prototype.scale = function(rhs) {
    return new vec2(this.x * rhs, this.y * rhs);
};
vec2.prototype.length = function() {
    return Math.sqrt(this.dot(this));
};
vec2.prototype.normalize = function() {
    var mag = Math.sqrt(this.dot(this));
    if (mag != 0.0) {this.x /= mag; this.y /= mag;}
};
vec2.prototype.distance = function(rhs) {
    var a = this.subtVec(rhs);
    return Math.sqrt((a.x * a.x) + (a.y * a.y));
};
vec2.prototype.angleBetween = function(vec) {
    // return Math.atan2(vec.y - this.y, vec.x - this.x);
    // return Math.atan2(vec.y, vec.x) - Math.atan2(this.y, this.x);
    var a = clamp(this.dot(vec), -1.0, 1.0);
    return Math.acos(a);

    // var dotProduct = this.dot(vec);
    // var lenProduct = this.length() * vec.length();
    // var divOperation = dotProduct / lenProduct;
    // return Math.acos(divOperation) * (180.0 / Math.PI);
};

// usage:  v.rotate(vec2RotateInfo(90.0), ori);
vec2.prototype.rotate = function(ri, por) {
    var cosA = ri.x; var sinA = ri.y;
    var min = new vec2(this.x - por.x, this.y - por.y);
    this.x = ((min.x * cosA) - (min.y * sinA)) + por.x;
    this.y = ((min.x * sinA) + (min.y * cosA)) + por.y;
};
vec2.prototype.str = function() {
    return "" + this.x + ", " + this.y;
};
function vec2RotateInfo(degrees) {
    var cosA = Math.cos((Math.PI / 180.0) * degrees);
    var sinA = Math.sin((Math.PI / 180.0) * degrees);
    return new vec2(cosA, sinA);
}



function vec3(a, b, c) {
    if (!a) a = 0;
    if (!b) b = 0;
    if (!c) c = 0;
    this.x = a; this.y = b; this.z = c;
}
vec3.prototype.dot = function(rhs) {
    return (this.x * rhs.x) + (this.y * rhs.y) + (this.z * rhs.z);
};
vec3.prototype.cross = function(rhs) {
    return new vec3((this.y * rhs.z) - (this.z * rhs.y),
                    (this.z * rhs.x) - (this.x * rhs.z),
                    (this.x * rhs.y) - (this.y * rhs.x));
};
vec3.prototype.subtVec = function(rhs) {
    return new vec3(this.x - rhs.x, this.y - rhs.y, this.z - rhs.z);
};
vec3.prototype.addVec = function(rhs) {
    return new vec3(this.x + rhs.x, this.y + rhs.y, this.z + rhs.z);
};
vec3.prototype.multVec = function(rhs) {
    return new vec3(this.x * rhs.x, this.y * rhs.y, this.z * rhs.z);
};
vec3.prototype.scale = function(rhs) {
    return new vec3(this.x * rhs, this.y * rhs, this.z * rhs);
};
vec3.prototype.length = function() {
    return Math.sqrt(this.dot(this));
};
vec3.prototype.lengthSquared = function() {
    return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
};
vec3.prototype.normalize = function() {
    var mag = Math.sqrt(this.dot(this));
    if (mag != 0.0) {this.x /= mag; this.y /= mag; this.z /= mag;}
};
vec3.prototype.str = function() {
    var xs = this.x.toFixed(2);
    var ys = this.y.toFixed(2);
    var zs = this.z.toFixed(2);
    return "" + xs + ", " + ys + ", " + zs;
};

function mat3MultVec3(m, v) {
    // 0 3 6     x
    // 1 4 7  *  y
    // 2 5 8     z

    return new vec3(m[0] * v.x + m[3] * v.y + m[6] * v.z,
                    m[1] * v.x + m[4] * v.y + m[7] * v.z,
                    m[2] * v.x + m[5] * v.y + m[8] * v.z);

    //    return new vec3(m[0] * v.x + m[1] * v.y + m[2] * v.z,
    //                    m[3] * v.x + m[4] * v.y + m[5] * v.z,
    //                    m[6] * v.x + m[7] * v.y + m[8] * v.z);
};





function vec4(a, b, c, d) {
    if (!a) a = 0;
    if (!b) b = 0;
    if (!c) c = 0;
    if (!d) d = 0;
    this.x = a; this.y = b; this.z = c; this.w = d;
}
vec4.prototype.dot = function(rhs) {
    return (this.x * rhs.x) + (this.y * rhs.y) + (this.z * rhs.z) + (this.w * rhs.w);
};
vec4.prototype.subtVec = function(rhs) {
    return new vec4(this.x - rhs.x, this.y - rhs.y, this.z - rhs.z, this.w - rhs.w);
};
vec4.prototype.addVec = function(rhs) {
    return new vec4(this.x + rhs.x, this.y + rhs.y, this.z + rhs.z, this.w + rhs.w);
};
vec4.prototype.multVec = function(rhs) {
    return new vec4(this.x * rhs.x, this.y * rhs.y, this.z * rhs.z, this.w * rhs.w);
};
vec4.prototype.scale = function(rhs) {
    return new vec4(this.x * rhs, this.y * rhs, this.z * rhs, this.w * rhs);
};
vec4.prototype.normalize = function() {
    var mag = Math.sqrt(this.dot(this));
    if (mag != 0.0) {this.x /= mag; this.y /= mag; this.z /= mag; this.w /= mag;}
};
vec4.prototype.str = function() {
    return "" + this.x + ", " + this.y + ", " + this.z + ", " + this.w;
};


