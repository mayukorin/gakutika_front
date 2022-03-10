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
            :no-filter="true"
            :items="gakutikaEntries"
            :search-input.sync="search"
            v-model="gakutikaTitle"
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
  },
  data() {
    return {
      gakutikaTitle: "",
      search: null,
    };
  },
  methods: {
    handleClick: function () {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$nextTick().then(() => {
            console.log(this.loadFlag);
            this.$emit("create-button-click", {
              companyName: this.companyName,
              gakutikaTitle: this.gakutikaTitle,
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
    search: function (inputTitle) {
      // Items have already been loaded
      if (inputTitle === "") return;

      this.$emit("input-gakutika-title", inputTitle);
    },
  },
};
</script>
