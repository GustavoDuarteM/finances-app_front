<template>
  <v-container
    id="operations_container"
    class="mx-auto overflow-y-auto"
    style="height: 550px"
  >
    <v-card>
      <v-list-item v-for="operation in operations" :key="operation.id">
        <v-list-item-content>
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
        </v-list-item-content>
      </v-list-item>
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
    loading_operation: false,
  }),
  methods: {
    get_operations: function () {
      this.loading_operation = true;
      const params = { params: { page: this.page } };
      this.$http.auth.get("/operations", params).then((response) => {
        
        const operation = response.data.map(operation => {
          return { 
            id: operation.id,
            date: this.formated_date(operation.date_of_operation),
            name: operation.name,
            value: this.formated_value(
              operation.value,
              operation.operation_flow
            )
          }
        });
        if(this.operations.length == 0){
          this.operations = operation
        }else{
          this.operations = this.operations.concat(operation)
          console.log(this.operations)
        }
        

      });
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