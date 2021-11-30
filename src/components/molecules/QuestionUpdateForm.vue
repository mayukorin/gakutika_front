<template>
  <v-form>
    <validation-observer ref="observer">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="質問内容"
          rules="required|max:50"
        >
          <v-text-field
            v-model="editedQuestion.query"
            :counter="50"
            :error-messages="errors"
            label="質問内容"
            required
            prepend-icon="mdi-help"
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="解答" rules="required">
          <v-textarea
            v-model="editedQuestion.answer"
            label="解答"
            prepend-icon="mdi-forum"
            :error-messages="errors"
          ></v-textarea>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="質問された企業" rules="required">
          <v-text-field
            v-model="editedQuestion.companyName"
            label="質問された企業"
            prepend-icon="mdi-domain"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <v-row>
          <v-col cols="12" sm="6">
            <DayPicker
              :propsDay.sync="editedQuestion.day"
              :labelName="'質問された日'"
              @input="handleDaySet"
            />
          </v-col>
        </v-row>
        <v-row>
          <Button :loading="loadFlag" @click="handleClick()">更新</Button>
        </v-row>
      </form>
    </validation-observer>
  </v-form>
</template>
<script>
import Button from "@/components/atoms/Button.vue";
import DayPicker from "@/components/atoms/DayPicker.vue";

export default {
  name: "QuestionUpdateForm",
  components: {
    Button,
    DayPicker,
  },
  props: {
    onupdate: {
      type: Function,
    },
    question: {
      type: Object,
    },
  },
  data() {
    return {
      loadFlag: false,
      menu: false,
      editedQuestion: this.question,
    };
  },
  methods: {
    handleClick: function () {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.loadFlag = true;
          this.$nextTick()
            .then(() => {
              console.log(this.loadFlag);
              return this.onupdate({
                query: this.editedQuestion.query,
                answer: this.editedQuestion.answer,
                companyName: this.editedQuestion.companyName,
                day: this.editedQuestion.day,
                gakutikaId: this.$route.params.id,
                id: this.editedQuestion.id,
              });
            })
            .finally(() => {
              this.loadFlag = false;
            });
        }
      });
    },
    handleDaySet: function (...args) {
      let [field, value] = args;
      this.editedQuestion[field] = value;
    },
  },
  watch: {
    question: function (newQuestion) {
      this.editedQuestion = newQuestion;
    },
  },
};
</script>
