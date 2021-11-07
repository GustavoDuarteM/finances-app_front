
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" sm="12">
        <Menu />
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <Total/>
        <Calendar/>
      </v-col>
      <v-col cols="12" md="5" sm="12">
        <TransactionHistory />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TransactionHistory from "../components/transaction_history.vue";
import Menu from "../components/profile_menu.vue";
import Total from "../components/total_operations.vue"
import Calendar from "../components/calendar.vue"
export default {
  components: {
    TransactionHistory,
    Menu,
    Total,
    Calendar
  },
};
</script>

<style>
</style>