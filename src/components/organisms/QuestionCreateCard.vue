<template>
  <v-card>
    <v-card-title>
      <span class="headline">質問作成</span>
    </v-card-title>
    <v-card-text>
      <QuestionCreateForm @create-button-click="handleCreate" :load-flag="loadFlag" />
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
  data() {
    return {
      loadFlag: false,
    };
  },
  methods: {
    handleCreate: function (questionInfo) {
      this.loadFlag = true;
      return this.$store
        .dispatch("questions/createQuestion", questionInfo)
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["新しい質問を保存しました"],
          });
          this.$emit("created");
        })
        .finally(() => {
          this.loadFlag = false;
        });
    },
  },
};
</script>
