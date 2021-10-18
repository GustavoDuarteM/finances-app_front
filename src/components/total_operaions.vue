<template>
  <v-card>
    <v-container class="text-center">
      <h3> {{months[this.total_operations.month] }} </h3>
    </v-container>
    <v-container class="d-flex justify-sm-space-between">
      <h5> Ganhos Totais </h5>
      <span>{{ this.formated_value(this.total_operations.inflow,'inflow') }}</span>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-sm-space-between">
      <h5> Gastos Totais </h5>
      <span>{{ this.formated_value(this.total_operations.outflow,'outflow') }}</span>
    </v-container >
    <v-divider></v-divider>
    <v-container class="d-flex justify-sm-space-between">
      <h5> Saldo </h5>
      <span>{{ this.formated_value(this.total_operations.total,this.total_operations.total_flow ) }}</span>
    </v-container>
  </v-card>
</template>

<script>

import formatters from "../mixins/formatters";
export default {
  mixins: [formatters],
  data: () => ({
    total_operations: '',
    months: {
              '1':'Janeiro',
              '2':'Fevereiro',
              '3':'Março',
              '4':'Abril',
              '5':'Maio',
              '6':'Junho',
              '7':'Julho',
              '8':'Agosto',
              '9':'Setembro',
              '10':'Outubro',
              '11':'Novembro',
              '12':'Dezembro'
              }
  }),
  methods: {
    get_total_operations: function(){
      this.$http.auth.get("/total_operations").then((response) => {
        this.total_operations = response.data
      })
    }
  },
  beforeMount() {
    this.get_total_operations();
  },
}
</script>

<style>

</style>