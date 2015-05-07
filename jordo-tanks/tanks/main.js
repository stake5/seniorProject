var currentMapIndex = 0;
var map_data_stuff = [
    // "7 7 2 2 2 2 2 2 2 2 1 1 1 1 0 2 2 1 1 4 1 0 2 2 1 1 1 1 1 2 2 1 1 1 4 1 2 2 5 1 1 1 1 2 2 2 2 2 2 2 2 ",
    "5 5 2 2 2 2 2 2 1 1 0 2 2 1 1 0 2 2 5 1 0 2 2 2 2 2 2 ",
    "5 5 2 2 2 2 2 2 1 1 0 2 2 1 2 0 2 2 5 2 0 2 2 2 2 2 2 ",
    "6 6 2 2 2 2 2 2 2 4 1 1 0 2 2 1 1 1 0 2 2 1 1 1 0 2 2 5 1 1 1 2 2 2 2 2 2 2 ",
    "6 6 2 2 2 2 2 2 2 1 1 1 0 2 2 1 1 1 0 2 2 1 4 1 0 2 2 5 1 1 1 2 2 2 2 2 2 2 ",
    "7 7 2 2 2 2 2 2 2 2 1 1 1 1 0 2 2 1 1 4 1 0 2 2 1 1 1 1 1 2 2 1 1 1 4 1 2 2 5 1 1 1 1 2 2 2 2 2 2 2 2 "
];

function main() {
    // Initialize the game object
    var canvas  = document.getElementById("gameCanvas");
    var gl = canvas.getContext("experimental-webgl");
    if (!gl) {
        alert("Your browser does not support WebGL :(");
        return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var game = new Game(canvas, gl, map_data_stuff[currentMapIndex]);

    var messageDiv = document.getElementById("notificationsDiv");
    var retryButton = document.getElementById("retryButton");
    retryButton.onclick = function(e) {
        messageDiv.style.display = "none";
        game = new Game(canvas, gl, map_data_stuff[currentMapIndex]);
    };
    var nextButton = document.getElementById("nextButton");
    nextButton.onclick = function(e) {
        messageDiv.style.display = "none";
        currentMapIndex++;
        if (currentMapIndex >= map_data_stuff.length)
            currentMapIndex = 0;
        game = new Game(canvas, gl, map_data_stuff[currentMapIndex]);
    };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game.reshape(canvas.width, canvas.height);
    }
    window.addEventListener('resize', resizeCanvas, false);

    // Event handlers
    document.onkeydown = function(e) { game.keyDown(e.keyCode); };
    document.onkeyup   = function(e) { game.keyUp(e.keyCode); };
    canvas.onmousemove = function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = canvas.height - (e.clientY - rect.top);
        game.mouseMoved(x, y);
    };
    canvas.onmousedown  = function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = canvas.height - (e.clientY - rect.top);
        game.mouseDown(x, y);
    };
    canvas.ontouchstart = function(e) {
        e.preventDefault();
        if (e.touches.length > 0) {
            var rect = canvas.getBoundingClientRect();
            var x = e.touches[0].clientX - rect.left;
            var y = canvas.height - (e.touches[0].clientY - rect.top);
            game.mouseDown(x, y);
        }
    };

    // var lastSecondTime = Date.now();
    // var frames = 0;
    // var fpsLabel = document.getElementById("fpsLabel");

    // var loops = 0;
    // var skipTicks = 1000 / 60.0;
    // var maxFrameSkip = 10;
    // var nextGameTick = (new Date).getTime();
    // var lastGameTick;

    // // Main loop
    // var gameloop = function() {
    //     loops = 0;
    //     while ((new Date).getTime() > nextGameTick) {
    //         game.update();
    //         nextGameTick += skipTicks;
    //         loops++;
    //     }
    //     if (!loops) {
    //         game.draw((nextGameTick - (new Date).getTime()) / skipTicks);
    //     }
    //     else {
    //         game.draw(0);
    //         frames++;
    //         var elapsed = Date.now() - lastSecondTime;
    //         if (elapsed >= 1000) {
    //             fpsLabel.innerHTML = "FPS: " + frames;
    //             frames = 0;
    //             if (elapsed >= 2000) lastSecondTime = Date.now();
    //             else lastSecondTime += 1000;
    //         }
    //     }
    // };
    // var animFrame = (window.requestAnimationFrame    || window.webkitRequestAnimationFrame ||
    //                  window.mozRequestAnimationFrame || window.oRequestAnimationFrame      ||
    //                  window.msRequestAnimationFrame  || null);
    // if (animFrame !== null) {
    //     var recursiveAnim = function() {
    //         gameloop();
    //         animFrame(recursiveAnim, canvas);
    //     };
    //     animFrame(recursiveAnim, canvas);
    // }
    // else setInterval(gameloop, 1000.0 / 60.0);

    // Main loop
    var lastSecondTime = Date.now();
    var frames = 0;
    var fpsLabel = document.getElementById("fpsLabel");
    fpsLabel.innerHTML = "FPS: --";
    var gameloop = function() {
        game.update();
        game.draw();
        frames++;

        var now = Date.now();
        var elapsed = now - lastSecondTime;
        if (elapsed >= 1000) {
            fpsLabel.innerHTML = "FPS: " + frames;
            frames = 0;
            var numThousands = Math.floor(elapsed / 1000);
            lastSecondTime += (numThousands * 1000);
        }
    };
    var animFrame = (window.requestAnimationFrame    || window.webkitRequestAnimationFrame ||
                     window.mozRequestAnimationFrame || window.oRequestAnimationFrame      ||
                     window.msRequestAnimationFrame  || null);
    if (animFrame !== null) {
        var recursiveAnim = function() {
            gameloop();
            animFrame(recursiveAnim, canvas);
        };
        animFrame(recursiveAnim, canvas);
    }
    else setInterval(gameloop, 1000.0 / 60.0);
}
