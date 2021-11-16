<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <slot name="btn" v-bind="attrs" v-on="on" ></slot>
    </template>
    <slot name="formCard"></slot>
  </v-dialog>
</template>
<script>

export default {
  name: "FormDialog",
  props: {
    propsDialog: {
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
      dialog: {
          get: function() {
              return this.propsDialog;
          },
          set: function(newValue) {
              this.$emit('update:propsDialog', newValue);
          }
      }
  }
};
</script>