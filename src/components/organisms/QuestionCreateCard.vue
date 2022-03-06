<template>
  <v-card>
    <v-card-title>
      <span class="headline">質問作成</span>
    </v-card-title>
    <v-card-text>
      <QuestionCreateForm 
        @create-button-click="handleCreate" 
        :load-flag="loadFlag" 
        @input-company-name="handleSearchCompany"
        :company-entries="companyEntries"
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
      companyEntries: [],
      isSearchFlag: false,
      inputCompanyName: "",
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
    handleSearchCompany: function(inputCompanyName) {
      
      this.inputCompanyName = inputCompanyName;
      if (this.isSearchFlag) return;
      this.isSearchFlag = true;
      return this.$store.dispatch("userAndCompanies/searchCompanyName", {
        name: inputCompanyName
      })
      .then((response) => {
        
        this.companyEntries = [{header: "入力値"}];
        this.companyEntries.push(this.inputCompanyName);
        this.companyEntries.push({divider: true});
        this.companyEntries.push({header: "検索結果"});
        Array.prototype.push.apply(this.companyEntries, response.data.company_names);
      })
      .finally(() => {
        this.isSearchFlag = false;
      })
    }
  },
};
</script>
