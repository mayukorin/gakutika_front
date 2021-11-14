<template>
  <div>
    <ProgressCircular v-show="loading" />
    <v-row class="ma-0 mb-3" v-show="!loading">
      <Tooltip
        :textFlag="!isSortProp('tough_rank')"
        :colorString="'grey'"
        :classString="'mt-2 ml-1'"
        @click="setSortProp('tough_rank')"
        :iconName="'mdi-folder'"
        :iconCaption="'頑張り順'"
        :iconExplain="'頑張り順で並び替え'"
      />
      <Tooltip
        :textFlag="!isSortProp('tough_rank')"
        :colorString="'grey'"
        :classString="'mt-2 ml-1'"
        @click="setSortProp('tough_rank')"
        :iconName="'mdi-folder'"
        :iconCaption="'頑張り順'"
        :iconExplain="'頑張り順で並び替え'"
      />
      <Button
        :classString="'success ml-1 mt-2'"
        @click="changeOrderFlag"
      >
        <div v-show="!orderFlag">
          並び替え開始
        </div>
        <div v-show="orderFlag">
          並び替え完了
        </div>
      </Button>
      <GakutikaCreatePopupPlusButton />
    </v-row>
    <GakutikaSortedList 
      :gakutikas="getGakutikas" 
      v-show="!loading" 
      :on-update-tough-rank="handleUpdateToughRank"
      :order-flag="orderFlag"
    />
  </div>
</template>
<script>
import GakutikaSortedList from "@/components/organisms/GakutikaSortedList";
import ProgressCircular from "@/components/atoms/ProgressCircular.vue";
import Button from "@/components/atoms/Button.vue";
import Tooltip from "@/components/atoms/Tooltip.vue";
import GakutikaCreatePopupPlusButton from "@/components/molecules/GakutikaCreatePopupPlusButton.vue";

export default {
  name: "GakutikaList",
  components: {
    GakutikaSortedList,
    ProgressCircular,
    Button,
    Tooltip,
    GakutikaCreatePopupPlusButton
  },
  data() {
    return {
      loading: false,
      orderFlag: false,
    };
  },
  created: function () {
    this.loading = true;
    this.$store.dispatch("gakutikas/fetchGakutikaList").then(() => {
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
    setSortProp(prop) {
      this.$store.dispatch("gakutikas/setSortProp", { sortProp: prop });
    },
    handleUpdateToughRank: function(id_and_new_tough_rank_info) {
      this.loading = true;
      return this.$store.dispatch("gakutikas/updateToughRank", id_and_new_tough_rank_info)
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
    changeOrderFlag: function() {
        this.orderFlag = !this.orderFlag;
        if (this.orderFlag) this.setSortProp('tough_rank');
    }
  },
  computed: {
    getGakutikas: {
      get() {
        return this.$store.getters["gakutikas/getGakutikasSorted"];
      },
    },
    isSortProp: function() {
      return function(prop) {
        return this.$store.state.gakutikas.sortProp === prop;
      }
    }
  },
};
</script>
