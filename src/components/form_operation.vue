
<template>
  <v-dialog v-model="dialog" persistent width="80%">
    <template v-slot:activator="{ on, attrs }">
      <div style="display: grid" v-bind="attrs" v-on="on">
        <slot> </slot>
      </div>
    </template>
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="text-h5">{{ form_title }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nome"
            required
            v-model="name"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="Valor"
            required
            v-model="value"
            :rules="[rules.required]"
            type="number"
            :prepend-icon="value_icon[operation_flow]"
          ></v-text-field>
          <v-text-field
            v-model="date_of_operation"
            required
            label="Quando"
            hint="DD/MM/YYYY"
            v-mask="'##/##/####'"
            prepend-icon="mdi-calendar"
            :rules="[rules.required, rules.date]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fechar
          </v-btn>
          <v-btn color="blue darken-1" text @click="save_operation">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    operation: {
      default: "",
    },
    form_title: {
      required: true,
    },
    operation_flow: {
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    name: "",
    value: "",
    date_of_operation: new Date().toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    }),
    rules: {
      required: (value) => !!value || "Deve ser preenchido.",
      date: (value) => {
        const pattern = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
        const splitted_date = value.split("/");
        const formated_date = `${splitted_date[1]}-${splitted_date[0]}-${splitted_date[2]}`;
        const date_validation = !isNaN(Date.parse(formated_date));
        return (pattern.test(value) && date_validation) || "Data inválida";
      },
    },
    value_icon: { inflow: "mdi-plus", outflow: "mdi-minus" },
  }),
  methods: {
    save_operation: function () {
      if (this.operation) {
        this.update_operation();
      } else {
        this.new_operation();
      }

      this.$root.$emit("UpdateOperationList");
    },
    new_operation: function () {
      const formated_date = this.date_of_operation
        .split("/")
        .reverse()
        .join("-");
      const params = {
        name: this.name,
        value: this.value,
        date_of_operation: formated_date,
        operation_flow: this.operation_flow,
      };
      this.$http.auth.post("/operations", params).then(() => {
        this.clear_form();
        this.dialog = false;
      });
    },
    update_operation() {
      const formated_date = this.date_of_operation
        .split("/")
        .reverse()
        .join("-");
      const params = {
        name: this.name,
        value: this.value,
        date_of_operation: formated_date,
      };
      this.$http.auth.put(`/operations/${this.operation.id}`, params).then(() => {
        this.dialog = false;
      });
    },
    init_operation: function () {
      if (this.operation) {
        this.name = this.operation.name;
        this.value = this.operation.value;
        const date_of_operation = new Date(this.operation.date_of_operation)
        this.date_of_operation = date_of_operation.toLocaleDateString("pt-BR", { timeZone: "UTC",})
      }
    },
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$refs.form.reset();
      }
    },
  },
  beforeMount() {
    this.init_operation();
  },
};
</script>

<style>
</style>