<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="month"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="month"
        :label="labelName"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="month"
      type="month"
      no-title
      scrollable
      color="green lighten-1"
    >
      <v-spacer></v-spacer>
      <v-btn text class="success" @click="menu = false"> Cancel </v-btn>
      <v-btn text class="success" @click="handleMonthSet()"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: "MonthPicker",
  data() {
    return {
      menu: false,
      changeMonth: new Date().toISOString().substr(0, 7),
    };
  },
  props: {
    propsMonth: {
      type: String,
    },
    labelName: {
      type: String,
    },
  },
  methods: {
    handleMonthSet() {
      this.menu = false;
      this.$refs.menu.save(this.month);
    },
  },
  computed: {
    month: {
      get: function () {
        return this.propsMonth;
      },
      set: function (newValue) {
        this.$emit("update:propsMonth", newValue);
      },
    },
  },
};
</script>

<style></style>
