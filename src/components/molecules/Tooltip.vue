<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <slot name="btn" v-bind="attrs" v-on="on"></slot>
    </template>
    <span>あいうあいう</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "Tooltip",
};
</script>

<style></style>
