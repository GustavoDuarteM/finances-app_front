
<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="3">
        <Menu />
      </v-col>
      <v-col cols="12" sm="4"></v-col>
      <v-col cols="12" sm="5">
        <TransactionHistory />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TransactionHistory from "../components/transaction_history.vue";
import Menu from "../components/profile_menu.vue";
export default {
  components: {
    TransactionHistory,
    Menu,
  },
};
</script>

<style>
</style>