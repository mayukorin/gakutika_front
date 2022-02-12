<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="12" md="7">
          <div class="caption grey--text">
            <div>{{ question.day }}&nbsp;{{ question.companyName }}</div>
          </div>
          <div>{{ question.query }}</div>
        </v-col>
        <v-col cols="6" md="2">
          <form-dialog :propsFormShowFlag.sync="formShowFlag">
            <div slot="btn" @click.stop="formShowFlag = true">
              <div class="caption grey--text">編集</div>
              <v-icon>mdi-pencil</v-icon>
            </div>
            <QuestionUpdateCard
              slot="formCard"
              @uploaded="formShowFlag = false"
              :question="question"
            />
          </form-dialog>
        </v-col>
        <v-col cols="6" md="2">
          <div @click.stop="$emit('delete-button-click', question.id)">
            <div class="caption grey--text">削除</div>
            <v-icon>mdi-delete</v-icon>
          </div>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div>{{ question.answer }}</div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import FormDialog from "@/components/organisms/FormDialog";
import QuestionUpdateCard from "@/components/organisms/QuestionUpdateCard";

export default {
  name: "Question",
  components: {
    FormDialog,
    QuestionUpdateCard,
  },
  props: {
    question: {
      type: Object,
    },
  },
  data() {
    return {
      formShowFlag: false,
    };
  },
  /*
  methods: {
    onDelete(deleteQuestionId) {
      console.log("kokokara");
      console.log(deleteQuestionId);
      return this.ondelete(deleteQuestionId);
    }
  }
  */
};
</script>
