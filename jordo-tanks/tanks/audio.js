
function AudioManager() {
    this.musicTrack = getTrack("music.mp3", true);
    this.musicTrack.volume = .5;

    this.currentGrab = 0;
    this.grabTracks = [];

    this.currentMunch = 0;
    this.munchTracks = [];

    this.audioOn = true;
}

function getTrack(fileName, loop) {
    var a = new Audio("assets/" + fileName);
    a.loop = loop;
    return a;
}

AudioManager.prototype.init = function() {
    for (var i = 0; i < 3; i++)
        this.grabTracks.push(getTrack("grab.wav", false));
    for (var i = 0; i < 3; i++)
        this.munchTracks.push(getTrack("munch.wav", false));
};

AudioManager.prototype.toggleAudio = function() {
    this.audioOn = !this.audioOn;
    if (this.audioOn)
        this.playMusic();
    else
    {
        this.stopMusic();
    }
};

AudioManager.prototype.playMusic = function() {
    if (!this.audioOn) return;
    this.musicTrack.play();
};
AudioManager.prototype.stopMusic = function() {
    this.musicTrack.pause();
    this.musicTrack.currentTime = 0;
    //this.musicTrack.stop();
};

AudioManager.prototype.playGrab = function() {
    if (!this.audioOn) return;
    this.grabTracks[this.currentGrab].play();
    this.currentGrab++;
    if (this.currentGrab >= this.grabTracks.length)
        this.currentGrab = 0;
};

AudioManager.prototype.playMunch = function() {
    if (!this.audioOn) return;
    this.munchTracks[this.currentMunch].play();
    this.currentMunch++;
    if (this.currentMunch >= this.munchTracks.length)
        this.currentMunch = 0;
};
