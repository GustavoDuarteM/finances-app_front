<template>
  <v-container>
    <v-container>
      <v-row no-gutters>
        <v-card >
          <OperationForm form_title="Novo Ganho" operation_flow="inflow">
            <v-btn color="primary"> Adicionar Ganho </v-btn>
          </OperationForm>
          <OperationForm form_title="Novo Gasto" operation_flow="outflow">
            <v-btn color="success"> Adicionar Gasto </v-btn>
          </OperationForm>
        </v-card>
      </v-row>
    </v-container>
    
    <v-container>
      <OperationsList/>
    </v-container>
  </v-container>
</template>

<script>
import OperationForm from "../components/form_operation.vue";
import OperationsList from "../components/operations_list.vue";
export default {
  components: {
    OperationForm,
    OperationsList
  }
};
</script>

<style>
</style>