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
              <v-col cols="5" class="text-left">
                {{ operation.name }}
              </v-col>
              <v-col cols="5" class="text-right">
                {{ operation.value }}
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <v-container class="text-center" v-if="loading_operation">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
import infinitLoad from "../mixins/infinit_load";
import formatters from "../mixins/formatters";
export default {
  mixins: [infinitLoad, formatters],
  data: () => ({
    monthly_operations: [],
    page: 1,
    loading_operation: false,
  }),
  methods: {
    get_operations: function () {
      this.loading_operation = true;
      const params = { params: { page: this.page , group_by_date: true} };
      this.$http.auth.get("/operations", params).then((response) => {
        for (let operation_response in response.data) {
          let operations = response.data[operation_response].map(
            (operation) => {
              return {
                id: operation.id,
                date: this.formated_date_sm(operation.date_of_operation),
                name: operation.name,
                value: this.formated_value(
                  operation.value,
                  operation.operation_flow
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
            const all_operations = this.monthly_operations[index].operations.concat(operations);
            this.monthly_operations[index].operations = all_operations
          } else {
            this.monthly_operations.push(monthly_operation);
          }
        }
      });
      this.loading_operation = false;
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