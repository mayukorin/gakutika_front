<template>
  <v-form>
    <validation-observer ref="observer">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="学チカのタイトル"
          rules="required"
        >
          <v-autocomplete
            :items="gakutikaTitleEntries"
            v-model="gakutikaId"
            item-text="title"
            item-value="id"
            label="学チカのタイトル"
            prepend-icon="mdi-domain"
            :error-messages="errors"
            hide-no-data
          ></v-autocomplete>
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
    gakutikaEntries: {
      type: Array,
    },
    gakutikaTitleEntries: {
      type: Array,
    },
    userAndCompanyId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      gakutikaId: "",
    };
  },
  methods: {
    handleClick: function () {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick().then(() => {
            console.log(this.loadFlag);
            this.$emit("create-button-click", {
              userAndCompanyId: this.userAndCompanyId,
              gakutikaIdToCreateUserAndCompanyAndGakutika: this.gakutikaId,
            });
          });
        }
      });
    },
    handleDaySet: function (...args) {
      let [field, value] = args;
      this[field] = value;
    },
  }
};
</script>
