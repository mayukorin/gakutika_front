<template>
  <div>
    <ProgressCircular v-show="loading" />
    <form-dialog :propsFormShowFlag.sync="formShowFlag" v-show="!loading">
      <Button
        :classString="'success ml-1 mt-2'"
        slot="btn"
        @click="formShowFlag = true"
      >
        学チカ編集
      </Button>
      <GakutikaUpdateCard
        slot="formCard"
        @uploaded="formShowFlag = false"
        :gakutika="gakutika"
      />
    </form-dialog>
    <GakutikaBasicShowCard :gakutika="gakutika" v-show="!loading" />
  </div>
</template>
<script>
import Button from "@/components/atoms/Button.vue";
import GakutikaBasicShowCard from "@/components/organisms/GakutikaBasicShowCard";
import ProgressCircular from "@/components/atoms/ProgressCircular.vue";
import FormDialog from "@/components/organisms/FormDialog";
import GakutikaUpdateCard from "@/components/organisms/GakutikaUpdateCard";

export default {
  name: "GakutikaShowCard",
  components: {
    Button,
    GakutikaBasicShowCard,
    ProgressCircular,
    FormDialog,
    GakutikaUpdateCard,
  },
  data() {
    return {
      loading: false,
      formShowFlag: false,
    };
  },
  created: function () {
    this.loading = true;
    this.$store
      .dispatch("gakutikas/fetchGakutika", { id: this.$route.params.id })
      .finally(() => {
        this.loading = false;
      });
  },
  computed: {
    gakutika: {
      get() {
        return this.$store.state.gakutikas.gakutika;
      },
    },
  },
};
</script>
