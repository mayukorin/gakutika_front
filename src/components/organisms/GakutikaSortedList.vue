<template>
  <div>
    <Button @click="startOrder" v-show="!orderFlag">並び替え開始</Button>
    <Button @click="setOrder" v-show="orderFlag">並び替え完了</Button>
    <v-expansion-panels accordion>
      <draggable
        :options="options"
        class="ww"
        v-model="sortedGakutikas"
        :disabled="!orderFlag"
      >
        <Gakutika
          v-for="gakutika in displayGakutikas"
          :key="gakutika.title"
          :gakutika="gakutika"
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
import Button from "@/components/atoms/Button.vue";
export default {
  name: "GakutikaSortedList",
  components: {
    Gakutika,
    draggable,
    Button,
  },
  props: {
    gakutikas: {
      default: [],
    },
  },
  data() {
    return {
      options: {
        animation: 200,
      },
      page: 1,
      orderFlag: false,
      sortedGakutikas: [],
      dragGakutikas: [],
      pageSize: 2,
      length: 0,
    };
  },
  watch: {
    gakutikas: function (newGakutikas) {
      this.sortedGakutikas = newGakutikas;
      this.length = Math.ceil(this.sortedGakutikas.length / this.pageSize);
    },
  },
  methods: {
    setOrder: function () {
      this.orderFlag = false;
      this.gakutikas.map((gakutika, index) => {
        gakutika.order = index + 1;
      });
    },
    pageChange: function (pageNumber) {
      this.page = pageNumber;
    },
    startOrder: function () {
      this.orderFlag = true;
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
.ww {
  width: 100%;
}
</style>
