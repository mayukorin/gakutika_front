<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="12" md="7">
          <div>{{ company.name }}</div>
        </v-col>
        <v-col cols="6" md="2">
          <div class="caption grey--text">編集</div>
          <v-icon>mdi-magnify-plus</v-icon>
        </v-col>
        <v-col cols="6" md="2">
          <div class="caption grey--text">削除</div>
          <v-icon>mdi-delete</v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="caption grey--text">話す学チカ</div>
      <div
        v-for="gakutika in company.gakutikas"
        :key="gakutika.id"
      >
        {{ gakutika.title }}&nbsp;詳細
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  name: "Company",
  props: {
    company: {
      type: Object,
    },
  },
};
</script>
