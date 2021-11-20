<template>
  <v-card>
    <v-card-title>
      <span class="headline">学チカ作成</span>
    </v-card-title>
    <v-card-text>
      <GakutikaCreateForm :oncreate="handleCreate" />
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
  methods: {
    handleCreate: function (gakutikaInfo) {
      return this.$store
        .dispatch("gakutikas/createGakutika", gakutikaInfo)
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["新しい学チカを保存しました"],
          });
          this.$emit("uploaded");
        });
    },
  },
};
</script>
