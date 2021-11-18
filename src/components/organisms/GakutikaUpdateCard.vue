<template>
  <v-card>
    <v-card-title>
      <span class="headline">学チカ更新</span>
    </v-card-title>
    <v-card-text>
      <GakutikaUpdateForm :onupdate="handleUpdate" :editGakutika="gakutika" />
    </v-card-text>
  </v-card>
</template>
<script>
import GakutikaUpdateForm from "@/components/molecules/GakutikaUpdateForm";
export default {
  name: "GakutikaCreateCard",
  props: {
    gakutika: {
        type: Object
    }
  },
  components: {
    GakutikaUpdateForm,
  },
  methods: {
    handleUpdate: function (gakutikaInfo) {
      console.log(gakutikaInfo);
    },
  },
};
</script>
