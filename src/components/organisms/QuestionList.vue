<template>
  <div>
    <v-expansion-panels accordion>
        <Question
          v-for="question in questions"
          :key="question.id"
          :question="question"
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
  data() {
    return {
      questions: [
          {id: 1, query: 'なんでですか？', answer: 'だからですすす', day: '2021 12-24', company: { name: 'リクルート' } }
      ]
    };
  },
};
</script>