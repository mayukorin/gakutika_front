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
        default: 0
      },
      storeActionName: {
        type: String,
      }
  },
  data() {
    return {
      loadFlag: false,
    };
  },
  methods: {
    handleUpdate: function (userAndCompanyInfo) {
      this.loadFlag = true;
      return this.$store.dispatch("userAndCompanies/updateUserAndCompany", {
        userAndCompanyId: userAndCompanyInfo.userAndCompanyId, 
        companyName: userAndCompanyInfo.companyName, 
        gakutikaId: this.gakutikaId, 
        actionName: this.storeActionName, 
      })
      .then(() => {
        this.$store.dispatch("flashMessage/setSuccessMessage", {
          messages: ["企業名を更新しました"],
        });
        this.$emit("updated");
      }).finally(() => {
        this.loadFlag = false;
      });
    },
  },
};
</script>
