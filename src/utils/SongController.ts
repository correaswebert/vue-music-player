class Song234 {
  private _songname!: string;

  constructor(songname: string) {
    this._songname = songname
  }

  set name(v: string) {
    this._songname = v;
  }

  get name(): string {
    return this._songname
  }

}

interface Song {
  title: string
  artist: string
  src: string
}

class SongController {
  private index = 0;
  isPlaying = false;
  current!: Song;
  player = new Audio();
  song!: Song;

  songs: Song[] = [
    {
      title: "Photograph",
      artist: "Ed Sheeran",
      src:
        "../assets/Music/Ed_Sheeran-Photograph.mp3",
    },
    {
      title: "Not Today",
      artist: "Imagine Dragons",
      src:
        "../assets/Music/Imagine_Dragons-Not_Today.mp3",
    },
    {
      title: "Khuda Jaane",
      artist: "N/A",
      src:
        "../assets/Music/Khuda_Jaane.mp3",
    },
  ];

  constructor(player: HTMLAudioElement, songs: Song) {
    this.player = player
    this.song = songs
  }

  play(song: Song) {
    if (typeof song.src != "undefined") {
      this.current = song;

      this.player.src = this.current.src;
    }

    this.player
      .play()
      .then(() => {
        // if song gets over, play next automatically
        this.player.addEventListener(
          "ended",
          this.next
        );
        this.isPlaying = true;
      })
      .catch((error) => console.error(error));
  }

  pause() {
    this.player.pause();
    this.isPlaying = false;
  }

  next() {
    this.index++;
    if (this.index > this.songs.length - 1) {
      this.index = 0;
    }

    this.current = this.songs[this.index];
    this.play(this.current);
  }

  prev() {
    this.index--;
    if (this.index < 0) {
      this.index = this.songs.length - 1;
    }

    this.current = this.songs[this.index];
    this.play(this.current);
  }

  // created: function () {
  //   this.current = this.songs[this.index];
  //   this.player.src = this.current.src;
  // },
}


// const song = new Song("Fireflies");
// song.name = "Memories"
// console.log(song.name);

const song = new Audio();
song.src = require("../assets/Music/Ed_Sheeran-Photograph.mp3")
song.play()