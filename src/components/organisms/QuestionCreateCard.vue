<template>
  <v-card>
    <v-card-title>
      <span class="headline">質問作成</span>
    </v-card-title>
    <v-card-text>
      <QuestionCreateForm :oncreate="handleCreate" />
    </v-card-text>
  </v-card>
</template>
<script>
import QuestionCreateForm from "@/components/molecules/QuestionCreateForm";
export default {
  name: "QuestionCreateCard",
  components: {
    QuestionCreateForm,
  },
  methods: {
    handleCreate: function (questionInfo) {
      return this.$store
        .dispatch("questions/createQuestion", questionInfo)
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["新しい質問を保存しました"],
          });
          this.$emit("uploaded");
        });
    },
  },
};
</script>
