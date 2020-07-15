"use strict";
class Song {
    constructor(songname) {
        this._songname = songname;
    }
    set name(v) {
        this._songname = v;
    }
    get name() {
        return this._songname;
    }
}
// const song = new Song("Fireflies");
// song.name = "Memories"
// console.log(song.name);
const song = new Audio();
song.src = require("../assets/Music/Ed\ Sheeran\ -\ Photograph.mp3");
song.play();
//# sourceMappingURL=SongController.js.map