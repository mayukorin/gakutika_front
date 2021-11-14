<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="changeDate"
            label="開始年月"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
        </template>
        <v-date-picker
        v-model="changeDate"
        type="month"
        no-title
        scrollable
        >
        <v-spacer></v-spacer>
        <v-btn
            text
            class="success"
            @click="menu = false"
        >
            Cancel
        </v-btn>
        <v-btn
            text
            class="success"
            @click="handleDateSet()"
        >
            OK
        </v-btn>
        </v-date-picker>
    </v-menu>
</template>
<script>
export default {
  name: "DatePicker",
  data() {
      return {
          menu: false,
          changeDate: new Date().toISOString().substr(0, 7),
      }
  },
  props: {
    date: {
      type: String,
    },
    field: {
      type: String,
    },
  },
  methods: {
    handleDateSet() {
      this.menu = false;
      this.$emit("input", this.field, this.changeDate);
    },
  },
  watch: {
    date: function (newDate) {
      console.log("okkk");
      console.log(newDate);
      this.changeDate = newDate;
      console.log(this.changeDate);
    }
  },
};
</script>

<style></style>
