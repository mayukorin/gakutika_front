<template>
  <v-card>
    <v-card-title>
      <span class="headline">面接予定の企業追加</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyUpdateForm 
        :updateUserAndCompany="onUserAndCompanyUpdate" 
        :userAndCompanyId="userAndCompanyId"
        :companyName="companyName"
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
      onUserAndCompanyUpdate: {
          type: Function,
      },
      companyName: {
          type: String,
      },
      userAndCompanyId: {
          type: Number,
      }
  },
};
</script>
