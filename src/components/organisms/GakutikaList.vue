<template>
  <div>
    <ProgressCircular v-show="loading" />
    <div v-show="!loading">
      <h3 class="success--text mr-3 ml-1 title">学チカ一覧</h3>
      <form-dialog :propsFormShowFlag.sync="formShowFlag">
        <Button
          :class-string="'success ml-1 mt-2'"
          slot="btn"
          @click="formShowFlag = true"
        >
          <v-icon
            left
          >
            mdi-plus
          </v-icon>
          学チカ追加
        </Button>
        <GakutikaCreateCard slot="formCard" @uploaded="formShowFlag = false" />
      </form-dialog>
      <v-row class="ma-0 mb-3">
        <Tooltip
          :textFlag="!isSortProp('id')"
          :color-string="'grey'"
          :class-string="'mt-2 ml-1'"
          @click="setSortPropAndReverseFlag('id', true)"
          :icon="'mdi-folder'"
          :caption="'作成順'"
          :explain="'作成順で並び替え'"
        />
        <Tooltip
          :textFlag="!isSortProp('toughRank')"
          :color-string="'grey'"
          :class-string="'mt-2 ml-1'"
          @click="setSortPropAndReverseFlag('toughRank', false)"
          :icon="'mdi-cards-heart'"
          :caption="'頑張り順'"
          :explain="'頑張り順で並び替え'"
        />
        <Button :class-string="'success ml-1 mt-2'" @click="changeOrderFlag">
          <div v-show="!orderFlag">
            <v-icon
            left
          >
            mdi-swap-vertical
          </v-icon>
            頑張り順を変更
          </div>
          <div v-show="orderFlag">変更完了</div>
        </Button>
      </v-row>
      <GakutikaSortedList
        :gakutikas="gakutikas"
        :on-update-tough-rank="handleUpdateToughRank"
        :order-flag="orderFlag"
        :onfetch-gakutika="handleFetchGakutika"
        :ondelete="handleDeleteGakutika"
      />
    </div>
  </div>
</template>
<script>
import GakutikaSortedList from "@/components/organisms/GakutikaSortedList";
import ProgressCircular from "@/components/atoms/ProgressCircular.vue";
import Button from "@/components/atoms/Button.vue";
import Tooltip from "@/components/atoms/Tooltip.vue";
import FormDialog from "@/components/organisms/FormDialog";
import GakutikaCreateCard from "@/components/organisms/GakutikaCreateCard";


export default {
  name: "GakutikaList",
  components: {
    GakutikaSortedList,
    ProgressCircular,
    Button,
    GakutikaCreateCard,
    FormDialog,
    Tooltip,
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
      if (this.orderFlag) this.setSortPropAndReverseFlag("toughRank", false);
    },
    handleFetchGakutika: function (gakutikaId) {
      // return this.$store.dispatch("gakutikas/fetchGakutika", gakutikaId);
      // この後，ページ遷移
      console.log(gakutikaId);
      this.$router.replace("/gakutika/" + gakutikaId);
    },
    handleDeleteGakutika: function (gakutikaId) {
      return this.$store
        .dispatch("gakutikas/destoryGakutika", { id: gakutikaId })
        .then(() => {
          this.$store.dispatch("flashMessage/setSuccessMessage", {
            messages: ["学チカを削除しました"],
          });
        });
    },
  },
  computed: {
    gakutikas: {
      get() {
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
<style scoped>
h3 {
  display: inline;
}
</style>
