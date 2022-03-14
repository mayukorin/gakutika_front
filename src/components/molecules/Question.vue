<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="12" md="6">
          <div class="caption grey--text mb-1">
            <div>質問された日：{{ question.day }}</div>
          </div>
          <div>{{ question.query }}</div>
        </v-col>
        <v-col cols="6" md="2" offset-md="2">
          <form-dialog :propsFormShowFlag.sync="formShowFlag">
            <div slot="btn" @click.stop="formShowFlag = true">
              <ViconTooltip 
                :icon1="'mdi-pencil'"
                :caption="'編集'"
              />
            </div>
            <QuestionUpdateCard
              slot="formCard"
              @updated="formShowFlag = false"
              :question="question"
            />
          </form-dialog>
        </v-col>
        <v-col cols="6" md="2">
          <div @click.stop="$emit('delete-button-click', question.id)">
            <ViconTooltip 
                :icon1="'mdi-delete'"
                :caption="'削除'"
              />
          </div>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="caption grey--text mb-1">解答</div>
      <div>{{ question.answer }}</div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import FormDialog from "@/components/organisms/FormDialog";
import QuestionUpdateCard from "@/components/organisms/QuestionUpdateCard";
import ViconTooltip from "@/components/atoms/ViconTooltip.vue";

export default {
  name: "Question",
  components: {
    FormDialog,
    QuestionUpdateCard,
    ViconTooltip,
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
