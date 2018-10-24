<template>
  <div v-if="tv">
    <div class="header-item header-series">
      <div class="bg"
           v-bind:style="{background: '-webkit-linear-gradient(90deg, rgba(0, 0, 0, 0.8) 45%, rgba(255, 255, 255, 0)), url('+background(tv.images)+') no-repeat center center',
                'background-size': 'cover'}">
      </div>
      <div class="info">
        <div class="logo" v-if="findLogo(tv.images) !== ''">
          <img v-bind:src="findLogo(tv.images)">
        </div>
        <div class="text-logo" v-else>
          {{ tv.name }}
        </div>
        <p>{{ tv.plot }}</p>
        <p class="mpaa-radius">{{ tv.mpaa }}</p><p class="year-radius">{{ tv.year }}</p><p class="status-radius">{{ tv.status }}</p>
        <p>{{ prettyGenre(tv.genres) }}</p>
      </div>
    </div>
    <b-container fluid>
      <seasons :tv="tv"></seasons>
      <!--
        <b-row>
          <b-col class="actor-col">
            <h1 class="row-title">Actors</h1>
            <swiper :options="episodeSwiper" class="episodes">
              <swiper-slide v-for="(actor, key) in tv.actors" v-bind:key="key">
                <div class="actor-box">
                <div class="actor">
                  <img :src="findProfile(actor.person.images)">
                  <div class="info">
                    <p>{{ actor.person.name }} as {{ actor.role }}</p>
                  </div>
                </div>
                </div>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </b-col>
        </b-row>
        -->
        <b-row>
          <b-col>
            <h1 class="row-title">If you like this, this is recommended for you</h1>
            <swiper :options="cardSwiper" class="tvshows">
              <!-- slides -->
              <swiper-slide v-for="tv in tvs" v-bind:key="tv.id">
                <series-card :tv="tv"></series-card>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide,
    },
    data() {
      return {
        tv: null,
        seasonEpisodes: [],
        cardSwiper: {
          slidesPerView: 4,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
        }
      }
    },
    mounted: function () {
      this.getTv()
    },
    async asyncData(context) {
      let response = await axios.get('/tvs/' + context.params.id)
      let tv = response.data

      response = await axios.get('/tvs/')
      let tvs = response.data

      let seasons = []

      for (let season of tv.seasons) {
        let episodes = await axios.get('/seasons/' + season.id + '/episodes')
        seasons.push(episodes.data)
      }

      return {tv: tv, seasonEpisodes: seasons, tvs: tvs}
    },
    methods: {
      selectClass(key) {
        if (key % 2) {
          return 'big-episode-info info-left'
        } else {
          return 'big-episode-info info-right'
        }
      },
      selectThumbnailClass(key) {
        if (key % 2) {
          return 'big-episode episode-left'
        } else {
          return 'big-episode episode-right'
        }
      },
      selectContentClass(key) {
        if (key % 2) {
          return 'left-content'
        } else {
          return 'right-content'
        }
      },
      async getTv() {
        let response = await axios.get('/tvs/' + this.$route.params.id)
        this.tv = response.data

        for (let season of this.tv.seasons) {
          let episodes = await axios.get('/seasons/' + season.id + '/episodes')
          this.seasonEpisodes.push(episodes.data)
        }
      },
      background(images) {
        var backgroundUrl = ''

        images.forEach(function (image) {
          if (image.type === 8) {
            backgroundUrl = image.asset.file
          }
        })

        return backgroundUrl
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
      findThumbnail(images) {
        var thumbnailUrl = ''

        images.forEach(function (image) {
          if (image.type === 12) {
            thumbnailUrl = image.asset.file
          }
        })
        return thumbnailUrl
      },
      findGif(images) {
        var gifUrl = ''

        images.forEach(function (image) {
          if (image.type === 13) {
            gifUrl = image.asset.file
          }
        })
        return gifUrl
      },
      findPoster(images) {
        var posterUrl = ''

        images.forEach(function (image) {
          if (image.type === 1) {
            posterUrl = image.asset.file
          }
        })
        return posterUrl
      },
      findProfile(images) {
        var profileUrl = ''

        images.forEach(function (image) {
          if (image.type === 11) {
            profileUrl = image.asset.file
          }
        })
        return profileUrl
      },
      prettyPlot: function (plot) {
        var thisPlot = ''

        if (plot.length > 250) {
          thisPlot = plot.slice(0, 250) + '...'
        } else {
          thisPlot = plot
        }

        return thisPlot
      },
      prettyGenre: function (genres) {
        var thisGenre = ''

        genres.forEach(function (genre) {
          thisGenre += ' \ ' + genre.name
        })

        return thisGenre
      }
    }
  }
</script>

<style scoped>
  .actor-col {
    padding: 0px;
  }

  .actor-col .row-title {
    padding-left: 15px;
  }

  .big-episode-col {
    padding: 0px;
    overflow: hidden;
  }

  .big-episode {
    width: 50%;
    height: 350px;
    float: left;
  }

  .episode-left {
    float: left;
  }

  .episode-right {
    float: right;
  }

  .big-episode-info:before {
    content: "";
    display: block;
    position: absolute;
    background: inherit;
    filter: blur(5px);
    top: -5px;
    right: -5px;
    bottom: -5px;
    left: -5px;
    z-index: -1;
  }

  .big-episode:hover .play {
    display: block;
  }

  .big-episode-info {
    width: 55%;
    height: 450px;
    background: yellow;
    position: absolute;
    color: white;
  }

  .info-left {
    -webkit-transform-origin: left center;
    -ms-transform-origin: left center;
    transform-origin: left center;
    -webkit-transform: rotate(5deg);
    -ms-transform: rotate(5deg);
    transform: rotate(5deg);

    top: -70px;
    right: -15px;

    padding: 80px;
  }

  .info-right {
    -webkit-transform-origin: right center;
    -ms-transform-origin: right center;
    transform-origin: right center;
    -webkit-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    transform: rotate(-5deg);

    top: -70px;
    left: -15px;

    padding: 80px;
  }

  .play {
    position: absolute;
    top: 30%;
    left: 20%;
    font-size: 100px;
    display: none;
  }

  .plot {
    height: 100px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 20px;
  }

  .number {
    font-size: 25px;
  }

  .info {
    font-size: 18px;
  }

  .rating p{
    margin: 0;
  }

  .left-content{
    -webkit-transform-origin: left center;
    transform-origin: left center;
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }

  .right-content{
    -webkit-transform-origin: left center;
    transform-origin: left center;
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);

    top: -60px;
    position: relative;
  }

  .plot::-webkit-scrollbar {
    width: 6px;
  }
  /*スクロールバーの背景色・角丸指定*/
  .plot::-webkit-scrollbar-track {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0);
  }
  /*スクロールバーの色・角丸指定*/
  .plot::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background:#09C9D9;
  }

  .swiper-wrapper {
    overflow: hidden;
  }

  .episode-gif {
    width: 100%;
    height: 100%;
  }

  .episode-gif-wrapper {
    position:absolute;
    top: 0;

    width: 50%;
  }

  .episode-thumbnail .episode-gif-wrapper {
    opacity: 0;
    transition:
      line-height .3s ease-out,
      opacity     .2s linear,
      visibility  .1s linear;
  }

  .episode-thumbnail:hover .episode-gif-wrapper {
    opacity: 1;
    transition:
      line-height .3s ease-out,
      opacity     .2s linear,
      visibility  .1s linear;
  }
</style>
