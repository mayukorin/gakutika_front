<template>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-row>
          <v-col>
            <v-icon
            v-bind="attrs"
            v-on="on"
            >
            {{ icon1 }}
            </v-icon>
          </v-col>
          <v-col>
            <v-icon
            v-bind="attrs"
            v-on="on"
            v-if="icon2 != ''"
            >
            {{ icon2 }}
            </v-icon>
          </v-col>
        </v-row>
      </template>
      <span>{{ caption }}</span>
    </v-tooltip>
</template>
<script>
export default {
  name: "ViconTooltip",
  props: {
    icon1: {
      type: String,
      default: "",
    },
    icon2: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
    },
  },
};
</script>