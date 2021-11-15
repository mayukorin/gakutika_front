<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="changeMonth"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="changeMonth"
            :label="labelName"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
        </template>
        <v-date-picker
        v-model="changeMonth"
        type="month"
        no-title
        scrollable
        color="green lighten-1"
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
            @click="handleMonthSet()"
        >
            OK
        </v-btn>
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
      }
  },
  props: {
    month: {
      type: String,
    },
    field: {
      type: String,
    },
    labelName: {
      type: String
    }
  },
  methods: {
    handleMonthSet() {
      console.log("もううう");
      console.log(this.changeMonth);
      this.$refs.menu.save(this.changeMonth);
      this.menu = false;
      this.$emit("input", this.field, this.changeMonth);
    },
  },
  watch: {
    month: function (newMonth) {
      console.log("okkk");
      console.log(newMonth);
      this.changeMonth = newMonth;
      console.log(this.changeMonth);
    }
  },
};
</script>

<style></style>
