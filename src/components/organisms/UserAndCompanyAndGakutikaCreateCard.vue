<template>
  <v-card>
    <v-card-title>
      <span class="headline">話す学チカ追加</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyAndGakutikaCreateForm
        @create-button-click="handleCreate"
        :gakutika-entries="gakutikaEntries"
        :company-name="companyName"
        :load-flag="loadFlag"
        :gakutika-title-entries="gakutikaTitleEntries"
        :user-and-company-id="userAndCompanyId"
      />
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
    companyName: {
      type: String,
    },
    gakutikaId: {
      type: Number,
      default: 0,
    },
    userAndCompanyId: {
      type: Number,
      default: 0,
    },
    storeActionName: {
      type: String,
    },
    gakutikaTitleEntries: {
      type: Array,
    }
  },
  data() {
    return {
      loadFlag: false,
      isSearchFlag: false,
      gakutikaEntries: [],
      inputGakutikaTitle: "",
    };
  },
  methods: {
    handleCreate: function (userAndCompanyAndGakutikaInfo) {
      this.loadFlag = true;
      let gakutikaIdOnThisPage = this.$route.params.id;
      return this.$store
        .dispatch("userAndCompanies/createUserAndCompanyAndGakutika", {
          gakutikaIdToCreateUserAndCompanyAndGakutika: userAndCompanyAndGakutikaInfo.gakutikaIdToCreateUserAndCompanyAndGakutika,
          gakutikaId: gakutikaIdOnThisPage,
          userAndCompanyId: userAndCompanyAndGakutikaInfo.userAndCompanyId,
          actionName: this.storeActionName,
        })
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["話す企業に追加しました"],
          });
          this.$emit("created");
        })
        .finally(() => {
          this.loadFlag = false;
        });
    },
  },
};
</script>
