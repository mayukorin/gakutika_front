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
            v-model="editedGakutika.title"
            :counter="50"
            :error-messages="errors"
            label="タイトル"
            required
            prepend-icon="mdi-folder"
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="詳細" rules="required">
          <v-textarea
            v-model="editedGakutika.content"
            label="詳細"
            prepend-icon="mdi-pencil"
            :error-messages="errors"
          ></v-textarea>
        </validation-provider>
        <v-row>
          <v-col cols="12" sm="6">
            <MonthPicker
              :propsMonth.sync="editedGakutika.startMonth"
              :labelName="'開始年月'"
              @input="handleMonthSet"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <MonthPicker
              :propsMonth.sync="editedGakutika.endMonth"
              :labelName="'終了年月'"
              @input="handleMonthSet"
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
import MonthPicker from "@/components/atoms/MonthPicker.vue";

export default {
  name: "GakutikaUpdateForm",
  components: {
    Button,
    MonthPicker,
  },
  props: {
    onupdate: {
      type: Function,
    },
    gakutika: {
      type: Object,
    },
  },
  data() {
    return {
      /*
      title: this.gakutika.title,
      content: this.gakutika.content,
      */
      loadFlag: false,
      menu: false,
      /*
      startMonth: this.gakutika.startMonth,
      endMonth: this.gakutika.endMonth,
      */
      editedGakutika: this.gakutika,
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
                title: this.editedGakutika.title,
                content: this.editedGakutika.content,
                startMonth: this.editedGakutika.startMonth,
                endMonth: this.editedGakutika.endMonth,
              });
            })
            .then(() => {
              this.loadFlag = false;
            });
        }
      });
    },
    handleMonthSet: function (...args) {
      let [field, value] = args;
      this.editedGakutika[field] = value;
      console.log(this.editedGakutika.startMonth);
    },
  },
  watch: {
    gakutika: function (newGakutika) {
      this.editedGakutika = newGakutika;
    },
  },
};
</script>
