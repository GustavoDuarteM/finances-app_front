<template>
  <v-card>
    <v-card-actions>
      <v-list-item>
        <v-list-item-content>
          <Operation form_title="Novo Ganho" operation_flow="inflow">
            <v-btn text> Adicionar Ganho </v-btn>
          </Operation>
          <Operation form_title="Novo Gasto" operation_flow="outflow">
            <v-btn text> Adicionar Gasto </v-btn>
          </Operation>
          <v-btn text to="/operacoes"> Editar Transação </v-btn>
          <v-btn text @click="sign_out"> Sair </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import Operation from "./form_operation.vue";
export default {
  components: {
    Operation,
  },
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