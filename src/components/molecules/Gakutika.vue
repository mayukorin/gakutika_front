<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="12" md="7">
          <div class="caption grey--text">
            期間：{{ gakutika.startMonth }} ~ {{ gakutika.endMonth }}
          </div>
          <div>{{ gakutika.title }}</div>
        </v-col>
        <v-col cols="6" md="2" @click.stop="$emit('show', gakutika.id)">
          <ViconTooltip 
            :icon1="'mdi-magnify-plus'"
            :caption="'詳細'"
          />
        </v-col>
        <v-col cols="6" md="2" @click.stop="$emit('delete', gakutika.id)">
          <ViconTooltip 
            :icon1="'mdi-delete'"
            :caption="'削除'"
          />
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="caption grey--text">詳細</div>
      <div>{{ gakutika.content }}</div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import ViconTooltip from "@/components/atoms/ViconTooltip.vue";

export default {
  name: "Gakutika",
  components: {
    ViconTooltip,
  },
  props: {
    gakutika: {
      type: Object,
    },
    onFetchGakutika: {
      type: Function,
    },
    ondelete: {
      type: Function,
    },
  },
};
</script>
