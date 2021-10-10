<template>
  <v-card>
    <v-card-actions>
      <v-list-item>
        <v-list-item-content>
          <v-btn text> Adicionar Ganho </v-btn>
          <v-btn text> Adicionar Gasto </v-btn>
          <v-btn text @click='sign_out'> Sair </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
   methods: {
    sign_out: function () {
      this.$http.authBase.delete("/users/sign_in").then(() => {
        this.$store.commit("clear_auth");
        this.$router.push({ path: "/" });
      });
    },
  },
};
</script>

<style>
</style>