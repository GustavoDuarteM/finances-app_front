<template>
  <v-toolbar  dense >
      <v-btn text plain to='/'>
        <v-toolbar-title >FinacesApp</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
components: {
  },
  computed:{
    autenticated: function(){
      return this.$store.getters.user_authenticated
    }
  }
}
</script>

<style>

</style>