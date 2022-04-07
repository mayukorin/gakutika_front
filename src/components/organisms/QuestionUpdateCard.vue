<template>
  <v-card>
    <v-card-title>
      <span class="headline">質問更新</span>
    </v-card-title>
    <v-card-text>
      <QuestionUpdateForm
        @update-button-click="handleUpdate"
        :question="question"
        :load-flag="loadFlag"
        :company-name-entries="questionCompanyNameEntries"
      />
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
  data() {
    return {
      loadFlag: false,
      isSearchFlag: false,
      inputCompanyName: "",
    };
  },
  methods: {
    handleUpdate: function (questionInfo) {
      this.loadFlag = true;
      return this.$store
        .dispatch("questions/updateQuestion", questionInfo)
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["質問を更新しました"],
          });
          this.$emit("updated");
        })
        .finally(() => {
          this.loadFlag = false;
        });
    },
  },
  computed: {
    questionCompanyNameEntries: {
      get() {
        return this.$store.getters["gakutikas/getQuestionCompanyNameEntries"];
      }
    }
  },
};
</script>
