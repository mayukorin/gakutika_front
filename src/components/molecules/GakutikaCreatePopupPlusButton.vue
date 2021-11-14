<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on: popup, attrs }">
      <v-tooltip top>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            class="mt-1 ml-1"
            fab
            dark
            text
            color="success"
            v-bind="attrs"
            v-on="{ ...tooltip, ...popup }"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </template>
        <span>学チカ新規作成</span>
      </v-tooltip>
    </template>
    <GakutikaCreateCard />
  </v-dialog>
</template>
<script>
import GakutikaCreateCard from "@/components/organisms/GakutikaCreateCard";
export default {
  name: "GakutikaCreatePopupPlusButton",
  components: {
    GakutikaCreateCard,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    dialogFalse() {
      this.dialog = false;
    },
  },
};
</script>
