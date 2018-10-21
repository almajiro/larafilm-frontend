<template>
  <div>
    <swiper :options="swiperOption" class="header-slider">
      <swiper-slide v-for="tv in tvs" v-bind:key="tv.id">
        <header-item :tv="tv"></header-item>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <b-container fluid>
      <b-row>
        <b-col>
          <div>
            <h1 class="row-title">Latest TV</h1>
            <swiper :options="cardSwiper" class="tvshows">
              <!-- slides -->
              <swiper-slide v-for="tv in tvs" v-bind:key="tv.id">
                <series-card :tv="tv"></series-card>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            <h1 class="row-title">Latest Movies</h1>
            <swiper :options="cardSwiper" class="tvshows">
              <!-- slides -->
              <swiper-slide v-for="tv in tvs" v-bind:key="tv.id">
                <series-card :tv="tv"></series-card>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            <h1 class="row-title">Latest Records</h1>
            <swiper :options="cardSwiper" class="tvshows">
              <!-- slides -->
              <swiper-slide v-for="tv in tvs" v-bind:key="tv.id">
                <series-card :tv="tv"></series-card>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            <h1 class="row-title">Latest Musics</h1>
            <swiper :options="cardSwiper" class="tvshows">
              <!-- slides -->
              <swiper-slide v-for="tv in tvs" v-bind:key="tv.id">
                <series-card :tv="tv"></series-card>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            <h1 class="row-title">Latest Pictures</h1>
            <swiper :options="cardSwiper" class="tvshows">
              <!-- slides -->
              <swiper-slide v-for="tv in tvs" v-bind:key="tv.id">
                <series-card :tv="tv"></series-card>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import AppHeader from '~/components/header'
  import SeriesCard from '~/components/series-card'
  import HeaderItem from '~/components/header-item'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {videoPlayer} from 'vue-video-player'

  export default {
    components: {
      AppHeader,
      SeriesCard,
      HeaderItem,
      swiper,
      swiperSlide,
      videoPlayer
    },
    data() {
      return {
        tvs: [],
        networks: [],
        swiperOption: {
          slidesPerView: 1,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          keyboard: {
            enabled: true
          },
          fadeEffect: {
            crossFade: true
          },
          autoplay: {
            delay: 5000
          }
        },
        cardSwiper: {
          slidesPerView: 4,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1400: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            }
          }
        }
      }
    },
    created: function () {
      this.fetchAllTvs()
    },
    methods: {
      fetchAllTvs() {
        axios.get('http://larafilm.spectre.local/api/tvs')
          .then(response => {
            this.tvs = response.data
          })
      }
    }
  }
</script>

<style scoped>
</style>

