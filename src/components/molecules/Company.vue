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
        <v-col cols="6" md="2" @click.stop="$emit('deleteUserAndCompany', user_and_company.id)">
          <div class="caption grey--text">削除</div>
          <v-icon>mdi-delete</v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="caption grey--text">話す学チカ</div>
      <form-dialog :propsFormShowFlag.sync="formShowFlag">
        <div slot="btn" @click.stop="formShowFlag = true">
          <div class="caption grey--text">追加</div>
          <v-icon>mdi-pencil</v-icon>
        </div>
        <UserAndCompanyAndGakutikaCreateCard
          slot="formCard"
          :companyName="user_and_company.company.name"
          :onUserAndCompanyAndGakutikaCreate="onUserAndCompanyAndGakutikaCreate"
        />
      </form-dialog>
      <div
        v-for="user_and_company_and_gakutika in user_and_company.user_and_company_and_gakutikas"
        :key="user_and_company_and_gakutika.id"
      >
        <div>
          {{ user_and_company_and_gakutika.gakutika.title }}
        </div>
        <div>
          <router-link :to="{name: 'GakutikaAndQuestionShow', params: { id: user_and_company_and_gakutika.gakutika.id }}">
            詳細
          </router-link>&nbsp;
          <span @click.stop="$emit('deleteUserAndCompanyAndGakutika', user_and_company_and_gakutika.id, user_and_company_and_gakutika.gakutika.id)">話す学チカから削除</span>
        </div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import UserAndCompanyAndGakutikaCreateCard from "@/components/organisms/UserAndCompanyAndGakutikaCreateCard";
import FormDialog from "@/components/organisms/FormDialog";

export default {
  name: "Company",
  components: {
    UserAndCompanyAndGakutikaCreateCard,
    FormDialog,
  },
  props: {
    user_and_company: {
      type: Object,
    },
    createUserAndCompanyAndGakutika: {
      type: Function,
    }
  },
  data() {
    return {
      formShowFlag: false,
    };
  },
  methods: {
    onUserAndCompanyAndGakutikaCreate: function(userAndCompanyAndGakutikaInfo) {
      return this.createUserAndCompanyAndGakutika(userAndCompanyAndGakutikaInfo).
      then(() => {
        this.formShowFlag = false;
      });
    }
  }
};
</script>
