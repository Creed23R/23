new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "23",
          artist: "Morat",
          cover: "img/23-portada.jpeg",
          source: "mp3/23.mp4",
          url: "https://www.youtube.com/watch?v=P2INIp4Ic1Q",
          favorited: false
        }
      ],
      covers: [
        "img/1.jpeg",
        "img/2.jpeg",
        "img/4.jpeg",
        "img/5.jpeg",
        "img/6.jpeg",
        "img/7.jpeg",
        "img/8.jpeg",
        "img/9.jpeg",
        "img/10.jpeg",
        "img/11.jpeg",
        "img/12.jpeg",
        "img/13.jpeg",
        "img/14.jpeg",
        "img/15.jpeg",
        "img/16.jpeg",
        "img/17.jpeg",
        "img/18.jpeg",
        "img/19.jpeg",
        "img/20.jpeg",
        "img/21.jpeg",
        "img/22.jpeg",
        "img/23.jpeg",
        "img/24.jpeg",
        "img/25.jpeg",
        "img/26.jpeg",
        "img/27.jpeg",
        "img/28.jpeg",
        "img/29.jpeg",
        "img/30.jpeg",
        "img/31.jpeg",
        "img/32.jpeg",
        "img/33.jpeg",
        "img/34.jpeg",
        "img/35.jpeg",
        "img/37.jpeg",
        "img/38.jpeg",
        "img/39.jpeg",
        "img/40.jpeg",
        "img/41.jpeg",
        "img/42.jpeg",
        "img/43.jpeg",
        "img/44.jpeg",
        "img/45.jpeg",
        "img/46.jpeg",
        "img/47.jpeg",
        "img/48.jpeg",
        "img/49.jpeg",
        "img/50.jpeg",
        "img/51.jpeg",
        "img/52.jpeg",
        "img/53.jpeg",
        "img/54.jpeg",
        "img/55.jpeg",
        "img/56.jpeg",
        "img/57.jpeg",
        "img/58.jpeg",
        "img/59.jpeg",
        "img/60.jpeg",
        "img/61.jpeg",
        "img/62.jpeg",
        "img/63.jpeg",
        "img/64.jpeg",
        "img/65.jpeg",
        "img/66.jpeg",
        "img/67.jpeg",
        "img/68.jpeg",
        "img/69.jpeg",
        "img/70.jpeg",
        "img/71.jpeg",
        "img/72.jpeg",
        "img/73.jpeg",
        "img/74.jpeg",
        "img/75.jpeg",
        "img/76.jpeg",
        "img/77.jpeg",

        // ... y así sucesivamente para todas las imágenes de portada que deseas mostrar ...
      ],
      currentCoverIndex: 0,
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    }; 0
  },
  methods: {
    changeCover() {
      if (this.currentCoverIndex < this.covers.length - 1) {
        this.currentCoverIndex++;
      } else {
        this.currentCoverIndex = 0;
      }
      this.currentTrack.cover = this.covers[this.currentCoverIndex];
    },
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },

    generateFoto(){
      setInterval(() => {
        this.changeCover();
      }, 10000);
    },
    generateTime() {
       // cambia la imagen de la portada cada 5 segundos
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;


    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.changeCover();
    this.audio.ontimeupdate = function () {
      vm.generateTime();
      vm.generateFoto();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
      vm.generateFoto();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
