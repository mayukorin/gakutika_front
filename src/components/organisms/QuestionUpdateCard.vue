<template>
  <v-card>
    <v-card-title>
      <span class="headline">質問更新</span>
    </v-card-title>
    <v-card-text>
      <QuestionUpdateForm :onupdate="handleUpdate" :question="question" />
    </v-card-text>
  </v-card>
</template>
<script>
import QuestionUpdateForm from "@/components/molecules/QuestionUpdateForm";

export default {
  name: "QuestionUpdateCard",
  props: {
    question: {
      type: Object,
    },
  },
  components: {
    QuestionUpdateForm,
  },
  methods: {
    handleUpdate: function (questionInfo) {
      console.log(questionInfo);
      return this.$store
        .dispatch("questions/updateQuestion", questionInfo)
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["質問を更新しました"],
          });
          this.$emit("uploaded");
        });
    },
  },
};
</script>
