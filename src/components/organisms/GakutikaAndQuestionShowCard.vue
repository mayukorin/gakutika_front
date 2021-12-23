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
    <CompanyList :companies="gakutika.companies" v-show="!loading" />
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
    <QuestionList :questions="gakutika.questions" :ondelete="handleDeleteQuestion" v-show="!loading" />
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
  },
  data() {
    return {
      loading: false,
      formShowFlag: false,
      questionFormShowFlag: false,
    };
  },
  created: function () {
    this.loading = true;
    this.$store
      .dispatch("gakutikas/fetchGakutika", { id: this.$route.params.id })
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
        return this.$store.state.gakutikas.gakutika;
      },
    },
    questions: {
      get() {
        return this.$store.state.gakutikas.gakutika.questions;
      }
    }
  },
  methods: {
    handleDeleteQuestion: function(deleteQuestionId) {
      return this.$store.dispatch("questions/destoryQuestion", {id: deleteQuestionId })
      .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["質問を削除しました"],
          });
      });
    }
  }
};
</script>
