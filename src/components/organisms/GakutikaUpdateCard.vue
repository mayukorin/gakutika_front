<template>
  <v-card>
    <v-card-title>
      <span class="headline">学チカ更新</span>
    </v-card-title>
    <v-card-text>
      <GakutikaUpdateForm :onupdate="handleUpdate" :gakutika="gakutika" />
    </v-card-text>
  </v-card>
</template>
<script>
import GakutikaUpdateForm from "@/components/molecules/GakutikaUpdateForm";
export default {
  name: "GakutikaUpdateCard",
  props: {
    gakutika: {
      type: Object,
    },
  },
  components: {
    GakutikaUpdateForm,
  },
  methods: {
    handleUpdate: function (gakutikaInfo) {
      console.log(gakutikaInfo);
      return this.$store
        .dispatch("gakutikas/updateGakutika", gakutikaInfo)
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["学チカを更新しました"],
          });
          this.$emit("uploaded");
        });
    },
  },
};
</script>
