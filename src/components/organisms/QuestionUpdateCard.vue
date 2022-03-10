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
        @input-company-name="handleSearchCompany"
        :company-entries="companyEntries"
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
      companyEntries: [
        { header: "入力値" },
        this.question.companyName,
        { divider: true },
      ],
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
    handleSearchCompany: function (inputCompanyName) {
      this.inputCompanyName = inputCompanyName;
      if (this.isSearchFlag) return;
      this.isSearchFlag = true;
      return this.$store
        .dispatch("userAndCompanies/searchCompanyName", {
          name: inputCompanyName,
        })
        .then((response) => {
          this.companyEntries = [{ header: "入力値" }];
          this.companyEntries.push(this.inputCompanyName);
          this.companyEntries.push({ divider: true });
          this.companyEntries.push({ header: "検索結果" });
          Array.prototype.push.apply(
            this.companyEntries,
            response.data.company_names
          );
        })
        .finally(() => {
          this.isSearchFlag = false;
        });
    },
  },
};
</script>
