<template>
  <div>
    <ProgressCircular v-show="loading" />
    <div v-show="!loading">
      <h3 class="success--text mr-3 ml-1 title">面接を受ける企業一覧</h3>
      <form-dialog :propsFormShowFlag.sync="userAndCompanyFormShowFlag">
        <Button
          :class-string="'success ml-1 mt-2 mb-2'"
          slot="btn"
          @click="userAndCompanyFormShowFlag = true"
        >
          面接を受ける企業追加
        </Button>
        <userAndCompanyCreateCard
          slot="formCard"
          store-action-name="userAndCompanies/fetchuserAndCompanies"
          create-store-action-name="createUserAndCompany"
          @created="userAndCompanyFormShowFlag = false"
        />
      </form-dialog>
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
import UserAndCompanyCreateCard from "@/components/organisms/UserAndCompanyCreateCard";
import FormDialog from "@/components/organisms/FormDialog";
import Button from "@/components/atoms/Button.vue";

export default {
  name: "CompanyIndex",
  components: {
    CompanyList,
    ProgressCircular,
    UserAndCompanyCreateCard,
    FormDialog,
    Button,
  },
  data() {
    return {
      loading: false,
      userAndCompanyFormShowFlag: false,
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
