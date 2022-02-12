<template>
  <v-card>
    <v-card-title>
      <span class="headline">話す学チカ追加</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyAndGakutikaCreateForm @create-button-click="handleCreate" :companyName="companyName"/>
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
        default: 0
      },
      storeActionName: {
        type: String,
      }
  },
  methods: {
    handleCreate: function(userAndCompanyAndGakutikaInfo) {
      // this.userAndCompanyFormShowFlag = false;
      return this.$store.dispatch("userAndCompanies/createUserAndCompanyAndGakutika", {gakutikaTitle: userAndCompanyAndGakutikaInfo.gakutikaTitle, gakutikaId: this.gakutikaId, companyName: userAndCompanyAndGakutikaInfo.companyName, actionName: this.storeActionName })
      .then(() => {
        this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["話す企業に追加しました"],
          });
        this.$emit("created");
      })
    },
  }
};
</script>
