<template>
  <v-form>
    <validation-observer ref="observer">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="タイトル"
          rules="required|max:50"
        >
          <v-text-field
            v-model="title"
            :counter="50"
            :error-messages="errors"
            label="タイトル"
            required
            prepend-icon="mdi-folder"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="詳細"
          rules="required"
        >
          <v-textarea
            v-model="content"
            label="詳細"
            prepend-icon="mdi-pencil"
            :error-messages="errors"
            ></v-textarea>
        </validation-provider>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <MonthPicker :month="startMonth" :field="'startMonth'" :labelName="'開始年月'" @input="handleMonthSet"/>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <MonthPicker :month="endMonth" :field="'endMonth'" :labelName="'終了年月'" @input="handleMonthSet"/>
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
import MonthPicker from "@/components/atoms/MonthPicker.vue";

export default {
  name: "GakutikaCreateForm",
  components: {
    Button,
    MonthPicker,
  },
  props: {
    oncreate: {
      type: Function,
    },
  },
  data() {
    return {
      title: "",
      content: "",
      loadFlag: false,
      menu: false,
      startMonth: new Date().toISOString().substr(0, 7),
      endMonth: new Date().toISOString().substr(0, 7),
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
                title: this.title,
                content: this.content,
                startMonth: this.startMonth,
                endMonth: this.endMonth,
              });
            })
            .then(() => {
              this.loadFlag = false;
            });
        }
      });
    },
    handleMonthSet: function(...args) {
      console.log("why..");
      let [field, value] = args;
      console.log(field);
      console.log(value);
      this[field] = value;
      console.log(this.startMonth);
    }
  },
};
</script>
