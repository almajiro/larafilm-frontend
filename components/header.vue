<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-navbar-brand href="/"><i class="fas fa-video"></i> LaraFilm</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="#">You</b-nav-item>
        <b-nav-item href="#">TV</b-nav-item>
        <b-nav-item href="#" disabled>Movies</b-nav-item>
        <b-nav-item href="#" disabled>Records</b-nav-item>
        <b-nav-item href="#" disabled>Musics</b-nav-item>
        <b-nav-item href="#" disabled>Pictures</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-input-group>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-input-group-append>
              <b-btn size="sm" text="Button" class="search"><i class="fa fa-search"></i></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <img src="http://larafilm.local/storage/profiles/1.jpg" class="profile">
            <em>Kuroki Almajiro</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
    export default {
      name: "AppHeader",
      computed:{
        appName(){
          return this.$store.state.appName
        }
      },
      mounted(){
        this.$store.dispatch("loadAppBasics")
      }
    }
</script>

<style scoped>

</style>
