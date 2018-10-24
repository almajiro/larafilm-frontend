<template>
  <div class="slider-item">
    <div class="slider-item-inner">
      <img :src="findBackground(tv.images)" class="cover">
    </div>
  </div>
</template>

<script>
  export default {
    name: "slider-item",
    props: ['tv']
  }
</script>

<style scoped>
  .slider-item {
    display: inline-block;
    width: 100%;
    position: relative;
    z-index: 1;

    @media all and (min-width: 680px) {
      width:

    calc(100%/2);
    }

    @media all and (min-width: 768px) {
      width:

    calc(100%/3);
    }

    @media all and (min-width: 980px) {
      width:

    calc(100%/4);
    }

    @media all and (min-width: 1260px) {
      width:

    calc(100%/5);
    }

    @media all and (min-width: 1800px) {
      width:

    calc(100%/6);
    }
  }

  .slider-item-inner {
    margin: 0 5px;
    border-radius: 2px;
    position: relative;
  }

  .cover {
    width: 100%;
    height: auto;
  }
</style>
