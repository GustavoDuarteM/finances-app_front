<template>
  <v-card class="mx-auto pa-3 mt-3" width="90%">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        required
        :type="show1 ? 'text' : 'password'"
        name="Password"
        label="Pasword"
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn color="success" class="mr-4" @click="signin" :loading="loading">
        Acessar
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
export default {
  data: () => ({
    valid: true,
    loading: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
    password: "",
  }),
  methods: {
    signin() {
      this.loading = true;
      const user = { user: { email: this.email, password: this.password } };
      this.$http.main
        .post("/sign_in", user)
        .then((response) => {
          this.$store.commit("authenticate", {
            jwt_auth: response.data.access_token,
            jwt_refresh: response.data.refresh_token,
          });
          if (this.$store.getters.user_authenticated) {
            this.$router.push({ path: "/painel" });
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>