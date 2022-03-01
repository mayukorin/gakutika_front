<template>
  <v-card>
    <v-card-title>
      <span class="headline">企業追加</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyCreateForm @create-button-click="handleCreate" :load-flag="loadFlag" />
    </v-card-text>
  </v-card>
</template>
<script>
import UserAndCompanyCreateForm from "@/components/molecules/UserAndCompanyCreateForm";
export default {
  name: "UserAndCompanyCreateCard",
  components: {
    UserAndCompanyCreateForm,
  },
  props: {
      
      gakutikaId: {
        type: Number,
        default: 0
      },
      storeActionName: {
        type: String,
        default: "",
      },
      gakutikaTitle: {
        type: String
      },
      nextStoreActionName: {
        type: String,
        default: "",
      },
      createStoreActionName: {
        type: String,
        default: "createUserAndCompany"
      }
  },
  data() {
    return {
      loadFlag: false,
    };
  },
  methods: {
    handleCreate: function (userAndCompanyInfo) {
      console.log(userAndCompanyInfo);
      this.loadFlag = true;
      return this.$store.dispatch("userAndCompanies/"+this.createStoreActionName, {
        gakutikaTitle: this.gakutikaTitle, 
        gakutikaId: this.gakutikaId, 
        companyName: userAndCompanyInfo.companyName, 
        latestInterviewDay: userAndCompanyInfo.latestInterviewDay,
        actionName: this.storeActionName,
        nextActionName: this.nextStoreActionName})
      .then(() => {
        this.$emit('created');
        this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["話す企業に追加しました"],
        })
      }).finally(() => {
        this.loadFlag = false;
      });
    },
  }
};
</script>
