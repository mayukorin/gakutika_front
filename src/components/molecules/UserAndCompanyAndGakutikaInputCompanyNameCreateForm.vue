<template>
  <v-form>
    <validation-observer ref="observer">
      <form @submit.prevent="submit">
        <validation-provider v-slot="{ errors }" name="企業名" rules="required">
          <v-autocomplete
            :items="userAndCompanyEntries"
            item-text="company_name"
            item-value="id"
            v-model="userAndCompanyId"
            label="企業名"
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
  name: "UserAndCompanyAndGakutikaInputCompanyNameCreateForm",
  components: {
    Button,
  },
  props: {
    loadFlag: {
      type: Boolean,
      default: false,
    },
    userAndCompanyEntries: {
      type: Array,
    },
  },
  data() {
    return {
      userAndCompanyId: "",
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
            });
          });
        }
      });
    },
  }
};
</script>
