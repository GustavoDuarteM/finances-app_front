<template>
  <div>
    <h1>Painel</h1>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    operations: '',
  }),
  methods: {
    get_operations: function () {
      this.operations = '';
      this.$http.auth
        .get("/operations")
        .then((response) => {
          console.log(response.data)
          this.operations = response.data.operations
        })
    },
  },
  computed: {
    today: function () {
      return new Date(Date.now());
    },
  },
  beforeMount() {
    this.get_operations();
  },
};
</script>

<style>

</style>