<template>
  <v-card>
    <v-card-title>
      <span class="headline">話す企業追加</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyAndGakutikaInputCompanyNameCreateForm
        @create-button-click="handleCreate"
        :load-flag="loadFlag"
        :user-and-company-entries="userAndCompanyEntries"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import UserAndCompanyAndGakutikaInputCompanyNameCreateForm from "@/components/molecules/UserAndCompanyAndGakutikaInputCompanyNameCreateForm";
export default {
  name: "UserAndCompanyAndGakutikaInputCompanyNameCreateCard",
  components: {
    UserAndCompanyAndGakutikaInputCompanyNameCreateForm,
  },
  props: {
    gakutikaId: {
      type: Number,
      default: 0,
    },
    storeActionName: {
      type: String,
    },
    userAndCompanyEntries: {
      type: Array,
    },
  },
  data() {
    return {
      loadFlag: false,
    };
  },
  methods: {
    handleCreate: function (userAndCompanyAndGakutikaInfo) {
      this.loadFlag = true;
      return this.$store
        .dispatch("userAndCompanies/createUserAndCompanyAndGakutika", {
          gakutikaId: this.gakutikaId,
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
