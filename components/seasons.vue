<template>
  <b-row>
    <b-col>
      <h1 class="row-title">Seasons</h1>
      <swiper :options="seasonSlider" class="episodes">
        <swiper-slide v-for="(season, key) in tv.seasons" v-bind:key="key">
          <a :href="'/tv/'+tv.id+'/episodes/'+season.season">
            <div class="season-card">
              <div class="season-card-bg">
                <img v-bind:src="findPoster(tv.images)">
              </div>
              <div class="season-card-info">
                <p>Season {{ season.season }}</p>
              </div>
            </div>
          </a>
        </swiper-slide>
      </swiper>
    </b-col>
  </b-row>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        seasonSlider: {
          slidesPerView: 4,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
        }
      }
    },
    props: ['tv'],
    name: "Seasons"
  }
</script>

<style scoped>
  .season-card-bg img {
    max-width: 100%;
  }

  .season-card-info {
    position: absolute;
    top: 0;
    height: calc(100% + 1px);
    width: 100%;
    background: -webkit-linear-gradient(90deg, rgba(0, 0, 0, 0.8) 1%, rgba(255, 255, 255, 0)) 0% 0%;
  }

  .season-card-info p {
    color: white;
    padding: 10px;

    position: absolute;
    bottom: 0;
    font-size: 40px;
    margin: 0;
  }
</style>
