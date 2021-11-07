<template>
  <v-container>
    <v-container>
      <v-btn to="/painel" color="primary" text> Painel </v-btn>
      /
      <v-btn to="/painel" color="primary" text disabled> Transações </v-btn>
    </v-container>
    <v-card class="ma-3">
      <v-row>
        <v-col md="6" sm="12" >
          <h1 class="pa-3">Transações</h1>
        </v-col>
        <v-col md="6" sm="12" class="d-flex align-center justify-space-around">
            <OperationForm form_title="Novo Ganho" operation_flow="inflow">
              <v-btn color="primary"> Adicionar Ganho </v-btn>
            </OperationForm>
            <OperationForm
              form_title="Novo Gasto"
              operation_flow="outflow"
              class="ml-15"
            >
              <v-btn dark color="purple"> Adicionar Gasto </v-btn>
            </OperationForm>
        </v-col>
      </v-row>
    </v-card>

    <v-container>
      <OperationsList />
    </v-container>
  </v-container>
</template>

<script>
import OperationForm from "../components/form_operation.vue";
import OperationsList from "../components/operations_list.vue";
export default {
  components: {
    OperationForm,
    OperationsList,
  },
};
</script>

<style>
</style>