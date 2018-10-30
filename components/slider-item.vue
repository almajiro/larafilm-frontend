<template>
  <div class="slider-item" ref="item" @mouseover="onEnter" @mouseleave="onLeave()">
    <div class="slider-item-inner">
      <img :src="findBackground(tv.images)" class="cover">
      <div class="zoom" ref="zoom">
        <img :src="findBackground(tv.images)" class="zoom-cover">
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
        timer: null
      }
    },
    methods: {
      onEnter: function () {
        this.$emit('mouseover')

        let item = this.$refs.item
        let zoom = this.$refs.zoom

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
          $(zoom).css({
            'transform': 'translate3d('+dir+', 0, 0) scale(1)',
            'z-index': '5',
            'transition': 'all .4s ease'
          })
        }, 400)
      },
      onLeave: function () {
        clearTimeout(this.timer)
        this.$emit('mouseleave');

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
</style>
