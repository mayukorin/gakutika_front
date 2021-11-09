<template>
  <v-row>
    <v-btn
      text
      class="success mt-3 mx-auto mb-3"
      @click="handleClick"
      depressed
      :loading="loading"
    >
      <slot />
    </v-btn>
  </v-row>
</template>
<script>
export default {
  name: "Button",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(ev) {
      this.$emit("click", ev);
    },
  },
};
</script>

<style></style>
