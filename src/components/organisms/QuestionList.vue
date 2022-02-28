<template>
  <div>
    <v-expansion-panels accordion>
      <Question
        v-for="question in questions"
        :key="question.id"
        :question="question"
        @delete-button-click="handleDelete"
      />
    </v-expansion-panels>
  </div>
</template>
<script>
import Question from "@/components/molecules/Question";

export default {
  name: "QuestionList",
  components: {
    Question,
  },
  props: {
    questions: {
      type: Array,
    },
    gakutikaId: {
      type: Number,
      default: 0,
    }
  },
   methods: {
    handleDelete: function(deleteQuestionId) {
      return this.$store.dispatch("questions/destoryQuestion", {id: deleteQuestionId, gakutikaId: this.gakutikaId })
      .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["質問を削除しました"],
          });
      });
    },
   }
};
</script>
