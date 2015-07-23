function Hangar()
{
    this.name = "hangar";
    this.position = [0, 0, 0];
    this.direction = [0, 0, 0]; 
    this.distance = 0.0;
    this.rotation = [0, 0, 0];
    this.shadow = {};
}

// Fill the buffer with the values that define Hangar.
Hangar.prototype.setGeometry = function() 
{
    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    this.vertices = new Float32Array([
        -2.091037,0.004655,6.270719,
        -4.030618,0.004655,6.270719,
        -4.030616,0.004655,-6.270722,
        -4.030617,3.15713,-6.27072,
        -4.030619,3.15713,6.270717,
        -2.091039,3.534597,6.270719,
        4.03062,3.15713,-6.270716,
        4.030615,3.15713,6.270723,
        4.030615,2.57957,6.270722,
        -2.091038,2.887883,6.270719,
        -2.091039,3.534597,6.270719,
        -4.030619,3.15713,6.270717,
        -4.030619,2.57957,6.270718,
        -4.030619,3.15713,6.270717,
        -4.030617,3.15713,-6.27072,
        -2.091036,0.004655,-6.270721,
        -4.030616,0.004655,-6.270722,
        -4.030617,2.57957,-6.27072,
        2.01531,2.89992,-6.270718,
        2.015309,0.004655,-6.27072,
        0.000001,0.004655,-6.27072,
        2.015306,3.549335,6.270722,
        -0.000002,3.94154,6.27072,
        -0.000002,3.220271,6.27072,
        0.000001,3.94154,-6.270718,
        -0.000002,3.94154,6.27072,
        2.015306,3.549335,6.270722,
        2.015309,0.004655,-6.27072,
        2.015309,0.004655,6.270719,
        0,0.004655,6.270719,
        0.000001,0.004655,-6.27072,
        -2.091036,0.004655,-6.270721,
        -2.091036,2.887883,-6.270719,
        -0.000002,3.220271,6.27072,
        -0.000002,3.94154,6.27072,
        -2.091039,3.534597,6.270719,
        -2.091036,3.534597,-6.270719,
        -2.091039,3.534597,6.270719,
        -0.000002,3.94154,6.27072,
        0.000001,0.004655,-6.27072,
        0,0.004655,6.270719,
        -2.091037,0.004655,6.270719,
        4.030618,0.004655,6.27072,
        2.015309,0.004655,6.270719,
        2.015309,0.004655,-6.27072,
        2.01531,3.549335,-6.270717,
        2.015306,3.549335,6.270722,
        4.030615,3.15713,6.270723,
        4.030615,3.15713,6.270723,
        2.015306,3.549335,6.270722,
        2.015307,2.89992,6.270721,
        4.030619,2.57957,-6.270717,
        4.030618,0.004655,-6.270719,
        2.015309,0.004655,-6.27072,
        4.03062,3.15713,-6.270716,
        4.030619,2.57957,-6.270717,
        2.01531,2.89992,-6.270718,
        4.030615,2.57957,6.270722,
        2.015307,2.89992,6.270721,
        2.015309,0.004655,6.270719,
        0.000001,3.220271,-6.270719,
        -2.091036,2.887883,-6.270719,
        -2.091036,3.534597,-6.270719,
        2.01531,3.549335,-6.270717,
        2.01531,2.89992,-6.270718,
        0.000001,3.220271,-6.270719,
        -2.091036,2.887883,-6.270719,
        -4.030617,2.57957,-6.27072,
        -4.030617,3.15713,-6.27072,
        -4.030619,2.57957,6.270718,
        -4.030617,2.57957,-6.27072,
        -4.030616,0.004655,-6.270722,
        -2.091037,0.004655,6.270719,
        -2.091038,2.887883,6.270719,
        -4.030619,2.57957,6.270718,
        4.030619,2.57957,-6.270717,
        4.030615,2.57957,6.270722,
        4.030618,0.004655,6.27072,
        -2.091036,0.004655,-6.270721,
        -2.091037,0.004655,6.270719,
        -4.030616,0.004655,-6.270722,
        -2.091036,3.534597,-6.270719,
        -4.030617,3.15713,-6.27072,
        -2.091039,3.534597,6.270719,
        4.030619,2.57957,-6.270717,
        4.03062,3.15713,-6.270716,
        4.030615,2.57957,6.270722,
        -4.030619,2.57957,6.270718,
        -2.091038,2.887883,6.270719,
        -4.030619,3.15713,6.270717,
        -4.030617,2.57957,-6.27072,
        -4.030619,2.57957,6.270718,
        -4.030617,3.15713,-6.27072,
        -2.091036,2.887883,-6.270719,
        -2.091036,0.004655,-6.270721,
        -4.030617,2.57957,-6.27072,
        0.000001,3.220271,-6.270719,
        2.01531,2.89992,-6.270718,
        0.000001,0.004655,-6.27072,
        2.015307,2.89992,6.270721,
        2.015306,3.549335,6.270722,
        -0.000002,3.220271,6.27072,
        2.01531,3.549335,-6.270717,
        0.000001,3.94154,-6.270718,
        2.015306,3.549335,6.270722,
        0.000001,0.004655,-6.27072,
        2.015309,0.004655,-6.27072,
        0,0.004655,6.270719,
        0.000001,3.220271,-6.270719,
        0.000001,0.004655,-6.27072,
        -2.091036,2.887883,-6.270719,
        -2.091038,2.887883,6.270719,
        -0.000002,3.220271,6.27072,
        -2.091039,3.534597,6.270719,
        0.000001,3.94154,-6.270718,
        -2.091036,3.534597,-6.270719,
        -0.000002,3.94154,6.27072,
        -2.091036,0.004655,-6.270721,
        0.000001,0.004655,-6.27072,
        -2.091037,0.004655,6.270719,
        4.030618,0.004655,-6.270719,
        4.030618,0.004655,6.27072,
        2.015309,0.004655,-6.27072,
        4.03062,3.15713,-6.270716,
        2.01531,3.549335,-6.270717,
        4.030615,3.15713,6.270723,
        4.030615,2.57957,6.270722,
        4.030615,3.15713,6.270723,
        2.015307,2.89992,6.270721,
        2.01531,2.89992,-6.270718,
        4.030619,2.57957,-6.270717,
        2.015309,0.004655,-6.27072,
        2.01531,3.549335,-6.270717,
        4.03062,3.15713,-6.270716,
        2.01531,2.89992,-6.270718,
        4.030618,0.004655,6.27072,
        4.030615,2.57957,6.270722,
        2.015309,0.004655,6.270719,
        0.000001,3.94154,-6.270718,
        0.000001,3.220271,-6.270719,
        -2.091036,3.534597,-6.270719,
        0.000001,3.94154,-6.270718,
        2.01531,3.549335,-6.270717,
        0.000001,3.220271,-6.270719,
        -2.091036,3.534597,-6.270719,
        -2.091036,2.887883,-6.270719,
        -4.030617,3.15713,-6.27072,
        -4.030618,0.004655,6.270719,
        -4.030619,2.57957,6.270718,
        -4.030616,0.004655,-6.270722,
        -4.030618,0.004655,6.270719,
        -2.091037,0.004655,6.270719,
        -4.030619,2.57957,6.270718,
        4.030618,0.004655,-6.270719,
        4.030619,2.57957,-6.270717,
        4.030618,0.004655,6.27072,
    ]);
    
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    this.vbo.itemSize = 3;
    this.vbo.numItems = this.vertices.length / this.vbo.itemSize;
}

Hangar.prototype.setColors = function() 
{
    this.cbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.cbo);
    this.colors = new Uint8Array(helpers.randomColors(this.vertices.length));
    
    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    this.cbo.itemSize = 3;
    this.cbo.numItems = this.colors.length / this.cbo.itemSize;

    this.shadow.cbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.shadow.cbo);
    this.shadow.colors = new Uint8Array(helpers.black(this.vertices.length));
    
    gl.bufferData(gl.ARRAY_BUFFER, this.shadow.colors, gl.STATIC_DRAW);
    this.shadow.cbo.itemSize = 3;
    this.shadow.cbo.numItems = this.shadow.colors.length / this.shadow.cbo.itemSize;
}
