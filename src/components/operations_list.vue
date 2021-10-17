<template>
  <v-card>
    <v-container
      id="operations_container"
      class="mx-auto overflow-y-auto"
      style="height: 550px"
    >
      <v-list-item v-for="operation in operations" :key="operation.id">
        <v-list-item-content>
          <v-row no-gutters>
            <v-col cols="2" class="text-left">
              {{ operation.formated_date }}
            </v-col>
            <v-col cols="4" class="text-left">
              {{ operation.name }}
            </v-col>
            <v-col cols="4" class="text-right">
              {{ operation.formated_value }}
            </v-col>
            <v-col cols="2" class="text-right">
              <Operation
                form_title="Editar"
                :operation_flow="operation.operation_flow"
                :operation="operation"
              >
                <v-btn text> Editar </v-btn>
              </Operation>
              <v-btn text @click="delete_operation(operation.id)">
                deletar
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-container>
    <v-container class="text-center" v-if="loading_operation">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
  </v-container>
  </v-card>
</template>

<script>
import infinitLoad from "../mixins/infinit_load";
import formatters from "../mixins/formatters";
import Operation from "./form_operation.vue";
export default {
  components: {
    Operation,
  },
  mixins: [infinitLoad, formatters],
  data: () => ({
    operations: new Array(),
    page: 1,
    loading_operation: false,
  }),
  methods: {
    get_operations: function () {
      this.loading_operation = true;
      const params = { params: { page: this.page } };
      this.$http.auth.get("/operations", params).then((response) => {
        const operation = response.data.map((operation) => {
          return {
            id: operation.id,
            date_of_operation: operation.date_of_operation,
            formated_date: this.formated_date(operation.date_of_operation),
            name: operation.name,
            operation_flow: operation.operation_flow,
            value: operation.value,
            formated_value: this.formated_value(
              operation.value,
              operation.operation_flow
            ),
          };
        });
        if (this.operations.length == 0) {
          this.operations = operation;
        } else {
          this.operations = this.operations.concat(operation);
        }
      });
      this.loading_operation = false;
    },
    delete_operation: function (id) {
      this.$http.auth.delete(`/operations/${id}`).then(() => {});
      this.$root.$emit("UpdateOperationList");
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
      this.operations = [];
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