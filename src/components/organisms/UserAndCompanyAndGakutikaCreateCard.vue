<template>
  <v-card>
    <v-card-title>
      <span class="headline">話す学チカ追加</span>
    </v-card-title>
    <v-card-text>
      <UserAndCompanyAndGakutikaCreateForm 
        @create-button-click="handleCreate" 
        @input-gakutika-title="handleSearchGakutika" 
        :gakutika-entries="gakutikaEntries"
        :company-name="companyName" 
        :load-flag="loadFlag" />
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
  data() {
    return {
      loadFlag: false,
      isSearchFlag: false,
      gakutikaEntries: [],
      inputGakutikaTitle: "",
    };
  },
  methods: {
    handleCreate: function(userAndCompanyAndGakutikaInfo) {
      this.loadFlag = true;
      return this.$store.dispatch("userAndCompanies/createUserAndCompanyAndGakutika", {gakutikaTitle: userAndCompanyAndGakutikaInfo.gakutikaTitle, gakutikaId: this.gakutikaId, companyName: userAndCompanyAndGakutikaInfo.companyName, actionName: this.storeActionName })
      .then(() => {
        this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["話す企業に追加しました"],
          });
        this.$emit("created");
      }).finally(() => {
        this.loadFlag = false;
      });
    },
    handleSearchGakutika: function(inputGakutikaTitle) {
      
      this.inputGakutikaTitle = inputGakutikaTitle;
      if (this.isSearchFlag) return;
      this.isSearchFlag = true;
      return this.$store.dispatch("gakutikas/searchGakutikaTitle", {
        title: inputGakutikaTitle
      })
      .then((response) => {
        
        this.gakutikaEntries = [{header: "検索結果"}];
        Array.prototype.push.apply(this.gakutikaEntries, response.data.gakutika_titles);
        console.log(this.gakutikaEntries);
        /*
        this.gakutikaEntries = [{
          text: inputGakutikaTitle,
          value: inputGakutikaTitle,
          disabled: true,
          header: "検索結果"
        }];
        Array.prototype.push.apply(this.gakutikaEntries, response.data.gakutika_titles);
        this.gakutikaEntries = response.data.gakutika_titles;
        this.gakutikaEntries.push(
          {
            text: inputGakutikaTitle,
            value: inputGakutikaTitle,
            // disabled: true,
          }
        );
        console.log(response.data);
        this.gakutikaEntries = [{
            text: inputGakutikaTitle,
            value: inputGakutikaTitle,
            // disabled: true,
          }];
        */
      })
      .finally(() => {
        this.isSearchFlag = false;
      })
    }
  },
};
</script>
