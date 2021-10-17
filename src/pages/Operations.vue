<template>
  <v-container>
    <v-container>
      <v-btn to="/painel" color="primary" text> Painel </v-btn>
      /
      <v-btn to="/painel" color="primary" text disabled> Transações </v-btn>
    </v-container>
    <v-card>
      <v-container class="d-flex align-center">
        <v-container>
          <h1>Transações</h1>
        </v-container>
        <v-container class="d-flex justify-end">
          <v-container>
            <OperationForm form_title="Novo Ganho" operation_flow="inflow">
              <v-btn color="primary"> Adicionar Ganho </v-btn>
            </OperationForm>
          </v-container>
          <v-container>
            <OperationForm
              form_title="Novo Gasto"
              operation_flow="outflow"
              class="ml-15"
            >
              <v-btn dark color="purple"> Adicionar Gasto </v-btn>
            </OperationForm>
          </v-container>
        </v-container>
      </v-container>
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