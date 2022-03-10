<template>
  <div>
    <ProgressCircular v-show="loading" />
    <div v-show="!loading">
      <h3 class="success--text mr-3 ml-1 title">面接を受ける企業一覧</h3>
      <CompanyList
        :user-and-companies="userAndCompanies"
        store-action-name="userAndCompanies/fetchuserAndCompanies"
      />
    </div>
  </div>
</template>
<script>
import CompanyList from "@/components/organisms/CompanyList";
import ProgressCircular from "@/components/atoms/ProgressCircular.vue";

export default {
  name: "CompanyIndex",
  components: {
    CompanyList,
    ProgressCircular,
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
