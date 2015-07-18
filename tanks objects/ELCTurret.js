function ELCTurret(x, y, z)
{
    this.position = [x, y, z];
    this.direction = [0, 0, 0]; 
    this.distance = 0.0;
    this.rotation = [0, 0, 0];
}

// Fill the buffer with the values that define ELCTurret.
ELCTurret.prototype.setGeometry = function(gl) 
{
    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    this.vertices = new Float32Array([
        -0.652854,1.154768,-0.977819,
        -0.652854,0.656219,-0.977819,
        -0.652854,0.656219,-0.397095,
        0.660215,1.154768,-0.977819,
        0.660215,0.656219,-0.977819,
        0.377697,0.656219,-1.280615,
        0.660215,1.154768,-0.977819,
        0.379913,1.154768,-0.397095,
        0.660215,0.656219,-0.397095,
        -0.340331,1.154768,-0.413732,
        -0.355047,1.154768,-0.397095,
        -0.652854,0.656219,-0.397095,
        0.377697,0.656219,-1.280615,
        0.660215,0.656219,-0.977819,
        0.660215,0.656219,-0.397095,
        -0.340331,1.154768,-0.413732,
        -0.340331,1.154768,-1.280615,
        -0.652854,1.154768,-0.977819,
        0.377697,1.154768,-1.280615,
        -0.340331,1.154768,-1.280615,
        -0.340331,1.154768,-0.413732,
        -0.652854,0.656219,-0.397095,
        -0.652854,0.656219,-0.977819,
        -0.340331,0.656219,-1.280615,
        -0.340331,1.154768,-0.413732,
        -0.340331,0.656219,0.032455,
        0.377697,0.656219,0.032455,
        -0.340331,1.154768,-1.280615,
        -0.340331,0.656219,-1.280615,
        -0.652854,0.656219,-0.977819,
        0.379913,1.154768,-0.397095,
        0.377697,1.154768,-0.413732,
        0.377697,0.656219,0.032455,
        0.660215,1.154768,-0.977819,
        0.377697,1.154768,-1.280615,
        0.377697,1.154768,-0.413732,
        -0.340331,0.656219,-1.280615,
        0.377697,0.656219,-1.280615,
        0.377697,0.656219,0.032455,
        0.377697,1.154768,-1.280615,
        0.377697,0.656219,-1.280615,
        -0.340331,0.656219,-1.280615,
        0.031957,0.994131,-0.761943,
        0.031957,0.994035,1.254126,
        0.045863,0.992665,1.254113,
        0.045863,0.992761,-0.761956,
        0.045863,0.992665,1.254113,
        0.059235,0.988609,1.254074,
        0.059235,0.988705,-0.761994,
        0.059235,0.988609,1.254074,
        0.071559,0.982022,1.254011,
        0.071559,0.982118,-0.762057,
        0.071559,0.982022,1.254011,
        0.08236,0.973157,1.253926,
        0.08236,0.973253,-0.762143,
        0.08236,0.973157,1.253926,
        0.091225,0.962355,1.253823,
        0.091225,0.962452,-0.762246,
        0.091225,0.962355,1.253823,
        0.097812,0.950032,1.253704,
        0.097812,0.950128,-0.762363,
        0.097812,0.950032,1.253704,
        0.101868,0.93666,1.253577,
        0.101868,0.936756,-0.762491,
        0.101868,0.93666,1.253577,
        0.103238,0.922753,1.253444,
        0.103238,0.92285,-0.762625,
        0.103238,0.922753,1.253444,
        0.101868,0.908847,1.253311,
        0.101868,0.908943,-0.762757,
        0.101868,0.908847,1.253311,
        0.097812,0.895475,1.253184,
        0.097812,0.895572,-0.762885,
        0.097812,0.895475,1.253184,
        0.091225,0.883152,1.253065,
        0.091225,0.883248,-0.763002,
        0.091225,0.883152,1.253065,
        0.08236,0.87235,1.252962,
        0.08236,0.872446,-0.763106,
        0.08236,0.87235,1.252962,
        0.071559,0.863485,1.252877,
        0.071559,0.863582,-0.763191,
        0.071559,0.863485,1.252877,
        0.059235,0.856898,1.252815,
        0.059235,0.856995,-0.763254,
        0.059235,0.856898,1.252815,
        0.045863,0.852842,1.252775,
        0.045863,0.852938,-0.763293,
        0.045863,0.852842,1.252775,
        0.031957,0.851472,1.252763,
        0.031957,0.851472,1.252763,
        0.018051,0.852842,1.252775,
        0.018051,0.852938,-0.763293,
        0.018051,0.852842,1.252775,
        0.004679,0.856898,1.252815,
        0.004679,0.856995,-0.763254,
        0.004679,0.856898,1.252815,
        -0.007645,0.863485,1.252877,
        -0.007645,0.863582,-0.763191,
        -0.007645,0.863485,1.252877,
        -0.018447,0.87235,1.252962,
        -0.018447,0.872446,-0.763106,
        -0.018447,0.87235,1.252962,
        -0.027311,0.883152,1.253065,
        -0.027311,0.883248,-0.763002,
        -0.027311,0.883152,1.253065,
        -0.033898,0.895475,1.253184,
        -0.033898,0.895572,-0.762885,
        -0.033898,0.895475,1.253184,
        -0.037955,0.908847,1.253311,
        -0.037955,0.908944,-0.762757,
        -0.037955,0.908847,1.253311,
        -0.039324,0.922753,1.253444,
        -0.039324,0.92285,-0.762625,
        -0.039324,0.922753,1.253444,
        -0.037955,0.93666,1.253577,
        -0.037955,0.936756,-0.762491,
        -0.037955,0.93666,1.253577,
        -0.033898,0.950032,1.253704,
        -0.033898,0.950128,-0.762363,
        -0.033898,0.950032,1.253704,
        -0.027311,0.962355,1.253823,
        -0.027311,0.962452,-0.762246,
        -0.027311,0.962355,1.253823,
        -0.018446,0.973157,1.253926,
        -0.018446,0.973253,-0.762143,
        -0.018446,0.973157,1.253926,
        -0.007645,0.982022,1.254011,
        -0.007645,0.982118,-0.762057,
        -0.007645,0.982022,1.254011,
        0.004679,0.988609,1.254074,
        0.004679,0.988705,-0.761994,
        0.101868,0.908847,1.253311,
        0.103238,0.922753,1.253444,
        -0.039324,0.922753,1.253444,
        0.018051,0.992665,1.254113,
        0.031957,0.994035,1.254126,
        0.031957,0.994131,-0.761943,
        0.004679,0.988609,1.254074,
        0.018051,0.992665,1.254113,
        0.018051,0.992761,-0.761956,
        0.091225,0.883248,-0.763002,
        -0.027311,0.883248,-0.763002,
        0.097812,0.895572,-0.762885,
        -0.355047,1.154768,-0.397095,
        -0.652854,1.154768,-0.977819,
        -0.652854,0.656219,-0.397095,
        0.377697,1.154768,-1.280615,
        0.660215,1.154768,-0.977819,
        0.377697,0.656219,-1.280615,
        0.660215,0.656219,-0.977819,
        0.660215,1.154768,-0.977819,
        0.660215,0.656219,-0.397095,
        -0.340331,0.656219,0.032455,
        -0.340331,1.154768,-0.413732,
        -0.652854,0.656219,-0.397095,
        0.377697,0.656219,0.032455,
        0.377697,0.656219,-1.280615,
        0.660215,0.656219,-0.397095,
        -0.355047,1.154768,-0.397095,
        -0.340331,1.154768,-0.413732,
        -0.652854,1.154768,-0.977819,
        0.377697,1.154768,-0.413732,
        0.377697,1.154768,-1.280615,
        -0.340331,1.154768,-0.413732,
        -0.340331,0.656219,0.032455,
        -0.652854,0.656219,-0.397095,
        -0.340331,0.656219,-1.280615,
        0.377697,1.154768,-0.413732,
        -0.340331,1.154768,-0.413732,
        0.377697,0.656219,0.032455,
        -0.652854,1.154768,-0.977819,
        -0.340331,1.154768,-1.280615,
        -0.652854,0.656219,-0.977819,
        0.660215,0.656219,-0.397095,
        0.379913,1.154768,-0.397095,
        0.377697,0.656219,0.032455,
        0.379913,1.154768,-0.397095,
        0.660215,1.154768,-0.977819,
        0.377697,1.154768,-0.413732,
        -0.340331,0.656219,0.032455,
        -0.340331,0.656219,-1.280615,
        0.377697,0.656219,0.032455,
        -0.340331,1.154768,-1.280615,
        0.377697,1.154768,-1.280615,
        -0.340331,0.656219,-1.280615,
        0.045863,0.992761,-0.761956,
        0.031957,0.994131,-0.761943,
        0.045863,0.992665,1.254113,
        0.059235,0.988705,-0.761994,
        0.045863,0.992761,-0.761956,
        0.059235,0.988609,1.254074,
        0.071559,0.982118,-0.762057,
        0.059235,0.988705,-0.761994,
        0.071559,0.982022,1.254011,
        0.08236,0.973253,-0.762143,
        0.071559,0.982118,-0.762057,
        0.08236,0.973157,1.253926,
        0.091225,0.962452,-0.762246,
        0.08236,0.973253,-0.762143,
        0.091225,0.962355,1.253823,
        0.097812,0.950128,-0.762363,
        0.091225,0.962452,-0.762246,
        0.097812,0.950032,1.253704,
        0.101868,0.936756,-0.762491,
        0.097812,0.950128,-0.762363,
        0.101868,0.93666,1.253577,
        0.103238,0.92285,-0.762625,
        0.101868,0.936756,-0.762491,
        0.103238,0.922753,1.253444,
        0.101868,0.908943,-0.762757,
        0.103238,0.92285,-0.762625,
        0.101868,0.908847,1.253311,
        0.097812,0.895572,-0.762885,
        0.101868,0.908943,-0.762757,
        0.097812,0.895475,1.253184,
        0.091225,0.883248,-0.763002,
        0.097812,0.895572,-0.762885,
        0.091225,0.883152,1.253065,
        0.08236,0.872446,-0.763106,
        0.091225,0.883248,-0.763002,
        0.08236,0.87235,1.252962,
        0.071559,0.863582,-0.763191,
        0.08236,0.872446,-0.763106,
        0.071559,0.863485,1.252877,
        0.059235,0.856995,-0.763254,
        0.071559,0.863582,-0.763191,
        0.059235,0.856898,1.252815,
        0.045863,0.852938,-0.763293,
        0.059235,0.856995,-0.763254,
        0.045863,0.852842,1.252775,
        0.031957,0.851569,-0.763306,
        0.045863,0.852938,-0.763293,
        0.031957,0.851472,1.252763,
        0.031957,0.851569,-0.763306,
        0.031957,0.851472,1.252763,
        0.018051,0.852938,-0.763293,
        0.018051,0.852938,-0.763293,
        0.018051,0.852842,1.252775,
        0.004679,0.856995,-0.763254,
        0.004679,0.856995,-0.763254,
        0.004679,0.856898,1.252815,
        -0.007645,0.863582,-0.763191,
        -0.007645,0.863582,-0.763191,
        -0.007645,0.863485,1.252877,
        -0.018447,0.872446,-0.763106,
        -0.018447,0.872446,-0.763106,
        -0.018447,0.87235,1.252962,
        -0.027311,0.883248,-0.763002,
        -0.027311,0.883248,-0.763002,
        -0.027311,0.883152,1.253065,
        -0.033898,0.895572,-0.762885,
        -0.033898,0.895572,-0.762885,
        -0.033898,0.895475,1.253184,
        -0.037955,0.908944,-0.762757,
        -0.037955,0.908944,-0.762757,
        -0.037955,0.908847,1.253311,
        -0.039324,0.92285,-0.762625,
        -0.039324,0.92285,-0.762625,
        -0.039324,0.922753,1.253444,
        -0.037955,0.936756,-0.762491,
        -0.037955,0.936756,-0.762491,
        -0.037955,0.93666,1.253577,
        -0.033898,0.950128,-0.762363,
        -0.033898,0.950128,-0.762363,
        -0.033898,0.950032,1.253704,
        -0.027311,0.962452,-0.762246,
        -0.027311,0.962452,-0.762246,
        -0.027311,0.962355,1.253823,
        -0.018446,0.973253,-0.762143,
        -0.018446,0.973253,-0.762143,
        -0.018446,0.973157,1.253926,
        -0.007645,0.982118,-0.762057,
        -0.007645,0.982118,-0.762057,
        -0.007645,0.982022,1.254011,
        0.004679,0.988705,-0.761994,
        0.004679,0.988609,1.254074,
        0.059235,0.988609,1.254074,
        0.045863,0.992665,1.254113,
        -0.007645,0.982022,1.254011,
        0.08236,0.973157,1.253926,
        0.071559,0.982022,1.254011,
        -0.033898,0.950032,1.253704,
        0.097812,0.950032,1.253704,
        0.091225,0.962355,1.253823,
        -0.037955,0.93666,1.253577,
        0.103238,0.922753,1.253444,
        0.101868,0.93666,1.253577,
        -0.033898,0.895475,1.253184,
        0.097812,0.895475,1.253184,
        0.101868,0.908847,1.253311,
        -0.027311,0.883152,1.253065,
        0.08236,0.87235,1.252962,
        0.091225,0.883152,1.253065,
        0.004679,0.856898,1.252815,
        0.059235,0.856898,1.252815,
        0.071559,0.863485,1.252877,
        0.018051,0.852842,1.252775,
        0.031957,0.851472,1.252763,
        0.045863,0.852842,1.252775,
        0.059235,0.856898,1.252815,
        0.004679,0.856898,1.252815,
        0.018051,0.852842,1.252775,
        0.071559,0.863485,1.252877,
        -0.018447,0.87235,1.252962,
        -0.007645,0.863485,1.252877,
        0.097812,0.895475,1.253184,
        -0.033898,0.895475,1.253184,
        -0.027311,0.883152,1.253065,
        0.101868,0.908847,1.253311,
        -0.039324,0.922753,1.253444,
        -0.037955,0.908847,1.253311,
        0.097812,0.950032,1.253704,
        -0.033898,0.950032,1.253704,
        -0.037955,0.93666,1.253577,
        0.091225,0.962355,1.253823,
        -0.018446,0.973157,1.253926,
        -0.027311,0.962355,1.253823,
        0.059235,0.988609,1.254074,
        0.004679,0.988609,1.254074,
        -0.007645,0.982022,1.254011,
        0.045863,0.992665,1.254113,
        0.031957,0.994035,1.254126,
        0.018051,0.992665,1.254113,
        -0.007645,0.982022,1.254011,
        0.071559,0.982022,1.254011,
        0.059235,0.988609,1.254074,
        -0.037955,0.93666,1.253577,
        0.101868,0.93666,1.253577,
        0.097812,0.950032,1.253704,
        -0.027311,0.883152,1.253065,
        0.091225,0.883152,1.253065,
        0.097812,0.895475,1.253184,
        0.018051,0.852842,1.252775,
        0.045863,0.852842,1.252775,
        0.059235,0.856898,1.252815,
        0.071559,0.863485,1.252877,
        -0.007645,0.863485,1.252877,
        0.004679,0.856898,1.252815,
        0.101868,0.908847,1.253311,
        -0.037955,0.908847,1.253311,
        -0.033898,0.895475,1.253184,
        0.091225,0.962355,1.253823,
        -0.027311,0.962355,1.253823,
        -0.033898,0.950032,1.253704,
        0.045863,0.992665,1.254113,
        0.018051,0.992665,1.254113,
        0.004679,0.988609,1.254074,
        -0.007645,0.982022,1.254011,
        -0.018446,0.973157,1.253926,
        0.08236,0.973157,1.253926,
        -0.027311,0.883152,1.253065,
        -0.018447,0.87235,1.252962,
        0.08236,0.87235,1.252962,
        0.071559,0.863485,1.252877,
        0.08236,0.87235,1.252962,
        -0.018447,0.87235,1.252962,
        0.091225,0.962355,1.253823,
        0.08236,0.973157,1.253926,
        -0.018446,0.973157,1.253926,
        -0.037955,0.93666,1.253577,
        -0.039324,0.922753,1.253444,
        0.103238,0.922753,1.253444,
        0.018051,0.992761,-0.761956,
        0.018051,0.992665,1.254113,
        0.031957,0.994131,-0.761943,
        0.004679,0.988705,-0.761994,
        0.004679,0.988609,1.254074,
        0.018051,0.992761,-0.761956,
        0.045863,0.992761,-0.761956,
        0.018051,0.992761,-0.761956,
        0.031957,0.994131,-0.761943,
        0.059235,0.988705,-0.761994,
        -0.007645,0.982118,-0.762057,
        0.004679,0.988705,-0.761994,
        0.08236,0.973253,-0.762143,
        -0.027311,0.962452,-0.762246,
        -0.018446,0.973253,-0.762143,
        0.097812,0.950128,-0.762363,
        -0.037955,0.936756,-0.762491,
        -0.033898,0.950128,-0.762363,
        0.103238,0.92285,-0.762625,
        -0.037955,0.908944,-0.762757,
        -0.039324,0.92285,-0.762625,
        0.097812,0.895572,-0.762885,
        -0.027311,0.883248,-0.763002,
        -0.033898,0.895572,-0.762885,
        0.08236,0.872446,-0.763106,
        -0.007645,0.863582,-0.763191,
        -0.018447,0.872446,-0.763106,
        0.045863,0.852938,-0.763293,
        0.018051,0.852938,-0.763293,
        0.004679,0.856995,-0.763254,
        0.018051,0.852938,-0.763293,
        0.045863,0.852938,-0.763293,
        0.031957,0.851569,-0.763306,
        0.004679,0.856995,-0.763254,
        0.071559,0.863582,-0.763191,
        0.059235,0.856995,-0.763254,
        -0.018447,0.872446,-0.763106,
        0.091225,0.883248,-0.763002,
        0.08236,0.872446,-0.763106,
        -0.033898,0.895572,-0.762885,
        0.101868,0.908943,-0.762757,
        0.097812,0.895572,-0.762885,
        -0.039324,0.92285,-0.762625,
        0.101868,0.936756,-0.762491,
        0.103238,0.92285,-0.762625,
        -0.033898,0.950128,-0.762363,
        0.091225,0.962452,-0.762246,
        0.097812,0.950128,-0.762363,
        -0.018446,0.973253,-0.762143,
        0.071559,0.982118,-0.762057,
        0.08236,0.973253,-0.762143,
        0.018051,0.992761,-0.761956,
        0.045863,0.992761,-0.761956,
        0.059235,0.988705,-0.761994,
        0.059235,0.988705,-0.761994,
        0.004679,0.988705,-0.761994,
        0.018051,0.992761,-0.761956,
        0.08236,0.973253,-0.762143,
        0.091225,0.962452,-0.762246,
        -0.027311,0.962452,-0.762246,
        0.103238,0.92285,-0.762625,
        0.101868,0.908943,-0.762757,
        -0.037955,0.908944,-0.762757,
        0.08236,0.872446,-0.763106,
        0.071559,0.863582,-0.763191,
        -0.007645,0.863582,-0.763191,
        0.004679,0.856995,-0.763254,
        0.059235,0.856995,-0.763254,
        0.045863,0.852938,-0.763293,
        -0.018447,0.872446,-0.763106,
        -0.027311,0.883248,-0.763002,
        0.091225,0.883248,-0.763002,
        -0.039324,0.92285,-0.762625,
        -0.037955,0.936756,-0.762491,
        0.101868,0.936756,-0.762491,
        -0.018446,0.973253,-0.762143,
        -0.007645,0.982118,-0.762057,
        0.071559,0.982118,-0.762057,
        0.059235,0.988705,-0.761994,
        0.071559,0.982118,-0.762057,
        -0.007645,0.982118,-0.762057,
        -0.037955,0.908944,-0.762757,
        0.101868,0.908943,-0.762757,
        -0.033898,0.895572,-0.762885,
        0.004679,0.856995,-0.763254,
        -0.007645,0.863582,-0.763191,
        0.071559,0.863582,-0.763191,
        0.101868,0.936756,-0.762491,
        -0.037955,0.936756,-0.762491,
        0.097812,0.950128,-0.762363,
        -0.027311,0.962452,-0.762246,
        0.091225,0.962452,-0.762246,
        -0.033898,0.950128,-0.762363,
        -0.01471,1.093767,-0.076624,
        -0.01471,1.093767,-0.610229,
        -0.150113,0.819139,-0.610229,
        -0.01471,1.093767,-0.610229,
        0.108823,1.093767,-0.610229,
        0.240344,0.819139,-0.610229,
        0.108823,1.093767,-0.076624,
        0.240344,0.819139,0.045569,
        0.240344,0.819139,-0.610229,
        -0.01471,1.093767,-0.076624,
        -0.150113,0.819139,0.045569,
        0.240344,0.819139,0.045569,
        -0.150113,0.819139,-0.610229,
        0.240344,0.819139,-0.610229,
        0.240344,0.819139,0.045569,
        0.108823,1.093767,-0.610229,
        -0.01471,1.093767,-0.610229,
        -0.01471,1.093767,-0.076624,
        -0.150113,0.819139,0.045569,
        -0.01471,1.093767,-0.076624,
        -0.150113,0.819139,-0.610229,
        -0.150113,0.819139,-0.610229,
        -0.01471,1.093767,-0.610229,
        0.240344,0.819139,-0.610229,
        0.108823,1.093767,-0.610229,
        0.108823,1.093767,-0.076624,
        0.240344,0.819139,-0.610229,
        0.108823,1.093767,-0.076624,
        -0.01471,1.093767,-0.076624,
        0.240344,0.819139,0.045569,
        -0.150113,0.819139,0.045569,
        -0.150113,0.819139,-0.610229,
        0.240344,0.819139,0.045569,
        0.108823,1.093767,-0.076624,
        0.108823,1.093767,-0.610229,
        -0.01471,1.093767,-0.076624
    ]);
    
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    this.vbo.itemSize = 3;
    this.vbo.numItems = this.vertices.length / this.vbo.itemSize;
}

ELCTurret.prototype.setColors = function(gl) 
{
    this.cbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.cbo);
    this.colors = new Uint8Array(helpers.randomColors(this.vertices.length));
    
    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    this.cbo.itemSize = 3;
    this.cbo.numItems = this.colors.length / this.cbo.itemSize;
}
