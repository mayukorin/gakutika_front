<template>
  <div>
    <v-expansion-panels accordion>
      <draggable
        :options="options"
        class="width_all"
        v-model="sortedGakutikas"
        :disabled="!orderFlag"
      >
        <Gakutika
          v-for="gakutika in displayGakutikas"
          :key="gakutika.title"
          :gakutika="gakutika"
          @show="onfetchGakutika"
          @delete="ondelete"
        />
      </draggable>
    </v-expansion-panels>
    <v-pagination
      v-model="page"
      :length="length"
      @input="pageChange"
      color="success"
      v-show="!orderFlag"
    ></v-pagination>
  </div>
</template>
<script>
import Gakutika from "@/components/molecules/Gakutika";
import draggable from "vuedraggable";

export default {
  name: "GakutikaSortedList",
  components: {
    Gakutika,
    draggable,
  },
  props: {
    gakutikas: {
      type: Array,
    },
    orderFlag: {
      type: Boolean,
    },
    onUpdateToughRank: {
      type: Function,
    },
    onfetchGakutika: {
      type: Function,
    },
    ondelete: {
      type: Function,
    },
  },
  data() {
    return {
      options: {
        animation: 200,
      },
      page: 1,
      sortedGakutikas: [],
      pageSize: 10,
      length: 0,
    };
  },
  watch: {
    gakutikas: function (newGakutikas) {
      this.sortedGakutikas = newGakutikas;
      this.length = Math.ceil(this.sortedGakutikas.length / this.pageSize);
    },
    orderFlag: function (flag) {
      if (!flag) {
        let id_and_new_tough_rank = {};
        this.sortedGakutikas.forEach((gakutika, index) => {
          id_and_new_tough_rank[gakutika.id] = index + 1;
        });
        return this.onUpdateToughRank({
          id_and_new_tough_rank: id_and_new_tough_rank,
        });
      }
    },
  },
  methods: {
    pageChange: function (pageNumber) {
      this.page = pageNumber;
    },
    handleFetchGakutika: function (gakutikaId) {
      return this.onFetchGakutika(gakutikaId);
    },
  },
  computed: {
    displayGakutikas: function () {
      if (this.orderFlag) return this.sortedGakutikas;
      else
        return this.sortedGakutikas.slice(
          this.pageSize * (this.page - 1),
          this.pageSize * this.page
        );
    },
  },
};
</script>
<style scoped>
.width_all {
  width: 100%;
}
</style>
