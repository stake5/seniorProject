
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

function mat4_x_vec3(m, v) {
    //  0  1  2  3        x
    //  4  5  6  7        y
    //  8  9 10 11   X    z
    // 12 13 14 15        1
    return new vec3(m[ 0] * v.x + m[ 1] * v.y + m[ 2] * v.z + m[ 3] * 1.0,
                    m[ 4] * v.x + m[ 5] * v.y + m[ 6] * v.z + m[ 7] * 1.0,
                    m[ 8] * v.x + m[ 9] * v.y + m[10] * v.z + m[11] * 1.0);
}

function mat4_x_mat4(m1, m2) {
    //  0  1  2  3        0  1  2  3
    //  4  5  6  7        4  5  6  7
    //  8  9 10 11   X    8  9 10 11
    // 12 13 14 15       12 13 14 15
    return [m1[ 0] * m2[ 0] + m1[ 1] * m2[ 4] + m1[ 2] * m2[ 8] + m1[ 3] * m2[12],
            m1[ 0] * m2[ 1] + m1[ 1] * m2[ 5] + m1[ 2] * m2[ 9] + m1[ 3] * m2[13],
            m1[ 0] * m2[ 2] + m1[ 1] * m2[ 6] + m1[ 2] * m2[10] + m1[ 3] * m2[14],
            m1[ 0] * m2[ 3] + m1[ 1] * m2[ 7] + m1[ 2] * m2[11] + m1[ 3] * m2[15],

            m1[ 4] * m2[ 0] + m1[ 5] * m2[ 4] + m1[ 6] * m2[ 8] + m1[ 7] * m2[12],
            m1[ 4] * m2[ 1] + m1[ 5] * m2[ 5] + m1[ 6] * m2[ 9] + m1[ 7] * m2[13],
            m1[ 4] * m2[ 2] + m1[ 5] * m2[ 6] + m1[ 6] * m2[10] + m1[ 7] * m2[14],
            m1[ 4] * m2[ 3] + m1[ 5] * m2[ 7] + m1[ 6] * m2[11] + m1[ 7] * m2[15],

            m1[ 8] * m2[ 0] + m1[ 9] * m2[ 4] + m1[10] * m2[ 8] + m1[11] * m2[12],
            m1[ 8] * m2[ 1] + m1[ 9] * m2[ 5] + m1[10] * m2[ 9] + m1[11] * m2[13],
            m1[ 8] * m2[ 2] + m1[ 9] * m2[ 6] + m1[10] * m2[10] + m1[11] * m2[14],
            m1[ 8] * m2[ 3] + m1[ 9] * m2[ 7] + m1[10] * m2[11] + m1[11] * m2[15],

            m1[12] * m2[ 0] + m1[13] * m2[ 4] + m1[14] * m2[ 8] + m1[15] * m2[12],
            m1[12] * m2[ 1] + m1[13] * m2[ 5] + m1[14] * m2[ 9] + m1[15] * m2[13],
            m1[12] * m2[ 2] + m1[13] * m2[ 6] + m1[14] * m2[10] + m1[15] * m2[14],
            m1[12] * m2[ 3] + m1[13] * m2[ 7] + m1[14] * m2[11] + m1[15] * m2[15]];
}

function mat4_x_mat4_chain() {
    var result = mat4ID();
    for (var i = 0; i < arguments.length; i++)
        result = mat4_x_mat4(result, arguments[i]);
    return result;
}



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

function mat4ToInverseMat3(mat) {
   // var a00 = mat[0], a01 = mat[4], a02 = mat[8 ];
   // var a10 = mat[1], a11 = mat[5], a12 = mat[9 ];
   // var a20 = mat[2], a21 = mat[6], a22 = mat[10];

   var a00 = mat[0], a01 = mat[1], a02 = mat[2 ];
   var a10 = mat[4], a11 = mat[5], a12 = mat[6 ];
   var a20 = mat[8], a21 = mat[9], a22 = mat[10];

   var b01 =  a22 * a11 - a12 * a21;
   var b11 =- a22 * a10 + a12 * a20;
   var b21 =  a21 * a10 - a11 * a20;

   var d = a00 * b01 + a01 * b11 + a02 * b21;
   if (!d) return null;
   var id = 1 / d;

   return mat3(b01*id, (-a22*a01+a02*a21)*id, (a12*a01-a02*a11)*id,
               b11*id, (a22*a00-a02*a20)*id , (-a12*a00+a02*a10)*id,
               b21*id, (-a21*a00+a01*a20)*id, (a11*a00-a01*a10)*id);
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


