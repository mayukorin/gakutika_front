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
    <GakutikaBasicShowCard :gakutika="gakutika" v-show="!loading" />
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
    <QuestionList :questions="questions" :ondelete="handleDeleteQuestion" />
  </div>
</template>
<script>
import Button from "@/components/atoms/Button.vue";
import GakutikaBasicShowCard from "@/components/organisms/GakutikaBasicShowCard";
import ProgressCircular from "@/components/atoms/ProgressCircular.vue";
import FormDialog from "@/components/organisms/FormDialog";
import GakutikaUpdateCard from "@/components/organisms/GakutikaUpdateCard";
import QuestionList from "@/components/organisms/QuestionList";
import QuestionCreateCard from "@/components/organisms/QuestionCreateCard";

export default {
  name: "GakutikaShowCard",
  components: {
    Button,
    GakutikaBasicShowCard,
    ProgressCircular,
    FormDialog,
    GakutikaUpdateCard,
    QuestionList,
    QuestionCreateCard,
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
      .finally(() => {
        this.loading = false;
      });
  },
  computed: {
    gakutika: {
      get() {
        return this.$store.state.gakutikas.gakutika;
      },
    },
    questions: {
      get() {
        return this.$store.getters["questions/getQuestionsSortedByDay"];
      },
    },
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
