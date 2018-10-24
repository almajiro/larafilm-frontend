<template>
<div>
    <b-container fluid>

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
        swiperOption: {
          slidesPerView: 1,
          loop: false
        },
      }
    },
    mounted: function () {
      this.getTv()
    },
    async asyncData(context) {
      let response = await axios.get('/tvs/' + context.params.id)
      let tv = response.data

      let seasons = []

      for (let season of tv.seasons) {
        let episodes = await axios.get('/seasons/' + season.id + '/episodes')
        seasons.push(episodes.data)
      }

      return {tv: tv, seasonEpisodes: seasons}
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
      findProfile(images) {
        var profileUrl = ''

        images.forEach(function (image) {
          if (image.type === 11) {
            profileUrl = image.asset.file
          }
        })
        return profileUrl
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
