<template>
  <v-form>
    <validation-observer ref="observer">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="学チカのタイトル"
          rules="required"
        >
          <v-text-field
            v-model="gakutikaTitle"
            label="学チカのタイトル"
            prepend-icon="mdi-domain"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <v-row>
          <Button :loading="loadFlag" @click="handleClick()">追加</Button>
        </v-row>
      </form>
    </validation-observer>
  </v-form>
</template>
<script>
import Button from "@/components/atoms/Button.vue";

export default {
  name: "UserAndCompanyAndGakutikaCreateForm",
  components: {
    Button,
  },
  props: {
    createUserAndCompanyAndGakutika: {
      type: Function,
    },
    companyName: {
      type: String,
    },
  },
  data() {
    return {
      loadFlag: false,
      gakutikaTitle: "",
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
              return this.createUserAndCompanyAndGakutika({
                companyName: this.companyName,
                gakutikaTitle: this.gakutikaTitle,
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
