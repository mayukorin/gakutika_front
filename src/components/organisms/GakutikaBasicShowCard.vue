<template>
  <v-card v-if="gakutika != null">
    <v-card-title>{{ gakutika.title }}</v-card-title>
    <v-card-subtitle
      >{{ gakutika.startMonth }} ~ {{ gakutika.endMonth }}</v-card-subtitle
    >
    <v-card-text>
      <div v-for="(text, index) in contentDividedByNewLine" :key="index">
        {{ text }}
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "GakutikBasicShowCard",
  props: {
    gakutika: {
      type: Object,
    },
  },
  computed: {
    contentDividedByNewLine: {
      get() {
        console.log(this.gakutika.content.split("\n"));
        console.log("okk");
        return this.gakutika.content.split("\n");
      },
    },
  },
};
</script>
