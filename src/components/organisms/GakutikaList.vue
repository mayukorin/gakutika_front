<template>
  <div>
    <ProgressCircular v-show="loading" />
    <v-row class="ma-0 mb-3" v-show="!loading">
      <Tooltip2
        :textFlag="!isSortProp('id')"
        :colorString="'grey'"
        :classString="'mt-2 ml-1'"
        @click="setSortPropAndReverseFlag('id', true)"
        :iconName="'mdi-folder'"
        :iconCaption="'作成順'"
        :iconExplain="'作成順で並び替え'"
      />
      <Tooltip2
        :textFlag="!isSortProp('tough_rank')"
        :colorString="'grey'"
        :classString="'mt-2 ml-1'"
        @click="setSortPropAndReverseFlag('tough_rank', false)"
        :iconName="'mdi-folder'"
        :iconCaption="'頑張り順'"
        :iconExplain="'頑張り順で並び替え'"
      />
      <Button :classString="'success ml-1 mt-2'" @click="changeOrderFlag">
        <div v-show="!orderFlag">並び替え開始</div>
        <div v-show="orderFlag">並び替え完了</div>
      </Button>
      <GakutikaCreatePopupPlusButton />
    </v-row>
    <GakutikaSortedList
      :gakutikas="getGakutikas"
      v-show="!loading"
      :on-update-tough-rank="handleUpdateToughRank"
      :order-flag="orderFlag"
      :on-fetch-gakutika="handleFetchGakutika"
    />
    <form-dialog :propsFormShowFlag.sync="formShowFlag">
      <Button
        :classString="'success ml-1 mt-2'"
        slot="btn"
        @click="formShowFlag = true"
      >
        学チカ新規作成
      </Button>
      <GakutikaCreateCard slot="formCard" @uploaded="formShowFlag = false" />
    </form-dialog>
  </div>
</template>
<script>
import GakutikaSortedList from "@/components/organisms/GakutikaSortedList";
import ProgressCircular from "@/components/atoms/ProgressCircular.vue";
import Button from "@/components/atoms/Button.vue";
import Tooltip2 from "@/components/atoms/Tooltip2.vue";
import GakutikaCreatePopupPlusButton from "@/components/molecules/GakutikaCreatePopupPlusButton.vue";
import FormDialog from "@/components/organisms/FormDialog";
import GakutikaCreateCard from "@/components/organisms/GakutikaCreateCard";

export default {
  name: "GakutikaList",
  components: {
    GakutikaSortedList,
    ProgressCircular,
    Button,
    GakutikaCreatePopupPlusButton,
    GakutikaCreateCard,
    FormDialog,
    Tooltip2,
  },
  data() {
    return {
      loading: false,
      orderFlag: false,
      formShowFlag: false,
    };
  },
  created: function () {
    this.loading = true;
    this.$store
      .dispatch("gakutikas/fetchGakutikaList")
      .then(() => {
        this.loading = false;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.$router.replace({
            path: "/sign-in",
            query: { next: "/" },
          });
        }
      });
  },
  methods: {
    setSortPropAndReverseFlag(prop, reverseFlag) {
      this.$store.dispatch("gakutikas/setSortPropAndReverseFlag", {
        sortProp: prop,
        reverseFlag: reverseFlag,
      });
    },
    handleUpdateToughRank: function (id_and_new_tough_rank_info) {
      this.loading = true;
      return this.$store
        .dispatch("gakutikas/updateToughRank", id_and_new_tough_rank_info)
        .catch((error) => {
          this.loading = false;
          if (error.response.status === 401) {
            this.$router.replace({
              path: "/sign-in",
              query: { next: "/" },
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    changeOrderFlag: function () {
      this.orderFlag = !this.orderFlag;
      if (this.orderFlag) this.setSortPropAndReverseFlag("tough_rank", false);
    },
    handleFetchGakutika: function (gakutikaId) {
      // return this.$store.dispatch("gakutikas/fetchGakutika", gakutikaId);
      // この後，ページ遷移
      this.$router.replace("/gakutika/" + gakutikaId.id);
    },
  },
  computed: {
    getGakutikas: {
      get() {
        console.log("変更");
        return this.$store.getters["gakutikas/getGakutikasSorted"];
      },
    },
    isSortProp: function () {
      return function (prop) {
        return this.$store.state.gakutikas.sortProp === prop;
      };
    },
  },
};
</script>
