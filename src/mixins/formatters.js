const formatters = {
  methods:{
    formated_value: function (value, operation_flow) {
      const flow = operation_flow == "inflow" ? "+ " : "- ";
      return (
        flow +
        value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      );
    },
    formated_date_sm: function (date) {
      const parsed_date = new Date(date);
      return parsed_date
        .toLocaleDateString("pt-BR", { timeZone: "UTC" })
        .substr(0, 5);
    },
    formated_date: function (date) {
      const parsed_date = new Date(date);
      return parsed_date
        .toLocaleDateString("pt-BR", { timeZone: "UTC" })
    },
  },
}

export default formatters