<template>
  <v-container>
    <v-container>
      <v-btn to="/painel" color="primary" text> Painel </v-btn>
      /
      <v-btn to="/painel" color="primary" text disabled> Orçameno </v-btn>
    </v-container>
    <v-card>
    <v-container>
    <v-row>
      <v-col cols="12" sm='7'>
        <v-container
          id="operations_container"
          class="mx-auto overflow-y-auto"
          style="height: 550px"
        >
          <div v-for="operation in operations" :key="operation.id">
            <v-list-item>
              <v-list-item-content>
                <v-row no-gutters>
                  <v-col cols="1" class="d-flex align-center justify-left">
                    <v-tooltip left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          :class="operation.operation_flow"
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ icon_operation_flow(operation.operation_flow) }}
                        </v-icon>
                      </template>
                      <span>{{ operation.operation_flow_locate }}</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="3" class="d-flex align-center justify-left">
                    {{ operation.formated_date }}
                  </v-col>
                  <v-col cols="5" class=" d-flex align-center justify-left">
                    {{ operation.name }}
                  </v-col>
                  <v-col cols="3" class="d-flex align-center justify-left">
                    {{ operation.formated_value }}
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-container>
      </v-col>
      <v-col cols="12" sm="4">
          <v-card>
            <v-container class="text-center">
              <h3> Valor Orçado </h3>
            </v-container>
            <v-container class="d-flex justify-sm-space-between">
              <h5> Ganhos Totais </h5>
              <span>{{ }}</span>
            </v-container>
            <v-divider></v-divider>
            <v-container class="d-flex justify-sm-space-between">
              <h5> Gastos Totais </h5>
              <span>{{  }}</span>
            </v-container >
            <v-divider></v-divider>
            <v-container class="d-flex justify-sm-space-between">
              <h5> Saldo </h5>
              <span>{{  }}</span>
            </v-container>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
    </v-card>
  </v-container>
</template>

<script>
import infinitLoad from "../mixins/infinit_load";
import formatters from "../mixins/formatters";
export default {
  mixins: [infinitLoad, formatters],
  data: () => ({
    operations: new Array(),
    page: 1,
    loading_operation: true,
    name: ''
  }),
  methods: {
    get_operations: function () {
      this.loading_operation = true;
      const params = { params: { page: this.page, name: this.name} };
      this.$http.auth.get("/operations", params).then((response) => {
        const operation = response.data.map((operation) => {
          return {
            id: operation.id,
            date_of_operation: operation.date_of_operation,
            formated_date: this.formated_date(operation.date_of_operation),
            name: operation.name,
            operation_flow: operation.operation_flow,
            operation_flow_locate: this.locate_operation_flow(
              operation.operation_flow
            ),
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
      }).finally(()=>{
        this.loading_operation = false;
      });
    },
    locate_operation_flow: function (operation_flow) {
      return operation_flow == "outflow" ? "Gasto" : "Ganho";
    },
    icon_operation_flow: function (operation_flow) {
      return operation_flow == "outflow" ? "mdi-minus" : "mdi-plus";
    },
  },
  beforeMount() {
    this.get_operations();
  },
  mounted() {
    this.set_containet("operations_container");
  },
}
</script>

<style>

</style>