<template>
  <div>
    <h3 class="success--text mr-3 ml-1 title">面接を受ける企業一覧</h3>
    <v-expansion-panels accordion>
      <Company
        v-for="userAndCompany in userAndCompanies"
        :key="userAndCompany.id"
        :user-and-company="userAndCompany"
        @user-and-company-and-gakutika-delete-button-click="handleDeleteUserAndCompanyAndGakutika"
        @user-and-company-delete-button-click="handleDeleteUserAndCompany"
        @gakutika-show-button-click="handleFetchGakutika"
        :gakutika-id="gakutikaId"
        :store-action-name="storeActionName"
      /> 
    </v-expansion-panels>
  </div>
</template>
<script>
import Company from "@/components/molecules/Company";

export default {
  name: "CompanyList",
  components: {
    Company,
  },
  props: {
    userAndCompanies: {
      type: Array,
    },
    gakutikaId: {
      type: Number,
      default: 0
    },
    storeActionName: {
      type: String,
    }
  },
  methods: {
    handleDeleteUserAndCompanyAndGakutika: function(deleteUserAndCompanyAndGakutikaId) {
      return this.$store.dispatch("userAndCompanies/destroyUserAndCompanyAndGakutika", {
        userAndCompanyAndGakutikaId: deleteUserAndCompanyAndGakutikaId, 
        gakutikaId: this.gakutikaId, 
        actionName: this.storeActionName 
      })
      .then(() => {
        this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["学チカを話すのをやめました"],
          });
      })
    },
    handleDeleteUserAndCompany: function (userAndCompanyId) {
      return this.$store.dispatch("userAndCompanies/destroyUserAndCompany", {
        userAndCompanyId: userAndCompanyId, 
        gakutikaId: this.gakutikaId, 
        actionName: this.storeActionName,
      })
      .then(() => {
        this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["面接を受ける企業から削除しました"],
          });
      })
    },
    handleFetchGakutika: function (gakutikaId) {
      this.$router.replace("/gakutika/" + gakutikaId);
    },
  }
  
};
</script>
