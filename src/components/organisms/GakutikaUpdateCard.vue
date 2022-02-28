<template>
  <v-card>
    <v-card-title>
      <span class="headline">学チカ更新</span>
    </v-card-title>
    <v-card-text>
      <GakutikaUpdateForm @update-button-click="handleUpdate" :gakutika="gakutika" :load-flag="loadFlag" />
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
  data() {
    return {
      loadFlag: false,
    };
  },
  methods: {
    handleUpdate: function (gakutikaInfo) {
      console.log(gakutikaInfo);
      this.loadFlag = true;
      return this.$store
        .dispatch("gakutikas/updateGakutika", gakutikaInfo)
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["学チカを更新しました"],
          });
          this.$emit("updated");
        })
        .finally(() => {
          this.loadFlag = false;
        });
    },
  },
};
</script>
