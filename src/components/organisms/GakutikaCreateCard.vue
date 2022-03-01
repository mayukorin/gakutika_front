<template>
  <v-card>
    <v-card-title>
      <span class="headline">学チカ作成</span>
    </v-card-title>
    <v-card-text>
      <GakutikaCreateForm @create-button-click="handleCreate" :load-flag="loadFlag" />
    </v-card-text>
  </v-card>
</template>
<script>
import GakutikaCreateForm from "@/components/molecules/GakutikaCreateForm";
export default {
  name: "GakutikaCreateCard",
  components: {
    GakutikaCreateForm,
  },
  data() {
    return {
      loadFlag: false,
    }
  },
  methods: {
    handleCreate: function (gakutikaInfo) {
      this.loadFlag = true;
      return this.$store
        .dispatch("gakutikas/createGakutika", gakutikaInfo)
        .then(() => {
          this.loadFlag = false;
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["新しい学チカを保存しました"],
          });
          this.$emit("uploaded");
        });
    },
  },
};
</script>
