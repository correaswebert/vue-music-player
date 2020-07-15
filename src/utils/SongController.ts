interface Song {
  title: string
  artist: string
  src: string
}
export default class SongController {
  index = 0;

  current!: Song;
  duration!: number;
  currentTime!: number;

  isPlaying = false;
  isLoaded = false; // is the song loaded into the player's src

  player = new Audio();

  songs: Song[] = [
    {
      title: "Photograph",
      artist: "Ed Sheeran",
      src: require("/home/swebert/Documents/WebProjects/side-projects/music-player/src/assets/Music/Ed_Sheeran-Photograph.mp3"),
    },
    {
      title: "Not Today",
      artist: "Imagine Dragons",
      src: require("/home/swebert/Documents/WebProjects/side-projects/music-player/src/assets/Music/Imagine_Dragons-Not_Today.mp3"),
    },
    {
      title: "Khuda Jaane",
      artist: "N/A",
      src: require("/home/swebert/Documents/WebProjects/side-projects/music-player/src/assets/Music/Khuda_Jaane.mp3"),
    },
  ];

  // loads the songs given by index into the Audio `player`
  load() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;

    this.duration = this.player.duration;
    this.currentTime = this.player.currentTime;

    this.isLoaded = true;
  }

  play() {
    if (!this.isLoaded) this.load();

    this.isPlaying = !this.isPlaying;

    this.player.play().catch((err) => console.log(err));

    this.player.addEventListener("ended", this.next);
  }

  pause() {
    this.isPlaying = !this.isPlaying;
    this.player.pause();
  }

  next() {
    this.index++;
    if (this.index > this.songs.length - 1) this.index = 0;
    this.isLoaded = false;
    this.play();
  }

  prev() {
    this.index--;
    if (this.index < 0) this.index = this.songs.length - 1;
    this.isLoaded = false;
    this.play();
  }

  created() {
    console.log("Index: " + this.index);

    this.load();
  }
}