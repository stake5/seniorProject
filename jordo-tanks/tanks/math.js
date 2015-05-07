
function ortho(l, r, b, t, n, f) {
    return mat4((2.0/(r-l)), 0.0        , 0.0         , -((r+l)/(r-l)),
                0.0        , (2.0/(t-b)), 0.0         , -((t+b)/(t-b)),
                0.0        , 0.0        , (-2.0/(f-n)), -((f+n)/(f-n)),
                0.0        , 0.0        , 0.0         , 1.0);
}

function orthoAspect(aspectRatio) {
    var l, r, b, t;
    if (aspectRatio <= 1) {
        l = -1; r = 1;
        t = 1/aspectRatio;
        b = -t;
    }
    else {
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

Math.radians = function(degrees) { return degrees * Math.PI / 180.0; };
Math.degrees = function(radians) { return radians * 180.0 / Math.PI; };
function perspectiveAspect(aspect, fov, n, f) {
    var rad = Math.radians(fov / 2.0);
    var scale = Math.tan(rad) * n;
    var r = aspect * scale;
    var l = -r;
    var t = scale;
    var b = -t;
    return perspective(l, r, t, b, n, f);
}

// bro pingry's perspectiveAspect function
//function perspectiveAspect(aspectRatio, fov_deg, near, far)
//{
//  var fovVal = near * Math.tan(Math.PI*(fov_deg/2)/180);
//  var left = -fovVal;
//  var right = fovVal;
//  var top = fovVal;
//  var bottom = -fovVal;
//  if (aspectRatio > 1.0)
//    {
//      left *= aspectRatio;
//      right *= aspectRatio;
//  }
//  else
//    {
//      top /= aspectRatio;
//      bottom /= aspectRatio;
//  }
//  return perspective(left, right, top, bottom, near, far);
//}

//http://stackoverflow.com/questions/349050/calculating-a-lookat-matrix
//http://www.opengl.org/discussion_boards/showthread.php/123685-How-to-compute-the-matrix-used-by-gluLookAt
//[      1       0       0   0 ]   [ xaxis.x  yaxis.x  zaxis.x 0 ]
//[      0       1       0   0 ] * [ xaxis.y  yaxis.y  zaxis.y 0 ]
//[      0       0       1   0 ]   [ xaxis.z  yaxis.z  zaxis.z 0 ]
//[ -eye.x  -eye.y  -eye.z   1 ]   [       0        0        0 1 ]
//
//   [         xaxis.x          yaxis.x          zaxis.x  0 ]
// = [         xaxis.y          yaxis.y          zaxis.y  0 ]
//   [         xaxis.z          yaxis.z          zaxis.z  0 ]
//   [ dot(xaxis,-eye)  dot(yaxis,-eye)  dot(zaxis,-eye)  1 ]

// a relative to b is model a X inverse of model b

// eigen vectors
//  i j k
// |x x x|
// |x x x|
// |x x x|
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
function scaleAll(s) { return scale(s, s, s); }

// t+center  *  rotate  *  scale  *  t-center

// parentMatrix * childMatrix

// roll -> pitch -> yaw (z -> x -> y)
// mat multiply ->  yaw * pitch * roll (y * x * z)
function rotateX(degrees) { // pitch
    var cosA = Math.cos((Math.PI / 180.0) * degrees);
    var sinA = Math.sin((Math.PI / 180.0) * degrees);
    return mat4(1.0, 0.0 ,  0.0 , 0.0,
                0.0, cosA, -sinA, 0.0,
                0.0, sinA,  cosA, 0.0,
                0.0, 0.0 ,  0.0 , 1.0);
}

function rotateY(degrees) { // yaw
    var cosA = Math.cos((Math.PI / 180.0) * degrees);
    var sinA = Math.sin((Math.PI / 180.0) * degrees);
    return mat4(cosA , 0.0, sinA, 0.0,
                0.0  , 1.0, 0.0 , 0.0,
                -sinA, 0.0, cosA, 0.0,
                0.0  , 0.0, 0.0 , 1.0);
}

function rotateZ(degrees)  { // roll
    var cosA = Math.cos((Math.PI / 180.0) * degrees);
    var sinA = Math.sin((Math.PI / 180.0) * degrees);
    return mat4(cosA,-sinA, 0.0, 0.0,
                sinA, cosA, 0.0, 0.0,
                0.0 , 0.0 , 1.0, 0.0,
                0.0 , 0.0 , 0.0, 1.0);
}

function rotateEuler(heading, attitude, bank) {
    // Assuming the angles are in radians.
    var ch = Math.cos(heading);
    var sh = Math.sin(heading);
    var ca = Math.cos(attitude);
    var sa = Math.sin(attitude);
    var cb = Math.cos(bank);
    var sb = Math.sin(bank);

    var m00 = ch * ca;
    var m01 = sh*sb - ch*sa*cb;
    var m02 = ch*sa*sb + sh*cb;
    var m10 = sa;
    var m11 = ca*cb;
    var m12 = -ca*sb;
    var m20 = -sh*ca;
    var m21 = sh*sa*cb + ch*sb;
    var m22 = -sh*sa*sb + ch*cb;

    return mat4(
        m00, m01, m02, 0.0,
        m10, m11, m12, 0.0,
        m20, m21, m22, 0.0,
        0.0, 0.0, 0.0, 1.0);
}

function axisAngleToMatrix(axis, angle) {
//  axis  = {x,y,z} (should be normalized)
// angle = theta
// s = sin(theta)
// c = cos(theta)
// rotation_matrix =
// {{x*x + c*(1-x*x), x*y*(1-c) - z*s, x*z*(1-c) + y*s},
//  {x*y*(1-c) + z*s, y*y + c*(1-y*y), y*z*(1-c) - x*s},
//  {x*z*(1-c) - y*y, y*z*(1-c) + x*s, z*z + c*(1-z*z)}}
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var x = axis.x;
    var y = axis.y;
    var z = axis.z;

    var t = 1.0 - c;
    var m00 = c + x*x*t;
    var m11 = c + y*y*t;
    var m22 = c + z*z*t;

    var tmp1 = x*y*t;
    var tmp2 = z*s;
    var m10 = tmp1 + tmp2;
    var m01 = tmp1 - tmp2;
    var tmp1 = x*z*t;
    var tmp2 = y*s;
    var m20 = tmp1 - tmp2;
    var m02 = tmp1 + tmp2;
    var tmp1 = y*z*t;
    var tmp2 = x*s;
    var m21 = tmp1 + tmp2;
    var m12 = tmp1 - tmp2;

    var m = mat4(
        m00, m01, m02, 0,
        m10, m11, m12, 0,
        m20, m21, m22, 0,
        0, 0, 0, 1
    );

    // var m = mat4(
    //  x*x + c*(1-x*x), x*y*(1-c) - z*s, x*z*(1-c) + y*s, 0,
    //  x*y*(1-c) + z*s, y*y + c*(1-y*y), y*z*(1-c) - x*s, 0,
    //  x*z*(1-c) - y*y, y*z*(1-c) + x*s, z*z + c*(1-z*z), 0,
    //  0, 0, 0, 1);

    return m;
    // return mat4Transpose(m);
}

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function clamp(num, low, high) {
    return (num < low ? low : (num > high ? high : num));
}

function lerp(a, b, t) {
    return (a + ((b - a) * t));
}

function reflectVec2(dir, normal)
{
    var dot = normal.dot(dir);
    var x = dir.x - (normal.x * 2 * dot);
    var y = dir.y - (normal.y * 2 * dot);
    return new vec2(x, y);
}




