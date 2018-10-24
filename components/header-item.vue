<template>
  <div class="header-item">
    <div class="bg"
         v-bind:style="{background: '-webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.8) 45%, rgba(255, 255, 255, 0)), url('+findBackground(tv.images)+')  no-repeat center center',
                'background-size': 'cover'}">
    </div>
    <!--
    <video-player :options="playerOptions"
                  v-bind:class="{isPlay: show}"
                  ref="videoPlayer"
                  @ended="headerPlayerEnded($event)">
    </video-player>
    -->
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

    </div>
  </div>
</template>

<script>

  import Slider from '~/components/slider'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

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
            fluid: true,
            sources: [{
              type: "application/x-mpegURL",
              src: "http://backend.mbp.local/storage/videos/334c318a-633d-4408-8a51-c6cdfcdc3659.m3u8"
            }],
          },
          cardSwiper: {
            slidesPerView: 5,
            spaceBetween: 3,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
          },
          isPlay: false
        }
      },
    /*
      mounted() {
        console.log('this is current player instance object', this.player)
        this.player.play()
        this.isPlay = true
      },
      computed: {
        player() {
          return this.$refs.videoPlayer.player
        }
      },
      methods: {
        headerPlayerEnded(player) {
          this.isPlay = false
        }
      }
      */
    }
</script>

<style scoped>
  .header-item .row-title {
    padding-left: 35px;
    padding-bottom: 15px;
  }
  .header-item .slider {
    position: relative;
    bottom: 29%;

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
</style>
