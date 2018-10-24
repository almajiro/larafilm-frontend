<template>
  <div class="wrapper">
    <div class="page-head">{{ head }}</div>
    <div class="slider">
      <div class="slider-mask">
        <slider-item v-for="(tv,key) in sliderItems" v-bind:key="key" v-bind:tv="tv"></slider-item>
      </div>
      <div class="arrow left-arrow" v-on:click="leftArrowClicked()">
        <i class="fa fa-arrow-left"></i>
      </div>
      <div class="arrow right-arrow" v-on:click="rightArrowClicked">
        <i class="fa fa-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import SliderItem from '~/components/slider-item'

  export default {
    components: {
      SliderItem
    },
    name: 'Slider',
    props: ['tvs', 'head'],
    directives: {

    },
    data () {
      return {
        moving: false,
        mv: 0,
        startId: 0,
        showItems: 1,
        totalItems: 0,
        sliderItems: []
      }
    },
    methods: {
      leftArrowClicked: function () {
        console.log('left arrow clicked')
        const { showItems, startId, totalItems, mv } = this
        let reducePrev = startId + showItems
        let resetStartId = 0
        if (reducePrev < 0) {
          resetStartId = totalItems - reducePrev
        } else {
          resetStartId = reducePrev
        }
        this.updateSliderItems()
      },
      rightArrowClicked: function () {
        console.log('right arrow clicked')
        const { showItems, startId, totalItems, mv } = this
        let plusNext = startId + showItems
        let resetStartId = 0
        if (plusNext >= totalItems) {
          resetStartId = plusNext - totalItems
        } else {
          resetStartId = plusNext
        }
        this.updateSliderItems()
      },
      updateSliderItems(baseShowItem = this.showItems) {
        let { totalItems, startId } = this;

        let centerDataId = []
        for (let i = 0; i < baseShowItem; i++) {
          let x = startId + i

          if (x < totalItems) {
            centerDataId.push(x)
          } else {
            centerDataId.push(x-totalItems)
          }
        }

        let leftDataId = []
        for (let i = 0; i < baseShowItem+1; i++) {
          let x = startId -i -1
          if (x >= 0) {
            leftDataId.push(x)
          } else {
            leftDataId.push(totalItems+x)
          }
        }
        leftDataId.reverse()

        let rightDataId = []
        for (let i = 0; i< baseShowItem+1; i++) {
          let x = startId + baseShowItem + i
          if (x < totalItems) {
            rightDataId.push(x)
          } else {
            rightDataId.push(x-totalItems)
          }
        }


        console.log('left', leftDataId)
        console.log('center', centerDataId)
        console.log('right', rightDataId)


        let selectIds = [...leftDataId, ...centerDataId, ...rightDataId]
        let sliderItems = []

        if (this.tvs.length) {
          selectIds.map((e) => {
            sliderItems.push(this.tvs[e])
          })
        }

        this.sliderItems = sliderItems

        //console.log(sliderItem)
      },
      updateSliderState() {
        let windowWidth = window.innerWidth;
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
      }
    },
    mounted() {
      this.updateSliderState()
      window.addEventListener('resize', this.updateSliderState)
      this.totalItems = this.tvs.length
      this.sliderItems = this.tvs
    },
    destroyed() {

    },
    created() {
      //this.setContentContainer();
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.updateSliderState)
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    overflow-x: hidden;
  }

  .page-head {
    color: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    margin-left: 60px;
  }

  .slider {
    max-width: 100vw;
    padding: 10px 0;
    z-index: 1;
    position: relative;
  }

  .slider-mask {
    white-space: nowrap;
    padding: 0 60px;
  }

  .arrow {
    position: absolute;
    top: 10px;
    width: 55px;
    z-index: 10;
    height: calc(99% - 17px);
    color: #fff;
    font-size: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left-arrow{
    background: linear-gradient(to left, rgba(35, 35, 35, 0.5), rgba(35, 35, 35, 1));
    left: 0;
  }

  .right-arrow{
    background: linear-gradient(to right, rgba(35, 35, 35, 0.5), rgba(35, 35, 35, 1));
    right: 0;
  }
</style>
