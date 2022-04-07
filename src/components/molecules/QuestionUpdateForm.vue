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
        <v-autocomplete
          :items="companyNameEntries"
          item-text="company_name"
          item-value="id"
          v-model="userAndCompanyAndGakutikaId"
          label="質問された企業名(予想される質問の場合は，「予想される質問」と入力してください)"
          prepend-icon="mdi-domain"
          hide-no-data
        ></v-autocomplete>
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
    question: {
      type: Object,
    },
    loadFlag: {
      type: Boolean,
      default: false,
    },
    companyNameEntries: {
      type: Array,
    },
  },
  data() {
    return {
      menu: false,
      editedQuestion: this.question,
      userAndCompanyAndGakutikaId: this.question.user_and_company_and_gakutika_id,
    };
  },
  methods: {
    handleClick: function () {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick().then(() => {
            return this.$emit("update-button-click", {
              query: this.editedQuestion.query,
              answer: this.editedQuestion.answer,
              userAndCompanyAndGakutikaId: this.userAndCompanyAndGakutikaId,
              day: this.editedQuestion.day,
              gakutikaId: this.$route.params.id,
              id: this.editedQuestion.id,
            });
          });
        }
      });
    },
    handleDaySet: function (...args) {
      let [field, value] = args;
      this.editedQuestion[field] = value;
    },
  },
};
</script>
