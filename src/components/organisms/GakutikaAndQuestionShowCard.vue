<template>
  <div>
    <ProgressCircular v-show="loading" />
    <div v-show="!loading">
    <h3 class="success--text mr-3 ml-1">学チカ詳細</h3>
    <form-dialog :propsFormShowFlag.sync="formShowFlag">
      <Button
        :class-string="'success ml-1 mt-2 mb-2'"
        slot="btn"
        @click="formShowFlag = true"
      >
        学チカ編集
      </Button>
      <GakutikaUpdateCard
        slot="formCard"
        @updated="formShowFlag = false"
        :gakutika="gakutika"
      />
    </form-dialog>
    <GakutikaShowCard :gakutika="gakutika"/>
    <br />
    <h3 class="success--text mr-3 ml-1">話す企業一覧</h3>
    <form-dialog :propsFormShowFlag.sync="userAndCompanyFormShowFlag">
      <Button
        :class-string="'success ml-1 mt-2 mb-2'"
        slot="btn"
        @click="userAndCompanyFormShowFlag = true"
      >
        話す企業追加
      </Button>
      <userAndCompanyCreateCard
        slot="formCard"
        store-action-name="gakutikas/fetchGakutika"
        create-store-action-name="createUserAndCompanyAndGakutika"
        :gakutika-title="gakutika.title"
        :gakutika-id="gakutika.id"
        @created="userAndCompanyFormShowFlag = false"
      />
    </form-dialog>
    <br>
    <CompanyList 
      :user-and-companies="userAndCompanies" 
      :gakutika-id="gakutika.id"
      store-action-name="gakutikas/fetchGakutika"
       />
    <br />
    <h3 class="success--text mr-3 ml-1">質問一覧</h3>
    <form-dialog :propsFormShowFlag.sync="questionFormShowFlag">
      <Button
        :class-string="'success ml-1 mt-2 mb-2'"
        slot="btn"
        @click="questionFormShowFlag = true"
      >
        質問新規作成
      </Button>
      <QuestionCreateCard
        slot="formCard"
        @created="questionFormShowFlag = false"
      />
    </form-dialog>
    <!--
    <QuestionList :questions="questions" :gakutika-id="gakutika.id" v-show="!loading" />
    -->
    <div v-for="user_and_company in gakutika.user_and_companies" :key="user_and_company.id" class="mb-2 mt-2">
      <h5 class="mb-2 mt-3 ml-1">{{ user_and_company.company.name}}でされた質問</h5>
      <div v-if="user_and_company.user_and_company_and_particular_gakutika.questions.length!=0">
        <QuestionList :questions="user_and_company.user_and_company_and_particular_gakutika.questions" :gakutika-id="gakutika.id"  />    
      </div>
      <div v-else class="text-center">質問はまだありません</div>
    </div>
  </div>
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
      .dispatch("gakutikas/fetchGakutika", { gakutikaId: this.$route.params.id })
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
        console.log(this.$store.getters["gakutikas/getGakutika"]);
        return this.$store.getters["gakutikas/getGakutika"];
      },
    },
    questions: {
      get() {
        return this.$store.getters["questions/getQuestionsSortedByDay"];
      }
    },
    userAndCompanies: {
      get() {
        return this.$store.getters["userAndCompanies/getUserAndCompanies"];
      }
    }
  },
};
</script>

<style scoped>
  h3 {
    display:inline;
  }
</style>
