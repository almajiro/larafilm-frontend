<template>
  <footer class="footer mt-auto">
    <!--
    <div class="container">
      <p class="float-right">
        <a href="#">Back to top</a>
      </p>
     <p>&copy; {{ new Date().getFullYear() }} {{ appName }}</p>
    </div>
    -->
  </footer>
</template>

<script>
    export default {
      name: "AppFooter",
      computed:{
        appName(){
          return this.$store.state.appName
        }
      },
    }
</script>

<style scoped>

</style>
