<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="day"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="day"
        :label="labelName"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="day"
      no-title
      scrollable
      color="green lighten-1"
    >
      <v-spacer></v-spacer>
      <v-btn text class="success" @click="menu = false"> Cancel </v-btn>
      <v-btn text class="success" @click="handleDaySet()"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: "DayPicker",
  data() {
    return {
      menu: false,
      changeDay: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    };
  },
  props: {
    propsDay: {
      type: String,
    },
    labelName: {
      type: String,
    },
  },
  methods: {
    handleDaySet() {
      this.menu = false;
      this.$refs.menu.save(this.day);
    },
  },
  computed: {
    day: {
      get: function () {
        return this.propsDay;
      },
      set: function (newValue) {
        this.$emit("update:propsDay", newValue);
      },
    },
  },
};
</script>

<style></style>
