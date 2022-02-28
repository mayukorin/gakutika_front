<template>
  <v-form>
    <validation-observer ref="observer">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="企業名"
          rules="required"
        >
          <v-text-field
            v-model="companyName"
            label="企業名"
            prepend-icon="mdi-domain"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <v-row>
          <v-col cols="12">
            <DayPicker
              :propsDay.sync="latestInterviewDay"
              :labelName="'直近の面接日'"
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
  name: "UserAndCompanyCreateForm",
  components: {
    Button,
    DayPicker,
  },
  data() {
    return {
      companyName: "",
      latestInterviewDay: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  props: {
    loadFlag: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick: function () {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick()
            .then(() => {
              console.log(this.loadFlag);
              return this.$emit('create-button-click', {
                companyName: this.companyName,
                latestInterviewDay: this.latestInterviewDay,
              });
            })
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
