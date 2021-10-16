
<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <Menu />
      </v-col>
      <v-col cols="12" sm="4"></v-col>
      <v-col cols="12" sm="4">
        <Historico />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Historico from "../components/historico_transacao.vue";
import Menu from "../components/profile_menu.vue";
export default {
  components: {
    Historico,
    Menu,
  },
};
</script>

<style>
</style>