<template>
  <div>
    <ProgressCircular v-show="loading" />
    <v-row class="ma-0 mb-3">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            text
            color="grey"
            @click="setSortProp('tough_rank')"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left small>mdi-folder</v-icon>
            <span class="caption text-lowercase">頑張り順</span>
          </v-btn>
        </template>
        <span>学チカを頑張り順で並べる</span>
      </v-tooltip>
    </v-row>
    <GakutikaSortedList 
      :gakutikas="getGakutikas" 
      v-show="!loading" 
      :on-update-tough-rank="handleUpdateToughRank"
      :on-set-sort-prop-tough-rank="setSortProp"
    />
  </div>
</template>
<script>
import GakutikaSortedList from "@/components/organisms/GakutikaSortedList";
import ProgressCircular from "@/components/atoms/ProgressCircular.vue";

export default {
  name: "GakutikaList",
  components: {
    GakutikaSortedList,
    ProgressCircular,
  },
  data() {
    return {
      loading: false,
    };
  },
  created: function () {
    this.loading = true;
    this.$store.dispatch("gakutikas/fetchGakutikaList").then(() => {
      this.loading = false;
    });
  },
  methods: {
    setSortProp(prop) {
      this.$store.dispatch("gakutikas/setSortProp", { sortProp: prop });
    },
    handleUpdateToughRank: function(id_and_new_tough_rank_info) {
      console.log("handle");
      console.log(id_and_new_tough_rank_info);
      this.loading = true;
      return this.$store.dispatch("gakutikas/updateToughRank", id_and_new_tough_rank_info)
      .then(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    getGakutikas: {
      get() {
        return this.$store.getters["gakutikas/getGakutikasSorted"];
      },
    },
  },
};
</script>
