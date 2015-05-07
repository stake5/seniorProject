
function quat(a, b, c, d) {
    if (!a) a = 0; if (!b) b = 0;
    if (!c) c = 0; if (!d) d = 1;
    this.x = a; this.y = b;
    this.z = c; this.w = d;
}

function quatFromAxisAngle(axis, angle) {
    var q = new quat();
    q.fromAxisAngle(axis, angle);
    q.normalize();
    return q;
}

quat.prototype.normalize = function() {
    var TOLERANCE = .00001;
    // Don't normalize if we don't have to
    var mag2 = this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
    if (Math.abs(mag2) > TOLERANCE && Math.abs(mag2 - 1.0) > TOLERANCE) {
        var mag = Math.sqrt(mag2);
        this.w /= mag; this.x /= mag; this.y /= mag; this.z /= mag;
    }
};

function quat_x_quat(q1, q2) {
    return new quat(
        q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x,
        q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y,
        q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z,
        -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w);
}

quat.prototype.multQuat = function(rq) {
    // the constructor takes its arguments as (x, y, z, w)
    // return new quat(this.w * rq.x + this.x * rq.w + this.y * rq.z - this.z * rq.y,
    //                    this.w * rq.y + this.y * rq.w + this.z * rq.x - this.x * rq.z,
    //                    this.w * rq.z + this.z * rq.w + this.x * rq.y - this.y * rq.x,
    //                    this.w * rq.w - this.x * rq.x - this.y * rq.y - this.z * rq.z);
    // (Q1 * Q2).x = (w1x2 + x1w2 + y1z2 - z1y2)
    // (Q1 * Q2).y = (w1y2 - x1z2 + y1w2 + z1x2)
    // (Q1 * Q2).z = (w1z2 + x1y2 - y1x2 + z1w2)
    // (Q1 * Q2).w = (w1w2 - x1x2 - y1y2 - z1z2)
    return new quat(
        (this.w * rq.x) + (this.x * rq.w) + (this.y * rq.z) - (this.z * rq.y),
        (this.w * rq.y) - (this.x * rq.z) + (this.y * rq.w) + (this.z * rq.x),
        (this.w * rq.z) + (this.x * rq.y) - (this.y * rq.x) + (this.z * rq.w),
        (this.w * rq.w) - (this.x * rq.x) - (this.y * rq.y) - (this.z * rq.z));
};

quat.prototype.getConjugate = function() {
    return new quat(-this.x, -this.y, -this.z, this.w);
};

// Multiplying a quaternion q with a vector v applies the q-rotation to v
quat.prototype.multVec3 = function(vec) {
    var vn = vec;
    vn.normalize();
    var vecQuat = new quat(vn.x, vn.y, vn.z, 0.0);
    var resQuat = vecQuat.multQuat(this.getConjugate());
    resQuat = this.multQuat(resQuat);
    return new vec3(resQuat.x, resQuat.y, resQuat.z);
};

// Convert from Axis Angle
quat.prototype.fromAxisAngle = function(axis, angle) {
    //axis.normalize();
    var a = angle / 2.0;
    var s = Math.sin(a);
    this.x = (axis.x * s);
    this.y = (axis.y * s);
    this.z = (axis.z * s);
    this.w = Math.cos(a);
};

quat.prototype.getAngle = function() {
    return Math.acos(this.w) * 2.0;
};

quat.prototype.getAxis = function() {
    var s = Math.sqrt(1.0 - this.w*this.w);
    if (s < 0.001) return new vec3(this.x, this.y, this.z);
    return new vec3(this.x / s, this.y / s, this.z / s);
};

quat.prototype.toMatrix = function() {
    var x = this.x; var y = this.y; var z = this.z; var w = this.w;
    var xx = x * x; var yy = y * y; var zz = z * z;
    return mat4(1-(2*yy + 2*zz), 2*x*y - 2*z*w  , 2*x*z + 2*y*w  , 0.0,
                2*x*y + 2*z*w  , 1-(2*xx + 2*zz), 2*y*z - 2*x*w  , 0.0,
                2*x*z - 2*y*w  , 2*y*z + 2*x*w  , 1-(2*xx + 2*yy), 0.0,
                0.0            , 0.0            , 0.0            , 1.0);
    //    ¦        2     2                                      ¦
    //    ¦ 1 - (2Y  + 2Z )   2XY + 2ZW         2XZ - 2YW       ¦
    //    ¦                                                     ¦
    //    ¦                          2     2                    ¦
    //M = ¦ 2XY - 2ZW         1 - (2X  + 2Z )   2YZ + 2XW       ¦
    //    ¦                                                     ¦
    //    ¦                                            2     2  ¦
    //    ¦ 2XZ + 2YW         2YZ - 2XW         1 - (2X  + 2Y ) ¦
    //    ¦                                                     ¦
}

quat.prototype.getTwist = function() {
    var x = this.x, y = this.y, z = this.z, w = this.w;
    var t = new quat();
    t.x = x / Math.sqrt(w*w + x*x);
    t.y = 0.0;
    t.z = 0.0;
    t.w = w / Math.sqrt(w*w + x*x);
    return t;
};

quat.prototype.getTwistX = function() {
    var x = this.x, y = this.y, z = this.z, w = this.w;
    var t = new quat();
    t.x = x / Math.sqrt(w*w + x*x);
    t.y = 0.0;
    t.z = 0.0;
    t.w = w / Math.sqrt(w*w + x*x);
    return t;
};

quat.prototype.getTwistY = function() {
    var x = this.x, y = this.y, z = this.z, w = this.w;
    var t = new quat();
    t.x = 0.0;
    t.y = y / Math.sqrt(w*w + y*y);
    t.z = 0.0;
    t.w = w / Math.sqrt(w*w + y*y);
    return t;
};

quat.prototype.getTwistZ = function() {
    var x = this.x, y = this.y, z = this.z, w = this.w;
    var t = new quat();
    t.x = 0.0;
    t.y = 0.0;
    t.z = z / Math.sqrt(w*w + z*z);
    t.w = w / Math.sqrt(w*w + z*z);
    return t;
};

quat.prototype.getSwing = function() {
    var x = this.x, y = this.y, z = this.z, w = this.w;
    var s = new quat();
    s.x = 0.0;
    s.y = (w*y - x*z) / Math.sqrt(w*w + x*x);
    s.z = (w*z + x*y) / Math.sqrt(w*w + x*x);
    s.w = Math.sqrt(w*w + x*x);
    return s;
};

quat.prototype.getSwingX = function() {
    var x = this.x, y = this.y, z = this.z, w = this.w;
    var s = new quat();
    s.x = 0.0;
    s.y = (w*y - x*z) / Math.sqrt(w*w + x*x);
    s.z = (w*z + x*y) / Math.sqrt(w*w + x*x);
    s.w = Math.sqrt(w*w + x*x);
    return s;
};

quat.prototype.getSwingY = function() {
    var x = this.x, y = this.y, z = this.z, w = this.w;
    var s = new quat();
    s.x = 0.0;
    s.y = (w*x + y*z) / Math.sqrt(w*w + y*y);
    s.z = (w*z - x*y) / Math.sqrt(w*w + y*y);
    s.w = Math.sqrt(w*w + x*x);
    return s;
};

quat.prototype.getSwingZ = function() {
    var x = this.x, y = this.y, z = this.z, w = this.w;
    var s = new quat();
    s.x = 0.0;
    s.y = (w*x - y*z) / Math.sqrt(w*w + z*z);
    s.z = (w*y - x*z) / Math.sqrt(w*w + z*z);
    s.w = Math.sqrt(w*w + z*z);
    return s;
};

// http://openmd.org/wp-content/docs/code/_quaternion_8hpp_source.html
quat.prototype.getTwistSwingAxisAngle = function() {
    var result = {};
    result.twistAngle = 2.0 * Math.atan2(this.z, this.w);
    result.swingAngle = 0.0;
    result.swingAxis = new vec3(1,0,0);
    var rt = new quat();
    var rs = new quat();
    rt.fromAxisAngle(new vec3(0,0,1), result.twistAngle);
    rs = this.multQuat(rt.getConjugate());

    var vl = Math.sqrt(rs.x*rs.x + rs.y*rs.y + rs.z*rs.z);
    if (vl > 0.0001) {
        var ivl = 1.0 / vl;
        result.swingAxis.x = rs.x * ivl;
        result.swingAxis.y = rs.y * ivl;
        result.swingAxis.z = rs.z * ivl;
        if (rs.w < 0.0)
            result.swingAngle = 2.0 * Math.atan2(-vl, -rs.w); //-PI,0
        else
            result.swingAngle = 2.0 * Math.atan2( vl,  rs.w); //0,PI
    }
    return result;
};
