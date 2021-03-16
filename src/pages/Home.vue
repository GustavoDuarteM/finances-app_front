<template>
  <div>
    <q-input standout v-model="email"  type="email" label="Email" ></q-input>
    <q-input standout v-model="uid"  type="password"  label="Uid"></q-input>
    <q-btn :loading="loading" color="black" label="acessar" class="full-width" @click="signin"></q-btn>
  </div>
</template>

<script setup>
export default {
  data () {
    return {
      email: '',
      uid: '',
      loading: false
    }
  },
  methods:{
    signin () {
      this.loading = true
      console.log({email: this.email, uid: this.uid})
      this.$http.main.post('/users/sign_in', {email: this.email, uid: this.uid})
      .then(response => console.log(response))
      .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>