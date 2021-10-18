
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <Menu />
      </v-col>
      <v-col cols="12" sm="4">
        <Total/>
      </v-col>
      <v-col cols="12" sm="5">
        <TransactionHistory />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TransactionHistory from "../components/transaction_history.vue";
import Menu from "../components/profile_menu.vue";
import Total from "../components/total_operaions.vue"
export default {
  components: {
    TransactionHistory,
    Menu,
    Total
  },
};
</script>

<style>
</style>