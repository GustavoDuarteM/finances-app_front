<template>
  <v-card>
    <v-container class="text-center">
      <h3>Histórico de Transação</h3>
    </v-container>
    <v-container class="mx-auto overflow-y-auto" style="height: 550px">
      <div v-for="operations in monthly_operations" :key="operations.date">
        <div class="text-center">
          <v-chip class="ma-2">
            {{ operations.date }}
          </v-chip>
        </div>
        <div v-for="operation in operations.operations" :key="operation.id">
          <div class="py-1 px-5">
            <v-row no-gutters>
              <v-col cols="2" class="text-left">
                {{ operation.date }}
              </v-col>
              <v-col cols="6" class="text-left">
                {{ operation.name }}
              </v-col>
              <v-col class="text-right">
                {{ operation.value }}
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  components: {},
  data: () => ({
    monthly_operations: [],
  }),
  methods: {
    get_operations: function() {
      let monthly_operations = []
      this.$http.auth
        .get("/operations")
        .then((response) => {
          for (let operation_response in response.data) {
            let operations = response.data[operation_response].map(
              (operation) => {
                return {
                  id: operation["id"],
                  date: this.formated_date(operation["date_of_operation"]),
                  name: operation["name"],
                  value: this.formated_value(
                    operation["value"],
                    operation["operation_flow"]
                  ),
                };
              }
            );
            monthly_operations.push({
              date: operation_response,
              operations: operations,
            });
          }
        });
      return monthly_operations;
    },
    formated_value: function (value, operation_flow) {
      const flow = operation_flow == "inflow" ? "+ " : "- ";
      return (
        flow +
        value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      );
    },
    formated_date: function (date) {
      const parsed_date = new Date(date);
      return parsed_date
        .toLocaleDateString("pt-BR", { timeZone: "UTC" })
        .substr(0, 5);
    },
  },
  beforeMount() {
    this.monthly_operations = this.get_operations();
  },
  created (){
    this.$root.$on('UpdateOperationList', () => {
      this.monthly_operations = this.get_operations()
    })
  }
};
</script>

<style>
</style>