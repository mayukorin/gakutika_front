<template>
  <div>
    <v-expansion-panels accordion>
      <Question
        v-for="question in questions"
        :key="question.id"
        :question="question"
        @delete="ondelete"
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
    ondelete: {
      type: Function,
    },
  },
};
</script>
