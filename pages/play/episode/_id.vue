<template>
    <div class="player-bg">
      <video-player class="player"
                    ref="videoPlayer"
                    :options="playerOptions"
                    @ready="playerReadied">
      </video-player>
    </div>
</template>

<script>
  import axios from 'axios'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
   layout: 'player',
    data() {
      return {
        episode : null,
        tv: null,
        playerOptions: {},
        window: {
          width: 0,
          height: 0
        }
      }
    },
    async asyncData(context) {
      let response = await axios.get('http://larafilm.spectre.local/api/episodes/' + context.params.id)
      let episode = response.data

      response = await axios.get('http://larafilm.spectre.local/api/seasons/' + episode.season_id)
      let season = response.data

      response = await axios.get('http://larafilm.spectre.local/api/tvs/' + season.tv_id)
      let tv = response.data

      let videos = [];

      episode.videos.forEach(function (video) {
        videos.push({
          //type: "video/mp4",
          type: "application/x-mpegURL",
          src: video.asset.file
        })
      })

      let poster = ''
      let logo = ''

      tv.images.forEach(function (image) {
        if (image.type === 1) {
          poster = image.asset.file
        }
        if (image.type === 0) {
          logo = image.asset.file
        }
      })

      let playerOptions = {
        muted: false,
        autoplay: true,
        language: 'en',
        sources: [],
        plugins: {
          larafilm: {
            title: episode.title,
            poster: poster,
            logo: logo,
            series: tv.name,
            //back: $nuxt.$router.go(-1)
            back: '/episodes/' + tv.id
          }
        },
        controls: true,
        controlBar: {
          timeDivider: true,
          durationDisplay: true
        },
      }

      playerOptions.sources.push(videos)

      return {episode: episode, playerOptions: playerOptions, tv: tv}
    },
    mounted() {
      console.log('this is current player instance object', this.player)

      window.addEventListener('resize', this.handleResize)
      this.handleResize();
      //this.player.hlsQualitySelector();
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      playerReadied(player) {
        console.log('the player is readied', player)
        //console.log(this.player())
        player.larafilm()
      },
      findThumbnail(images) {
        var thumbnailUrl = ''

        images.forEach(function (image) {
          if (image.type === 12) {
            thumbnailUrl = image.asset.file
          }
        })
        return thumbnailUrl
      },
      findPoster(images) {
        var poster = ''

        images.forEach(function (image) {
          if (image.type === 1) {
            poster = image.asset.file
          }
        })

        return poster
      },
      findLogo(images) {
        var logoUrl = ''

        images.forEach(function (image) {
          if (image.type === 0) {
            logoUrl = image.asset.file
          }
        })
        return logoUrl
      },
      handleResize(player) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;

        this.player.width(this.window.width)
        this.player.height(this.window.height)
      }
    }
  }
</script>

<style scoped>
  .player-bg {
    overflow: hidden;
  }

  .video-player {
    box-shadow: 1px 2px 500px rgba(255, 0, 0, 0.50);
  }

  .player-bg >>> .vjs-big-play-button {
    display: none;
  }

  .player-bg >>> .vjs-control-bar {
    width: 90%;
    margin: auto;
    margin-bottom: 30px;
    border-radius: 10px;
    color: red !important;
    font-size: 20px;
    z-index: 2;
    background-color: rgba(38, 38, 38, 0.9);
  }

  .player-bg >>> .vjs-larafilm {
    position: absolute;
    top: 0;
    font-size: 40px;

    padding-top: 75px;
    padding-left: 40px;
    background: linear-gradient(rgba(0,0,0,100%), rgba(0,0,0, 0%));
    width: 100%;
    height: 100%;
    padding-top: 20px;


    overflow: hidden;

    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
    opacity: 0;
  }

  .player-bg >>> .vjs-back {
    float: left;
    padding-right: 15px;
  }

  .player-bg >>> .vjs-larafilm .poster {
    width: 20%;
    height: auto;
    position: absolute;
    top: 30px;
    right: 40px;
    box-shadow: 1px 2px 100px rgba(255, 0, 0, .50);
  }

  .player-bg >>> .vjs-larafilm .logo {
    width: 20%;
    height: auto;
  }

  .player-bg >>> .video-js.auto-height {
    height: 0 !important;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    max-width: 100%;
    width: auto !important;
  }

  .player-bg >>> .vjs-progress-control {
    position: absolute;
    bottom: 55px;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .player-bg >>> .vjs-progress-holder {
    height: 15px;
    background-color: rgba(38, 38, 38, 0.9);
    border-radius: 10px;
  }

  .player-bg >>> .vjs-play-progress {
    border-radius: 10px;
  }

  .player-bg >>> .vjs-play-progress:before {
    font-size: 30px;
    position: absolute;
    right: -0.5em;
    top: -8px;
    z-index: 1;
  }

  .player-bg >>> .video-js .vjs-play-progress {
    background-color: red;
  }

  .player-bg >>> .vjs-back {
    color: white;
  }

  .player-bg >>> .vjs-info {
    width: calc(100% - 24%);
  }

</style>
