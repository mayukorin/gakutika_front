<template>
  <v-card>
    <v-card-title>
      <span class="headline">企業編集</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyUpdateForm
        @update-button-click="handleUpdate"
        :user-and-company-id="userAndCompanyId"
        :company-name="companyName"
        :load-flag="loadFlag"
        @input-company-name="handleSearchCompany"
        :company-entries="companyEntries"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import UserAndCompanyUpdateForm from "@/components/molecules/UserAndCompanyUpdateForm";
export default {
  name: "UserAndCompanyUpdateCard",
  components: {
    UserAndCompanyUpdateForm,
  },
  props: {
    companyName: {
      type: String,
    },
    userAndCompanyId: {
      type: Number,
    },
    gakutikaId: {
      type: Number,
      default: 0,
    },
    storeActionName: {
      type: String,
    },
  },
  data() {
    return {
      loadFlag: false,
      companyEntries: [
        { header: "入力値" },
        this.companyName,
        { divider: true },
      ],
      isSearchFlag: false,
      inputCompanyName: "",
    };
  },
  methods: {
    handleUpdate: function (userAndCompanyInfo) {
      this.loadFlag = true;
      return this.$store
        .dispatch("userAndCompanies/updateUserAndCompany", {
          userAndCompanyId: userAndCompanyInfo.userAndCompanyId,
          companyName: userAndCompanyInfo.companyName,
          gakutikaId: this.gakutikaId,
          actionName: this.storeActionName,
          latestInterviewDay: userAndCompanyInfo.latestInterviewDay,
        })
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["企業名を更新しました"],
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
