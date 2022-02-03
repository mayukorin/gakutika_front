<template>
  <div>
    <ProgressCircular v-show="loading" />
    <form-dialog :propsFormShowFlag.sync="formShowFlag" v-show="!loading">
      <Button
        :classString="'success ml-1 mt-2 mb-2'"
        slot="btn"
        @click="formShowFlag = true"
      >
        学チカ編集
      </Button>
      <GakutikaUpdateCard
        slot="formCard"
        @uploaded="formShowFlag = false"
        :gakutika="gakutika"
      />
    </form-dialog>
    <GakutikaShowCard :gakutika="gakutika" v-show="!loading" />
    <br />
    <form-dialog :propsFormShowFlag.sync="userAndCompanyFormShowFlag">
      <Button
        :classString="'success ml-1 mt-2 mb-2'"
        slot="btn"
        @click="userAndCompanyFormShowFlag = true"
      >
        話す企業追加
      </Button>
      <userAndCompanyCreateCard
        slot="formCard"
        :onUserAndCompanyCreate="handleCreateUserAndCompany"
        v-show="!loading"
      />
    </form-dialog>
    <br>
    <CompanyList :user_and_companies="userAndCompanies" :onUserAndCompanyAndGakutikaDelete="handleDeleteUserAndCompanyAndGakutika" v-show="!loading" />
    <br />
    <form-dialog :propsFormShowFlag.sync="questionFormShowFlag">
      <Button
        :classString="'success ml-1 mt-2 mb-2'"
        slot="btn"
        @click="questionFormShowFlag = true"
      >
        質問新規作成
      </Button>
      <QuestionCreateCard
        slot="formCard"
        @uploaded="questionFormShowFlag = false"
      />
    </form-dialog>
    <QuestionList :questions="questions" :ondelete="handleDeleteQuestion" v-show="!loading" />
  </div>
</template>
<script>
import Button from "@/components/atoms/Button.vue";
import GakutikaShowCard from "@/components/organisms/GakutikaShowCard";
import ProgressCircular from "@/components/atoms/ProgressCircular.vue";
import FormDialog from "@/components/organisms/FormDialog";
import GakutikaUpdateCard from "@/components/organisms/GakutikaUpdateCard";
import QuestionList from "@/components/organisms/QuestionList";
import QuestionCreateCard from "@/components/organisms/QuestionCreateCard";
import CompanyList from "@/components/organisms/CompanyList";
import UserAndCompanyCreateCard from "@/components/organisms/UserAndCompanyCreateCard";

export default {
  name: "GakutikaAndQuestionShowCard",
  components: {
    Button,
    GakutikaShowCard,
    ProgressCircular,
    FormDialog,
    GakutikaUpdateCard,
    QuestionList,
    QuestionCreateCard,
    CompanyList,
    UserAndCompanyCreateCard,
  },
  data() {
    return {
      loading: false,
      formShowFlag: false,
      questionFormShowFlag: false,
      userAndCompanyFormShowFlag: false,
    };
  },
  created: function () {
    this.loading = true;
    this.$store
      .dispatch("gakutika/fetchGakutika", { gakutikaId: this.$route.params.id })
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
  computed: {
    gakutika: {
      get() {
        console.log(this.$store.state.gakutikas.gakutika);
        return this.$store.getters["gakutika/getGakutika"];
      },
    },
    questions: {
      get() {
        return this.$store.getters["gakutika/getQuestionsSortedByDay"];
      }
    },
    userAndCompanies: {
      get() {
        return this.$store.getters["userAndCompanies/getUserAndCompanies"];
      }
    }
  },
  methods: {
    handleDeleteQuestion: function(deleteQuestionId) {
      return this.$store.dispatch("gakutika/destoryQuestion", {id: deleteQuestionId, gakutikaId: this.gakutika.id })
      .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["質問を削除しました"],
          });
      });
    },
    handleDeleteUserAndCompanyAndGakutika: function(...args) {

      const [deleteUserAndCompanyAndGakutikaId, gakutikaId] = args;
      let actionName = 'gakutika/fetchGakutika';

      return this.$store.dispatch("userAndCompanies/destroyUserAndCompanyAndGakutika", {userAndCompanyAndGakutikaId: deleteUserAndCompanyAndGakutikaId, gakutikaId: gakutikaId, actionName })
      .then(() => {
        this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["話す学チカから削除しました"],
          });
      })
    },
    handleCreateUserAndCompany: function (userAndCompanyInfo) {
      console.log(userAndCompanyInfo);
      // this.userAndCompanyFormShowFlag = false;
      return this.$store.dispatch("userAndCompanies/createUserAndCompanyAndGakutika", {gakutikaTitle: this.gakutika.title, gakutikaId: this.gakutika.id, companyName: userAndCompanyInfo.companyName, actionName: "gakutika/fetchGakutika" })
      .then(() => {
        this.userAndCompanyFormShowFlag = false;
        this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["話す企業に追加しました"],
          });
      })
    }
  }
};
</script>
