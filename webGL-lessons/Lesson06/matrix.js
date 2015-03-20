function mat4(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    return [a, b, c, d,
            e, f, g, h,
            i, j, k, l,
            m, n, o, p];
}
function mat4ID() {
    return mat4(1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0);
}
function mat4Transpose(m) {
    return mat4(m[ 0], m[4], m[ 8], m[12],
                m[ 1], m[5], m[ 9], m[13],
                m[ 2], m[6], m[10], m[14],
                m[ 3], m[7], m[11], m[15]);
}
function mat4_x_vec4(m, v) {
    //  0  1  2  3        x
    //  4  5  6  7        y
    //  8  9 10 11   X    z
    // 12 13 14 15        w
    return new vec4(m[ 0] * v.x + m[ 1] * v.y + m[ 2] * v.z + m[ 3] * v.w,
                    m[ 4] * v.x + m[ 5] * v.y + m[ 6] * v.z + m[ 7] * v.w,
                    m[ 8] * v.x + m[ 9] * v.y + m[10] * v.z + m[11] * v.w,
                    m[12] * v.x + m[13] * v.y + m[14] * v.z + m[15] * v.w);
}

function mat4_x_mat4(m1, m2) {
    //  0  1  2  3        0  1  2  3
    //  4  5  6  7        4  5  6  7
    //  8  9 10 11   X    8  9 10 11
    // 12 13 14 15       12 13 14 15
    return mat4(m1[0 ] * m2[0] + m1[1 ] * m2[4] + m1[2 ] * m2[8 ] + m1[3 ] * m2[12],
                m1[0 ] * m2[1] + m1[1 ] * m2[5] + m1[2 ] * m2[9 ] + m1[3 ] * m2[13],
                m1[0 ] * m2[2] + m1[1 ] * m2[6] + m1[2 ] * m2[10] + m1[3 ] * m2[14],
                m1[0 ] * m2[3] + m1[1 ] * m2[7] + m1[2 ] * m2[11] + m1[3 ] * m2[15],

                m1[4 ] * m2[0] + m1[5 ] * m2[4] + m1[6 ] * m2[8 ] + m1[7 ] * m2[12],
                m1[4 ] * m2[1] + m1[5 ] * m2[5] + m1[6 ] * m2[9 ] + m1[7 ] * m2[13],
                m1[4 ] * m2[2] + m1[5 ] * m2[6] + m1[6 ] * m2[10] + m1[7 ] * m2[14],
                m1[4 ] * m2[3] + m1[5 ] * m2[7] + m1[6 ] * m2[11] + m1[7 ] * m2[15],

                m1[8 ] * m2[0] + m1[9 ] * m2[4] + m1[10] * m2[8 ] + m1[11] * m2[12],
                m1[8 ] * m2[1] + m1[9 ] * m2[5] + m1[10] * m2[9 ] + m1[11] * m2[13],
                m1[8 ] * m2[2] + m1[9 ] * m2[6] + m1[10] * m2[10] + m1[11] * m2[14],
                m1[8 ] * m2[3] + m1[9 ] * m2[7] + m1[10] * m2[11] + m1[11] * m2[15],

                m1[12] * m2[0] + m1[13] * m2[4] + m1[14] * m2[8 ] + m1[15] * m2[12],
                m1[12] * m2[1] + m1[13] * m2[5] + m1[14] * m2[9 ] + m1[15] * m2[13],
                m1[12] * m2[2] + m1[13] * m2[6] + m1[14] * m2[10] + m1[15] * m2[14],
                m1[12] * m2[3] + m1[13] * m2[7] + m1[14] * m2[11] + m1[15] * m2[15]);
}
function mat4_x_mat4_chain() {
    var result = mat4ID();
    for (var i = 0; i < arguments.length; i++)
        result = mat4_x_mat4(result, arguments[i]);
    return result;
}
function mat3_x_vec3(m, v) {
    // 0 3 6     x
    // 1 4 7  *  y
    // 2 5 8     z
    return new vec3(m[0] * v.x + m[3] * v.y + m[6] * v.z,
                    m[1] * v.x + m[4] * v.y + m[7] * v.z,
                    m[2] * v.x + m[5] * v.y + m[8] * v.z);
};

function mat3(a, b, c, d, e, f, g, h, i) {
    return [a, b, c,
            d, e, f,
            g, h, i];
}
function mat3ID() {
    return mat3(1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0);
}
function mat3Transpose(m) {
    return mat3(m[0], m[3], m[6],
                m[1], m[4], m[7],
                m[2], m[5], m[8]);
}
function mat4ToMat3(m) {
    return mat3(m[ 0], m[ 1], m[ 2],
                m[ 4], m[ 5], m[ 6],
                m[ 8], m[ 9], m[10]);
}

function MatrixStack() {
    this.stack = [];
    this.stack.push(mat4ID());
}
MatrixStack.prototype.push = function(nextMat) {
    var back = this.stack.length - 1;
    this.stack.push(mat4_x_mat4(this.stack[back], nextMat));
};
MatrixStack.prototype.pop = function() {
    if (this.stack.length > 1) this.stack.pop();
};
MatrixStack.prototype.back = function() {
    return (this.stack[this.stack.length-1]);
};


function ortho(l, r, b, t, n, f) {
    return mat4((2.0/(r-l)), 0.0        , 0.0         , -((r+l)/(r-l)),
                0.0        , (2.0/(t-b)), 0.0         , -((t+b)/(t-b)),
                0.0        , 0.0        , (-2.0/(f-n)), -((f+n)/(f-n)),
                0.0        , 0.0        , 0.0         , 1.0);
}
function orthoAspect(aspectRatio) {
    var l, r, b, t;
    if (aspectRatio <= 1)
    {
        l = -1; r = 1;
        t = 1/aspectRatio;
        b = -t;
    }
    else
    {
        r = aspectRatio;
        l = -r;
        b = -1; t = 1;
    }
    return ortho(l, r, t, b, -1, 1);
}
function perspective(l, r, t, b, n, f) {
    return mat4(((2.0*n)/(r-l)), 0.0            , ((r+l)/(r-l)) , 0.0,
                0.0            , ((2.0*n)/(t-b)), ((t+b)/(t-b)) , 0.0,
                0.0            , 0.0            , (-(f+n)/(f-n)), ((-2.0*f*n)/(f-n)),
                0.0            , 0.0            , -1.0          , 0.0);
}

Math.toRadians = function(degrees) { return degrees * Math.PI / 180.0; };
Math.toDegrees = function(radians) { return radians * 180.0 / Math.PI; };
function perspectiveAspect(aspect, fov, n, f) {
    var rad = Math.toRadians(fov / 2.0);
    var scale = Math.tan(rad) * n;
    var r = aspect * scale;
    var l = -r;
    var t = scale;
    var b = -t;
    return perspective(l, r, t, b, n, f);
}

//http://stackoverflow.com/questions/349050/calculating-a-lookat-matrix
//http://www.opengl.org/discussion_boards/showthread.php/123685-How-to-compute-the-matrix-used-by-gluLookAt
function lookAt(pos, look, up) {
    var z = pos.subtVec(look);
    z.normalize();
    var x = z.cross(up);
    x.normalize();
    var y = x.cross(z);
    y.normalize();

    var m1 = mat4(x.x, x.y, x.z, 0.0, // i
                  y.x, y.y, y.z, 0.0, // j
                  z.x, z.y, z.z, 0.0, // k
                  0.0, 0.0, 0.0, 1.0);
    var m2 = translate(-pos.x, -pos.y, -pos.z);
    return mat4_x_mat4(m1, m2);
}
function translate(x, y, z) {
    return mat4(1.0, 0.0, 0.0, x,
                0.0, 1.0, 0.0, y,
                0.0, 0.0, 1.0, z,
                0.0, 0.0, 0.0, 1.0);
}
function scale(x, y, z) {
    return mat4(x  , 0.0, 0.0, 0.0,
                0.0, y  , 0.0, 0.0,
                0.0, 0.0, z  , 0.0,
                0.0, 0.0, 0.0, 1.0);
}
function scaleAll(s) {return scale(s, s, s);}

// pitch
function rotateX(degrees) {
    var cosA = Math.cos((Math.PI / 180.0) * degrees);
    var sinA = Math.sin((Math.PI / 180.0) * degrees);
    return mat4(1.0, 0.0 ,  0.0 , 0.0,
                0.0, cosA, -sinA, 0.0,
                0.0, sinA,  cosA, 0.0,
                0.0, 0.0 ,  0.0 , 1.0);
}
// yaw
function rotateY(degrees) {
    var cosA = Math.cos((Math.PI / 180.0) * degrees);
    var sinA = Math.sin((Math.PI / 180.0) * degrees);
    return mat4(cosA , 0.0, sinA, 0.0,
                0.0  , 1.0, 0.0 , 0.0,
                -sinA, 0.0, cosA, 0.0,
                0.0  , 0.0, 0.0 , 1.0);
}
// roll
function rotateZ(degrees) {
    var cosA = Math.cos((Math.PI / 180.0) * degrees);
    var sinA = Math.sin((Math.PI / 180.0) * degrees);
    return mat4(cosA,-sinA, 0.0, 0.0,
                sinA, cosA, 0.0, 0.0,
                0.0 , 0.0 , 1.0, 0.0,
                0.0 , 0.0 , 0.0, 1.0);
}


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
    var a = clamp(this.dot(vec), -1.0, 1.0);
    return Math.acos(a);
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
    if (!a) a = 0; if (!b) b = 0; if (!c) c = 0;
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


