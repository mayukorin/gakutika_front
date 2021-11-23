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
            v-model="query"
            :counter="50"
            :error-messages="errors"
            label="タイトル"
            required
            prepend-icon="mdi-folder"
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="解答" rules="required">
          <v-textarea
            v-model="answer"
            label="解答"
            prepend-icon="mdi-pencil"
            :error-messages="errors"
          ></v-textarea>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="質問された企業" rules="required">
          <v-text-field
            v-model="companyName"
            label="質問された企業"
            prepend-icon="mdi-pencil"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <v-row>
          <v-col cols="12" sm="6">
            <DayPicker
              :propsDay.sync="day"
              :labelName="'質問された日'"
              @input="handleDaySet"
            />
          </v-col>
        </v-row>
        <v-row>
          <Button :loading="loadFlag" @click="handleClick()">作成</Button>
        </v-row>
      </form>
    </validation-observer>
  </v-form>
</template>
<script>
import Button from "@/components/atoms/Button.vue";
import DayPicker from "@/components/atoms/DayPicker.vue";

export default {
  name: "QuestionCreateForm",
  components: {
    Button,
    DayPicker,
  },
  props: {
    oncreate: {
      type: Function,
    },
  },
  data() {
    return {
      query: "",
      answer: "",
      loadFlag: false,
      menu: false,
      companyName: "",
      day: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
              return this.oncreate({
                query: this.query,
                answer: this.answer,
                companyName: this.companyName,
                day: this.day,
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
      this[field] = value;
    },
  },
};
</script>
