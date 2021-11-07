<template>
  <v-card class="mt-5">
    <v-container class="text-center" v-if="loading_operation">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>
    <v-date-picker
      v-model="date"
      :events="events"
      locale="pt-BR"
      full-width
      elevation="5"
      :min="this.format_date_to_request(this.firstDay)"
      :max="this.format_date_to_request(this.lastDay)"
      v-else
    ></v-date-picker>
  </v-card>
</template>

<script>
import formatters from "../mixins/formatters";
export default {
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    operations: new Array(),
    loading_operation: true,
  }),
  mixins: [formatters],
  methods: {
    get_operations: function () {
      this.loading_operation = true;
      const params = {
        params: {
          start_in: this.format_date_to_request(this.firstDay),
          end_in: this.format_date_to_request(this.lastDay),
        },
      };
      this.$http.auth
        .get("/operations", params)
        .then((response) => {
          this.operations = response.data.map((operation) => {
            return {
              date_of_operation: operation.date_of_operation,
              operation_flow: operation.operation_flow,
            };
          });
        })
        .finally(() => {
          this.loading_operation = false;
        });
    },
    events: function (date) {
      const red = this.find_operation_by_flow(date, "outflow")
        ? "#e9967a"
        : false;
      const green = this.find_operation_by_flow(date, "inflow")
        ? "#91c971"
        : false;

      return [red, green];
    },
    find_operation_by_flow: function (date, flow) {
      return this.operations.reduce((accum, curr) => {
        if (
          (curr.date_of_operation == date && curr.operation_flow == flow) ||
          accum
        ) {
          return true;
        }
        return false;
      }, false);
    },
    events_flow: function () {
      return true;
    },
  },
  beforeMount() {
    this.get_operations();
  },
  computed: {
    current_date: function () {
      return new Date();
    },
    firstDay: function () {
      return new Date(
        this.current_date.getFullYear(),
        this.current_date.getMonth(),
        1
      );
    },
    lastDay: function () {
      return new Date(
        this.current_date.getFullYear(),
        this.current_date.getMonth() + 1,
        0
      );
    },
  },
};
</script>

<style>
</style>