
<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="4" ></v-col>
      <v-col cols="12" sm="4" ></v-col>
      <v-col cols="12" sm="4" >
        <Historico/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Historico from '../components/historico_transacao.vue'
export default {
  components: {
    Historico
  },
};
</script>

<style>

</style>