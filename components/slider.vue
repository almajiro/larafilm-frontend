<template>
  <div class="wrapper">
    <div class="page-head">{{ head }}</div>
    <div class="slider">
      <div v-bind:class="[{'moving': moving}, 'slider-mask']" ref="slider">
        <slider-item v-for="(tv,key) in sliderItems"
                     v-bind:key="key"
                     v-bind:tv="tv"
                     v-bind:ref="'item_'+key"
                     @mouseover="onEnter(key)"
                     @mouseleave="onLeave(key)">
        </slider-item>
      </div>
      <div class="arrow left-arrow" v-on:click="leftArrowClicked()">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="arrow right-arrow" v-on:click="rightArrowClicked">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import SliderItem from '~/components/slider-item'
  import $ from "jquery"
  import 'lodash'

  export default {
    components: {
      SliderItem
    },
    name: 'Slider',
    props: ['tvs', 'head'],
    data () {
      return {
        moving: false,
        click: false,
        mv: 0,
        startId: 0,
        showItems: 1,
        totalItems: 0,
        sliderItems: [],
        leftItem: [],
        centerItem: [],
        rightItem: [],
        timer: null
      }
    },
    methods: {
      leftArrowClicked: function () {
        console.log('left arrow clicked')

        this.startId = this.leftItem[1]
        this.moving = true

        $(this.$refs.slider).css({
          'transform': 'translate3d(-'+this.mv+'%, 0, 0)'
        })

        setTimeout(() => {
          $(this.$refs.slider).css({
            'transform': 'translate3d(-1'+this.mv+'%, 0, 0)'
          })
        }, 750)

        setTimeout(() => {
          this.moving = false;
          this.updateSliderItems()
        }, 750)
      },
      rightArrowClicked: function () {
        console.log('right arrow clicked')

        this.startId = this.rightItem[0] ? this.rightItem[0] : this.startId + this.showItems
        this.moving = true

        let click = this.click
        this.click = true

        if (!click) {
          $(this.$refs.slider).css({
            'transform': 'translate3d(-100%, 0, 0)'
          })
          setTimeout(() => {
            $(this.$refs.slider).css({
              'transform': 'translate3d(-1'+this.mv+'%, 0, 0)'
            })
            this.click = true
          }, 750)
        } else {
          $(this.$refs.slider).css({
            'transform': 'translate3d(-2'+this.mv+'%, 0, 0)'
          })
          setTimeout(() => {
            $(this.$refs.slider).css({
              'transform': 'translate3d(-1'+this.mv+'%, 0, 0)'
            })
          }, 750)
        }

        setTimeout(() => {
          this.moving = false
          $(this.$refs.slider).css({
              'transform': 'translate3d(-1'+this.mv+'%, 0, 0)'
            })
          this.updateSliderItems()
        }, 750)
      },
      onEnter: function (i) {
        const { showItems } = this.showItems
        let selectedItem = this.$refs['item_'+i][0].$el
        let rightItems = $(selectedItem).nextAll(':lt('+this.showItems+')')
        let leftItems = $(selectedItem).prevAll(':lt('+this.showItems+')')

        let xright = $(window).width() - ($(selectedItem).offset().left + $(selectedItem).outerWidth()) < 70
        let xleft = $(selectedItem).offset().left < 70

        this.timer = setTimeout(() => {
          $(selectedItem).css({
            'z-index': '10',
            'transform': 'translate3d(0, 0, 0)',
            'transition': 'all .4s cubic-bezier(0.5, 0, 0.1, 1)'
          })

          leftItems.css({
            'transform': 'translate3d(-50%, 0, 0)',
            'transition': 'all .4s cubic-bezier(0.5, 0, 0.1, 1)'
          })

          rightItems.css({
            'transform': 'translate3d(50%, 0, 0)',
            'transition': 'all .4s cubic-bezier(0.5, 0, 0.1, 1)'
          })

          if (xright) {
            leftItems.css({
              'transform': 'translate3d(-100%, 0, 0)',
              'transition': 'all .4s cubic-bezier(0.5, 0, 0.1, 1)'
            })
            rightItems.css({
              'transform': 'translate3d(0, 0, 0)',
              'transition': 'all .4s cubic-bezier(0.5, 0, 0.1, 1)'
            })
          }

          if (xleft) {
            leftItems.css({
              'transform': 'translate3d(0, 0, 0)',
              'transition': 'all .4s cubic-bezier(0.5, 0, 0.1, 1)'
            })
            rightItems.css({
              'transform': 'translate3d(100%, 0, 0)',
              'transition': 'all .4s cubic-bezier(0.5, 0, 0.1, 1)'
            })
          }
        }, 400)
      },
      onLeave: function (i) {
        clearTimeout(this.timer)
        for (let j = 0; j < this.sliderItems.length; j++) {
          this.$refs['item_'+j][0].$el.style.transform = 'translate3d(0, 0, 0)'
          this.$refs['item_'+j][0].$el.style.transition = 'all .4s cubic-bezier(0.5, 0, 0.1, 1)'
        }
      },
      updateSliderItems(baseShowItem = this.showItems) {
        let { totalItems, startId } = this

        // left + center + right
        // [1] + [4] + [4] + [1]
        // [5] + [4] + [5]

        let centerDataId = []
        let rightDataId = []
        let leftDataId = []
        let j = 0

        for (let i = 0; i < baseShowItem; i++) {
          let x = startId + i

          if (x < totalItems) {
            centerDataId.push(x)
          } else {
            centerDataId.push(j)
            j++
          }
        }

        j = 0
        for (let i = 0; i < baseShowItem+1; i++) {
          let x = centerDataId[centerDataId.length-1] + i + 1

          if (x < totalItems) {
            rightDataId.push(x)
          } else {
            rightDataId.push(j)
            j++
          }
        }

        j = 0
        for (let i = 0; i < baseShowItem+1; i++) {
          let x = centerDataId[0] -i -1

          if (x >= 0) {
            leftDataId.push(x)
          } else {
            leftDataId.push(totalItems -1 -j)
            j++
          }
        }
        leftDataId.reverse()

        /*
        console.log('left', leftDataId)
        console.log('center', centerDataId)
        console.log('right', rightDataId)
        */

        let selectIds = [...leftDataId, ...centerDataId, ...rightDataId]
        let sliderItems = []

        if (this.tvs.length) {
          selectIds.map((e) => {
            sliderItems.push(this.tvs[e])
          })
        }

        this.centerItem = centerDataId
        this.rightItem = rightDataId
        this.leftItem = leftDataId
        this.sliderItems = sliderItems
        console.log(sliderItems)
      },
      updateSliderState: function() {
        let windowWidth = window.innerWidth
        let showItems = 1

        if (windowWidth > 1800) {
          showItems = 6
        } else if (windowWidth > 1260) {
          showItems = 5
        } else if (windowWidth > 980) {
          showItems = 4
        } else if (windowWidth > 768) {
          showItems = 3
        } else if (windowWidth > 600) {
          showItems = 2
        }

        let mv = 100 / showItems

        this.showItems = showItems
        this.mv = mv

        if (this.click) {
          $(this.$refs.slider).css({
            'transform': 'translate3d(-1'+this.mv+'%, 0, 0)'
          })
        }
      }
    },
    mounted() {
      this.updateSliderState()
      window.addEventListener('resize', this.updateSliderState)

      this.sliderItems = this.tvs
      this.totalItems = this.tvs.length

      window.addEventListener('resize', this)
    },
    destroyed() {

    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.updateSliderState)
    }
  }
</script>

<style scoped>
  .wrapper {
    /*overflow-x: hidden;*/
    padding-top: 2vh;
    padding-bottom: 2vh;
  }

  .page-head {
    color: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    margin-left: 65px;
  }

  .slider-mask {
    white-space: nowrap;
    /*padding: 0 60px;*/
  }

  .arrow {
    position: absolute;
    top: 10px;
    /*width: 55px;*/
    width: 59px;
    z-index: 10;
    height: calc(100% - 19px);
    color: #fff;
    font-size: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all .25s ease;
  }

  .slider {
    max-width: 100vw;
    padding: 10px 60px;
    z-index: 1;
    position: relative;
  }

  .slider:hover .arrow{
    opacity: 1;
  }

  .left-arrow{
    background: linear-gradient(to left, rgba(35, 35, 35, 0.5), rgba(35, 35, 35, 1));
    left: 0;
  }

  .right-arrow{
    background: linear-gradient(to right, rgba(35, 35, 35, 0.5), rgba(35, 35, 35, 1));
    right: 0;
  }

  .moving {
    transition: all .75s ease;
  }
</style>
