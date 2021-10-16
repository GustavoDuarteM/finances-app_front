<template>
  <v-card>
    <v-card-actions>
      <v-list-item>
        <v-list-item-content>
          <Operacao
            form_title="Novo Ganho"
            btn_title="Adicionar Ganho"
            operation_flow="inflow"
          />
          <Operacao
            form_title="Novo Gasto"
            btn_title="Adicionar Gasto"
            operation_flow="outflow"
          />
          <v-btn text @click="sign_out"> Sair </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import Operacao from "../components/form_operaçao.vue";
export default {
  components: {
    Operacao,
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