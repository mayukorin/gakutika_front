<template>
  <v-card>
    <v-card-title>
      <span class="headline">質問作成</span>
    </v-card-title>
    <v-card-text>
      <QuestionCreateForm
        @create-button-click="handleCreate"
        :load-flag="loadFlag"
        :company-name-entries="questionCompanyNameEntries"
      />
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
      // defaultCompanyEntries: [{ "company_name" : "予想される質問", "id" : this.userAndDefaultCompanyAndGakutikaId }, { divider: true }, { header: "検索結果" }],
      // companyEntries: this.defaultCompanyEntries,
      isSearchFlag: false,
      inputCompanyName: "",
      userAndCompanyAndGakutikaId: "",
    };
  },
  props: {
    questionCompanyNameEntries: {
      type:Array,
    }
  },
  methods: {
    handleCreate: function (questionInfo) {
      this.loadFlag = true;
      questionInfo.userAndCompanyAndGakutikaId = questionInfo.userAndCompanyAndGakutikaId == "" ? this.userAndDefaultCompanyAndGakutikaId : questionInfo.userAndCompanyAndGakutikaId;
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
    handleSearchCompany: function (inputCompanyName) {
      console.log("search");
      this.inputCompanyName = inputCompanyName;
      console.log(inputCompanyName);
      if (this.isSearchFlag) return;
      this.isSearchFlag = true;
      return this.$store
        .dispatch("userAndCompanyAndGakutikas/searchUserAndCompanyAndGakutikaByCompanyNameAndUserId", {
          companyName: inputCompanyName,
          gakutikaId: this.$route.params.id,
        })
        .then((response) => {
          this.companyEntries = this.defaultCompanyEntries.concat(response.data);
        })
        .finally(() => {
          this.isSearchFlag = false;
        });
    },
  },
};
</script>
