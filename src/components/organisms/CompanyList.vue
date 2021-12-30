<template>
  <div>
    <v-expansion-panels accordion>
      <Company
        v-for="user_and_company in user_and_companies"
        :key="user_and_company.id"
        :user_and_company="user_and_company"
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
    }
  },
  
};
</script>
