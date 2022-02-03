<template>
  <v-card>
    <v-card-title>
      <span class="headline">話す学チカ追加</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyAndGakutikaCreateForm :createUserAndCompanyAndGakutika="onUserAndCompanyAndGakutikaCreate" :companyName="companyName"/>
    </v-card-text>
  </v-card>
</template>
<script>
import UserAndCompanyAndGakutikaCreateForm from "@/components/molecules/UserAndCompanyAndGakutikaCreateForm";
export default {
  name: "UserAndCompanyAndGakutikaCreateCard",
  components: {
    UserAndCompanyAndGakutikaCreateForm,
  },
  props: {
      onUserAndCompanyAndGakutikaCreate: {
          type: Function,
      },
      companyName: {
          type: String,
      },
  },
};
</script>
