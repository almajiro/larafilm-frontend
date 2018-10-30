<template>
  <div class="slider-item" ref="item" @mouseover="onEnter" @mouseleave="onLeave()">
    <div class="slider-item-inner">
      <img :src="findBackground(tv.images)" class="cover">
      <div class="zoom" ref="zoom">
        <div class="fake" ref="fake">
          <img :src="findBackground(tv.images)" class="cover">
        </div>
        <div class="player" ref="player">
          <video-player :options="playerOptions"
                      ref="videoPlayer"
                      @ended="headerPlayerEnded($event)">
          </video-player>
        </div>
        <div class="video-info" ref="info">
          <span class="title">{{ tv.name }}</span>
          <span class="plot">{{ prettyString(tv.plot, 130) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"

  export default {
    name: "slider-item",
    props: ['tv'],
    mounted () {
    },
    data() {
      return {
        timer: null,
        playerOptions: {
            controls: false,
            muted: false,
            fluid: true,
            preload: 'none',
            autoplay: false,
            sources: [{
              type: "application/x-mpegURL",
              //src: "http://backend.mbp.local/storage/videos/ccf07f48-bf3c-4397-ac7b-4a67474a49e7.m3u8"
              //src: "http://backend.mbp.local/storage/videos/ed751935-e3cc-473d-9dc9-ea7a071e14a8.m3u8"
              //src: "http://backend.mbp.local/storage/videos/ad8c3f26-7587-49ec-a918-065d45cb7b99.m3u8"
              //src: "http://backend.mbp.local/storage/videos/3957290a-3ab2-42db-9bec-a63fde7edadf.m3u8"
              //src: "http://backend.mbp.local/storage/videos/70be89f6-93ca-4ad1-83c5-ce2246b9ba4f_1000.m3u8"
              src: "http://backend.mbp.local/storage/videos/79cd217e-0ef5-4b49-bf61-528fbbdab8d3.m3u8"
            }]
        }
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      onEnter: function () {
        this.$emit('mouseover')

        let item = this.$refs.item
        let zoom = this.$refs.zoom
        let fake = this.$refs.fake
        let info = this.$refs.info
        let player = this.$refs.player
        let videoPlayer = this.player

        let xright = $(window).width() - ($(item).offset().left + $(item).outerWidth()) < 70
        let xleft = $(item).offset().left < 70

        let dir

        if (xright) {
          dir = "-25%"
        } else if (xleft) {
          dir = "25%"
        } else {
          dir = "0"
        }

        this.timer = setTimeout(function () {
          videoPlayer.play()

          $(player).css({
            'opacity': '1'
          })

          $(info).css({
            'opacity': '1'
          })

          $(zoom).css({
            'transform': 'translate3d('+dir+', 0, 0) scale(1)',
            'z-index': '5',
            'transition': 'all .4s ease'
          })
        }, 400)

        setTimeout(function () {
          $(info).css({
            'opacity': '0'
          })
        }, 5000)
      },
      onLeave: function () {
        clearTimeout(this.timer)
        this.$emit('mouseleave');

        let videoPlayer = this.player
        videoPlayer.pause()

        let fake = this.$refs.fake
        let info = this.$refs.info
        let player = this.$refs.player

        $(player).css({
          'opacity': '0'
        })

         $(info).css({
          'opacity': '0'
        })

        $(fake).css({
          'opacity': '1'
        })

        this.$refs.zoom.style.transform = 'translate3d(0, 0, 0) scale(.5)'
        this.$refs.zoom.style.zIndex = '0'
      }
    }
  }
</script>

<style scoped>
  .slider-item {
    display: inline-block;
    width: 100%;
    position: relative;
    z-index: 1;

    @media all and (min-width: 680px) {
      width: calc(100%/2);
    }

    @media all and (min-width: 768px) {
      width: calc(100%/3);
    }

    @media all and (min-width: 980px) {
      width: calc(100%/4);
    }

    @media all and (min-width: 1260px) {
      width: calc(100%/5);
    }

    @media all and (min-width: 1800px) {
      width: calc(100%/6);
    }
  }

  .slider-item-inner {
    /*margin: 0 5px;*/
    margin: 0 1px;
    border-radius: 2px;
    position: relative;
  }

  .cover {
    width: 100%;
    height: auto;
  }

  .zoom {
    height: 200%;
    width: 200%;
    position: absolute;
    top: -50%;
    left: -50%;
    z-index: 2;
    transition: all .4s ease;
    transform: scale(.5);
  }

  .zoom-cover {
    width: 100%;
    height: auto;
  }

  .fake {
    transition: all 1s;
    visibility: inherit;
  }

  .player {
    min-width: 100%;
    min-height: 100%;

    opacity: 0;
    transition: all .5s;
    position: absolute;
    top: 0%;

    border-width: 1px;
    border-color: red;
  }

  .video-info {
    min-width: 100%;
    min-height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0%;
    overflow: hidden;
    opacity: 0;
    transition: all 1s;
  }

  .video-info .title {
    color: white;
    font-size: 4vh;
    font-weight: bold;
    margin: 10px;
    position: absolute;
    bottom: 15vh;
  }

  .video-info .plot {
    color: white;
    overflow-wrap: break-word;
    font-size: 4vh;
    word-wrap: break-word;
    white-space: normal;
    display: block;
    width: calc(100% - 10px);
    position: absolute;
    margin: 10px;
    bottom: 0;
  }

</style>
