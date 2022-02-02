<template>
  <v-card>
    <v-card-title>
      <span class="headline">面接予定の企業追加</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyCreateForm :createUserAndCompany="onUserAndCompanyCreate" />
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
      onUserAndCompanyCreate: {
          type: Function,
      }
  },
};
</script>
