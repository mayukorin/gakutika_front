<template>
  <div>
    <ProgressCircular v-show="loading" />
    <form-dialog :propsFormShowFlag.sync="formShowFlag" v-show="!loading">
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
    <GakutikaShowCard :gakutika="gakutika" v-show="!loading" />
    <br />
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
        store-action-name="gakutika/fetchGakutika"
        create-store-action-name="createUserAndCompanyAndGakutika"
        :gakutika-title="gakutika.title"
        :gakutika-id="gakutika.id"
        @created="userAndCompanyFormShowFlag = false"
        v-show="!loading"
      />
    </form-dialog>
    <br>
    <CompanyList 
      :user-and-companies="userAndCompanies" 
      :gakutika-id="gakutika.id"
      store-action-name="gakutika/fetchGakutika"
      v-show="!loading" />
    <br />
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
    <QuestionList :questions="questions" :gakutika-id="gakutika.id" v-show="!loading" />
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
        console.log(this.$store.getters["gakutika/getGakutika"]);
        return this.$store.getters["gakutika/getGakutika"];
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
