<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        :text="textFlag"
        :class="classString"
        :color="colorString"
        depressed
        @click="handleClick"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left small>
          {{ icon }}
        </v-icon>
        <span class="caption text-lowercase">{{ caption }}</span>
      </v-btn>
    </template>
    <span>{{ explain }}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "Tooltip",
  props: {
    textFlag: {
      type: Boolean,
      default: true,
    },
    classString: {
      type: String,
      default: "success mt-3 mx-auto mb-3",
    },
    colorString: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
    },
    icon: {
      type: String,
    },
    explain: {
      type: String,
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
