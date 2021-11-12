<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ gakutika.title }}{{ gakutika.order }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      {{ gakutika.content }}
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  name: "Gakutika",
  props: {
    gakutika: {
      type: Object,
    },
  },
};
</script>
