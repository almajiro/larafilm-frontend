<template>
  <div class="header-item">
    <div class="bg"
         v-bind:style="{background: '-webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.8) 45%, rgba(255, 255, 255, 0)), url('+findBackground(tv.images)+')  no-repeat center center',
                'background-size': 'cover'}">
    </div>
    <div class="video-wrapper" ref="videoWrapper">
      <video-player :options="playerOptions"
                    ref="videoPlayer"
                    @ended="headerPlayerEnded($event)">
      </video-player>
    </div>
    <div class="mute" v-on:click="toggleMute()">
      <i v-bind:class="['fa', mute ? 'fa-volume-off' : 'fa-volume-up']"></i>
    </div>
    <div class="bg-gradient"></div>
    <div class="info">
      <div class="logo" v-if="findLogo(tv.images) !== ''">
        <img v-bind:src="findLogo(tv.images)" class="logo">
      </div>
      <div class="text-logo" v-else>
        {{ tv.name }}
      </div>
      <button class="watch-trailer"><i class="fa fa-play"></i> Play</button>
      <button class="add-to-list"><i class="fa fa-plus"></i> My List</button>
      <div class="seasons">
        <p>Watch Season {{ tv.seasons[tv.seasons.length - 1].season }} Now</p>
      </div>
      <p class="plot">{{ prettyString(tv.plot, 250) }}</p>
    </div>
    <div class="slider">
      <slider :tvs="tvs" head="Recommended For You"></slider>
    </div>
  </div>
</template>

<script>

  import Slider from '~/components/slider'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import $ from "jquery"

  export default {
      name: "HeaderItem",
      props: ['tv', 'tvs'],
      components: {
        swiper,
        swiperSlide,
        Slider
      },
      data() {
        return {
          playerOptions: {
            controls: false,
            muted: true,
            fluid: true,
            preload: 'auto',
            sources: [{
              type: "application/x-mpegURL",
              //src: "http://backend.mbp.local/storage/videos/ccf07f48-bf3c-4397-ac7b-4a67474a49e7.m3u8"
              //src: "http://backend.mbp.local/storage/videos/ed751935-e3cc-473d-9dc9-ea7a071e14a8.m3u8"
              //src: "http://backend.mbp.local/storage/videos/ad8c3f26-7587-49ec-a918-065d45cb7b99.m3u8"
              //src: "http://backend.mbp.local/storage/videos/3957290a-3ab2-42db-9bec-a63fde7edadf.m3u8"
              //src: "http://backend.mbp.local/storage/videos/70be89f6-93ca-4ad1-83c5-ce2246b9ba4f_1000.m3u8"
              src: "http://backend.mbp.local/storage/videos/92a54392-c34f-47f1-8830-c0f82b2646f1.m3u8"
            }],
          },
          isPlay: false,
          mute: true
        }
      },
      mounted() {
        console.log(this.tvs)
        console.log('this is current player instance object', this.player)

        $(this.$refs.videoWrapper).css({
            'opacity': '0'
        })

        setTimeout(() => {
          console.log('set opacity')
          this.player.play()
          $(this.$refs.videoWrapper).css({
            'opacity': '1'
          })
        }, 4000)
      },
      computed: {
        player() {
          return this.$refs.videoPlayer.player
        }
      },
      methods: {
        headerPlayerEnded(player) {
          this.isPlay = false
          $(this.$refs.videoWrapper).css({
            'opacity': '0'
          })
        },
        toggleMute() {
          this.mute = !this.player.muted()
          this.player.muted(this.mute)
        }
      }
    }
</script>

<style scoped>
  .header-item .row-title {
    padding-left: 35px;
    padding-bottom: 15px;
  }
  .header-item .slider {
    position: relative;
    bottom: 30%;

    background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(20,20,20,0)),color-stop(15%,rgba(20,20,20,.15)),color-stop(29%,rgba(20,20,20,.35)),color-stop(44%,rgba(20,20,20,.58)),color-stop(68%,#141414),to(#141414));
    background-image: -webkit-linear-gradient(top,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);
    background-image: -moz-linear-gradient(top,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);
    background-image: -o-linear-gradient(top,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);
    background-image: linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
    background-position: 0 top;
    background-repeat: repeat-x;
    background-color: transparent;
    width: 100%;
    height: 30%;
    left: 0;
    right: 0;
  }

  .series-card img {
    padding: 0;
    margin: 0;
  }

  .header-item .swiper-contaienr {
    overflow: unset;
  }

  .show {
    visibility: visible;
    opacity: 1;
  }

  .jumboplot:hover {
    width: 30% !important;
  }

  .mute {
    position: absolute;
    top: 35vw;
    right: 5vw;
    margin: 0;
    padding: 0;
    width: 2.4vw;
    height: 2.4vw;
    border-width: .1vw;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: rgba(0,0,0,.5);
    border: .1em solid rgba(255,255,255,.5);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    padding: .1em 0em .0em .20em;
    margin: .25em;
    font-size: 1.4vw;
    color: #fff;
    z-index: 5;
  }

  .bg-gradient {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to left,rgba(20, 20, 20, 0) 0,rgba(20, 20, 20, .15) 0%,rgba(20, 20, 20, .35) 29%,rgba(20, 20, 20, .58) 100%,#141414 50%,#141414 100%);
    position: absolute;
    top: 0;
  }

  .video-wrapper {
    transition: all 1s;
  }
</style>
