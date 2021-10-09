<template>
  <v-app>
    <v-main>
      <NavBar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/navbar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
};
</script>
