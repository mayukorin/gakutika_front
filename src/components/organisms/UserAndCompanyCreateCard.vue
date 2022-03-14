<template>
  <v-card>
    <v-card-title>
      <span class="headline">企業追加</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyCreateForm
        @create-button-click="handleCreate"
        :load-flag="loadFlag"
        @input-company-name="handleSearchCompany"
        :company-entries="companyEntries"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import UserAndCompanyCreateForm from "@/components/molecules/UserAndCompanyCreateForm";
export default {
  name: "UserAndCompanyCreateCard",
  components: {
    UserAndCompanyCreateForm,
  },
  props: {
    gakutikaId: {
      type: Number,
      default: 0,
    },
    storeActionName: {
      type: String,
      default: "",
    },
    gakutikaTitle: {
      type: String,
      default: "",
    },
    nextStoreActionName: {
      type: String,
      default: "",
    },
    createStoreActionName: {
      type: String,
      default: "createUserAndCompany",
    },
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
    handleCreate: function (userAndCompanyInfo) {
      console.log(userAndCompanyInfo);
      this.loadFlag = true;
      return this.$store
        .dispatch("userAndCompanies/" + this.createStoreActionName, {
          gakutikaTitle: this.gakutikaTitle,
          gakutikaId: this.gakutikaId,
          companyName: userAndCompanyInfo.companyName,
          latestInterviewDay: userAndCompanyInfo.latestInterviewDay,
          actionName: this.storeActionName,
          nextActionName: this.nextStoreActionName,
        })
        .then(() => {
          this.$emit("created");
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["話す企業に追加しました"],
          });
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
