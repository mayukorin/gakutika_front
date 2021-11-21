<template>
  <v-dialog max-width="600px" v-model="formShowFlag">
    <template v-slot:activator="{ on, attrs }">
      <slot name="btn" v-bind="attrs" v-on="on"></slot>
    </template>
    <slot name="formCard"></slot>
  </v-dialog>
</template>
<script>
export default {
  name: "FormDialog",
  props: {
    propsFormShowFlag: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    dialogFalse() {
      this.dialog = false;
    },
  },
  computed: {
    formShowFlag: {
      get: function () {
        return this.propsFormShowFlag;
      },
      set: function (newValue) {
        this.$emit("update:propsFormShowFlag", newValue);
      },
    },
  },
};
</script>
