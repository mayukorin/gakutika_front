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
                {{ iconName }}
            </v-icon>
            <span class="caption text-lowercase">{{ iconCaption }}</span>
          </v-btn>
        </template>
        <span>{{ iconExplain }}</span>
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
      default: "success mt-3 mx-auto mb-3"
    },
    colorString: {
      type: String,
      default: "",
    },
    iconCaption: {
        type: String
    },
    iconName: {
        type: String
    },
    iconExplain: {
        type: String
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
