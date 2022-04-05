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
            label="質問内容"
            required
            prepend-icon="mdi-help"
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="解答" rules="required">
          <v-textarea
            v-model="answer"
            label="解答"
            prepend-icon="mdi-forum"
            :error-messages="errors"
          ></v-textarea>
        </validation-provider>
        <v-autocomplete
            :no-filter="true"
            :items="companyEntries"
            item-text="company_name"
            item-value="id"
            :search-input.sync="search"
            v-model="userAndCompanyAndGakutikaId"
            label="質問された企業名(空白の場合は予想される質問)"
            prepend-icon="mdi-domain"
            hide-no-data
        ></v-autocomplete>
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
// import MonthPicker from "@/components/atoms/MonthPicker.vue";

export default {
  name: "QuestionCreateForm",
  components: {
    Button,
    DayPicker,
    // MonthPicker,
  },
  data() {
    return {
      query: "",
      answer: "",
      menu: false,
      userAndCompanyAndGakutikaId: "",
      day: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      startMonth: new Date().toISOString().substr(0, 7),
      search: null,
    };
  },
  props: {
    loadFlag: {
      type: Boolean,
      default: false,
    },
    companyEntries: {
      type: Array,
    },
  },
  methods: {
    handleClick: function () {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick().then(() => {
            this.$emit("create-button-click", {
              query: this.query,
              answer: this.answer,
              userAndCompanyAndGakutikaId: this.userAndCompanyAndGakutikaId,
              day: this.day,
              gakutikaId: this.$route.params.id,
            });
          });
        }
      });
    },
    handleDaySet: function (...args) {
      let [field, value] = args;
      this[field] = value;
    },
    handleMonthSet: function (...args) {
      let [field, value] = args;
      this[field] = value;
      console.log(this.startMonth);
    },
  },
  watch: {
    search: function (inputName) {
      // Items have already been loaded
      if (inputName === "") return;

      this.$emit("input-company-name", inputName);
    },
  },
};
</script>
