<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="12" md="7">
          <div>{{ user_and_company.company.name }}</div>
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
        v-for="user_and_company_and_gakutika in user_and_company.user_and_company_and_gakutikas"
        :key="user_and_company_and_gakutika.id"
      >
        <div>
          {{ user_and_company_and_gakutika.gakutika.title }}
        </div>
        <div>
          <router-link :to="{name: 'GakutikaAndQuestionShow', params: { id: user_and_company_and_gakutika.gakutika.id }}">詳細</router-link>&nbsp;話す学チカから削除
        </div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  name: "Company",
  props: {
    user_and_company: {
      type: Object,
    },
  },
};
</script>
