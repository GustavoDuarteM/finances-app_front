<template>
  <v-card class="mx-auto overflow-y-auto"  style="height: 550px" >
    <v-container class="text-center">
      <h3>Histórico de Transação</h3>
    </v-container>
    <div v-for="operations in monthly_operations" :key= 'operations.date'>
      <div class="text-center">
        <v-chip class="ma-2" >
          {{ operations.date }}
        </v-chip>
      </div>
      <div v-for="operation in operations.operations" :key= "operation.id">
        <div class="py-1 px-5">
          <v-row no-gutters>
            <v-col cols='2' class="text-left">
              {{ operation.date }}
            </v-col>
            <v-col cols='6' class="text-left">
              {{ operation.name }}
            </v-col>
            <v-col class="text-right">
              {{ operation.value }}
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    monthly_operations: '',
  }),
  methods: {
    get_operations: function () {
      this.monthly_operations = []
      this.$http.auth
        .get("/operations")
        .then((response) => {
          for(let operation_response in response.data ){
            let operations = response.data[operation_response].map((operation)=>{ 
              const date = new Date(operation['date_of_operation'])
              const formated_date = date.toLocaleDateString("pt-BR", { timeZone: "UTC" }).substr(0, 5)
              const valor = operation['value']
              const operation_flow = operation['operation_flow'] == 'inflow' ? '+ ' : "- "
              const valor_formatado = operation_flow + valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
              return { 
                id: operation['id'], 
                date: formated_date, 
                name: operation['name'],
                value: valor_formatado
              }
            })
            this.monthly_operations.push( {date: operation_response, operations: operations})
          }
        })
    }
  },
  beforeMount() {
    this.get_operations();
  },
};
</script>

<style>

</style>