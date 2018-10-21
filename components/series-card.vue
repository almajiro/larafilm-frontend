<template>
  <a :href="'/tv/' + tv.id">
    <div class="series-card">
      <img :src="findBackground(tv.images)">
      <div class="series-card-info">
        <p class="title">{{ tv.name }}</p>
      </div>
    </div>
  </a>
</template>

<script>
    export default {
      props: ['tv'],
      name: "SeriesCard",
      methods: {
        genreToString (genres) {
          var thisGenre = []

          genres.forEach(function (genre) {
            thisGenre.push(genre.name);
          })

          return thisGenre.join(', ')
        },
        findPoster (images) {
          var poster = ''

          images.forEach(function (image) {
            if (image.type === 1) {
              poster = image.asset.file
            }
          })

          return poster
        },
        findBackground(images) {
          var backgroundUrl = ''

          images.forEach(function (image) {
            if (image.type === 8) {
              backgroundUrl = image.asset.file
            }
          })
          return backgroundUrl
        },
      }
    }
</script>

<style scoped>
  .series-card:hover .series-card-info {
    opacity: 1;
    transition:
      line-height .3s ease-out,
      opacity     .1s linear,
      visibility  .1s linear;
  }

  .series-card-info {
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% + 1px);
    background: -webkit-linear-gradient(90deg, rgba(0, 0, 0, 0.8) 1%, rgba(255, 255, 255, 0));

    opacity: 0;
    transition:
      line-height .3s ease-out,
      opacity     .1s linear,
      visibility  .1s linear;
  }

  .series-card-info .title {
    color: white;

    position: absolute;
    bottom: 0;

    margin: 0;
    padding: 10px;
  }

  .series-card img {
    width: 100%;
    height: 100%;
  }
</style>
