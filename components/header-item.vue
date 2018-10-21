<template>
  <div class="header-item">
    <div class="bg"
         v-bind:style="{background: '-webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.8) 45%, rgba(255, 255, 255, 0)), url('+findBackground(tv.images)+')  no-repeat center center',
                'background-size': 'cover'}">
    </div>
    <div class="info">
      <div class="logo" v-if="findLogo(tv.images) !== ''">
        <img v-bind:src="findLogo(tv.images)">
      </div>
      <div class="text-logo" v-else>
        {{ tv.name }}
      </div>
      <div class="seasons">
        <p>Season {{ tv.seasons[tv.seasons.length - 1].season }}</p>
      </div>
      <p>{{ prettyString(tv.plot, 250) }}</p>
      <div>
        <p class="mpaa-radius">{{ tv.mpaa }}</p><p class="year-radius">{{ tv.year }}</p><p class="status-radius">{{ tv.status }}</p>
      </div>
      <button class="watch-trailer"><i class="fas fa-video"></i> Watch Trailer</button>
      <button class="add-to-list"><i class="fa fa-plus"></i> My List</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "HeaderItem",
      props: ['tv'],
    }
</script>

<style scoped>

</style>
