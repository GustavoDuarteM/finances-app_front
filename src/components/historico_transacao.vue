<template>
  <v-card>
    <v-container class="text-center">
      <h3>Histórico de Transação</h3>
    </v-container>
    <v-container
      id="operations_container"
      class="mx-auto overflow-y-auto"
      style="height: 550px"
    >
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
      <div class="text-center" v-if="loading_operation">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import InfinitLoad from "../mixins/infinit_load";
export default {
  mixins: [InfinitLoad],
  data: () => ({
    monthly_operations: [],
    page: 1,
    loading_operation: false,
  }),
  methods: {
    get_operations: function () {
      this.loading_operation = true;
      const params = { params: { page: this.page } };
      this.$http.auth.get("/operations", params).then((response) => {
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
          const monthly_operation = {
            date: operation_response,
            operations: operations,
          };

          let index = "";
          const duplacate_key = this.monthly_operations.reduce(
            (accum, curr, i) => {
              if (curr.date == operation_response) {
                index = i;
              }
              return accum || curr.date == operation_response;
            },
            false
          );

          if (duplacate_key) {
            console.log("duplacate_key", duplacate_key);
            this.monthly_operations[index].operations.push(operations);
          } else {
            this.monthly_operations.push(monthly_operation);
          }
        }
      });
      this.loading_operation = false;
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
    this.get_operations();
  },
  mounted() {
    this.set_containet("operations_container");
  },
  created() {
    this.$root.$on("UpdateOperationList", () => {
      this.page = 1;
      this.monthly_operations = [];
      this.get_operations();
    });
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.page += 1;
        this.get_operations();
      }
    },
  },
};
</script>

<style>
</style>