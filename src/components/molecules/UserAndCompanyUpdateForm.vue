<template>
  <v-form>
    <validation-observer ref="observer">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="企業名"
          rules="required"
        >
          <v-autocomplete
            :no-filter="true"
            :items="companyEntries"
            :search-input.sync="search"
            v-model="editedcompanyName"
            label="企業名"
            prepend-icon="mdi-domain"
            :error-messages="errors"
            hide-no-data
          ></v-autocomplete>
        </validation-provider>
        <v-row>
          <v-col cols="12">
            <DayPicker
              :propsDay.sync="latestInterviewDay"
              :label-name="'直近の面接日'"
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
  name: "UserAndCompanyUpdateForm",
  components: {
    Button,
    DayPicker,
  },
  props: {
    userAndCompanyId: {
      type: Number,
    },
    companyName: {
        type: String,
    },
    loadFlag: {
      type: Boolean,
      default: false,
    },
    companyEntries: {
      type: Array,
    }
  },
  data() {
    return {
      latestInterviewDay: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      editedcompanyName: this.companyName,
      // editedcompanyName: "",
      search: null,

    };
  },
  methods: {
    handleClick: function () {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick()
            .then(() => {
              console.log(this.loadFlag);
              console.log(this);
              return this.$emit('update-button-click', {
                companyName: this.editedcompanyName,
                latestInterviewDay: this.latestInterviewDay,
                userAndCompanyId: this.userAndCompanyId,
              });
            });
        }
      });
    },
    handleDaySet: function (...args) {
      let [field, value] = args;
      this[field] = value;
    },
  },
  watch: {
    search: function (inputName) {
      // Items have already been loaded
      if (inputName === "") return;

      this.$emit('input-company-name', inputName);

    }
  }
};
</script>
