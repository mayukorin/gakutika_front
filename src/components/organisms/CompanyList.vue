<template>
  <div>
    <v-expansion-panels accordion>
      <Company
        v-for="company in companies"
        :key="company.id"
        :company="company"
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
    companies: {
      type: Array,
    }
  },
  
};
</script>
