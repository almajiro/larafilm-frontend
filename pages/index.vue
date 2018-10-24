<template>
  <div>
    <header-item :tv="tvs[3]" :tvs="tvs"></header-item>
    <b-container fluid>
      <slider :tvs="tvs" head="Netflix Original"></slider>
    </b-container>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import AppHeader from '~/components/header'
  import HeaderItem from '~/components/header-item'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {videoPlayer} from 'vue-video-player'
  import Slider from '~/components/slider'

  export default {
    components: {
      AppHeader,
      HeaderItem,
      swiper,
      swiperSlide,
      videoPlayer,
      Slider
    },
    async asyncData(context) {
      let response = await axios.get('/tvs')
      return {tvs: response.data}
    },
    data() {
      return {
        tvs: []
      }
    }
  }
</script>

<style scoped>
  .container-fluid {
    padding-bottom: 400px;
    padding-right: 0;
    padding-left: 0;
  }
</style>

