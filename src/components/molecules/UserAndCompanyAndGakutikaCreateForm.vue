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
    companyName: {
      type: String,
    },
    loadFlag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      gakutikaTitle: "",
    };
  },
  methods: {
    handleClick: function () {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick()
            .then(() => {
              console.log(this.loadFlag);
              this.$emit('create-button-click', {
                companyName: this.companyName,
                gakutikaTitle: this.gakutikaTitle,
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
