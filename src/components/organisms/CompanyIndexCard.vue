<template>
  <CompanyList
    :user-and-companies="userAndCompanies"
    v-show="!loading"
    store-action-name="userAndCompanies/fetchuserAndCompanies"
  />
</template>
<script>
import CompanyList from "@/components/organisms/CompanyList";
export default {
  name: "CompanyIndexCard",
  components: {
    CompanyList,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    userAndCompanies: {
      get() {
        console.log("computed");
        console.log(
          this.$store.getters["userAndCompanies/getUserAndCompanies"]
        );
        return this.$store.getters["userAndCompanies/getUserAndCompanies"];
      },
    },
  },
  created: function () {
    this.loading = true;
    this.$store
      .dispatch("userAndCompanies/fetchuserAndCompanies")
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        // sign in してなかったら，前の時点で error でるよね
        this.$router.replace({
          path: "/",
        });
      });
  },
};
</script>
