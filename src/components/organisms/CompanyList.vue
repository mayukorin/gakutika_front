<template>
  <div>
    <v-expansion-panels accordion>
      <Company
        v-for="userAndCompany in useAndCompanies"
        :key="userAndCompany.id"
        :userAndCompany="userAndCompany"
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
  data() {
      return {
          loading: false,
      }
    },
  created: function () {
    console.log("created");
    this.loading = true;
    this.$store
      .dispatch("companies/fetchCompanyList");
  },
  computed: {
      useAndCompanies: {
          get() {
              return this.$store.getters["companies/getCompanies"];
          }
      }
  }
};
</script>
