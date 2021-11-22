<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="12" md="7">
            <div class="font-weight-bold"> {{ question.day }}</div>
            <div class="font-weight-bold"> {{ question.company.name }}</div>
            <div>{{ question.query }}</div>
        </v-col>
        <v-col cols="6" md="2">
          <div class="caption grey--text">編集</div>
          <v-icon>mdi-pencil</v-icon>
        </v-col>
        <v-col cols="6" md="2">
          <div class="caption grey--text">削除</div>
          <v-icon>mdi-delete</v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
        <div>{{ question.answer }}</div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
    },
  },
};
</script>
