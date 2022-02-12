<template>
  <div>
    <v-expansion-panels accordion>
      <Company
        v-for="user_and_company in user_and_companies"
        :key="user_and_company.id"
        :user_and_company="user_and_company"
        @user-and-company-and-gakutika-delete-button-click="handleDeleteUserAndCompanyAndGakutika"
        @user-and-company-delete-button-click="handleDeleteUserAndCompany"
        :createUserAndCompanyAndGakutika="userAndCompanyAndGakutikaCreate"
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
    user_and_companies: {
      type: Array,
    },
    userAndCompanyAndGakutikaCreate: {
      type: Function,
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
            messages: ["話す学チカから削除しました"],
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
            messages: ["企業を削除しました"],
          });
      })
    },
  }
  
};
</script>
