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
      console.log(questionInfo);
    },
  },
};
</script>
