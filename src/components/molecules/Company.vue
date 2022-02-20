<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="12" md="7">
          <div>{{ userAndCompany.company.name }}</div>
        </v-col>
        <v-col cols="6" md="2">
          <form-dialog :propsFormShowFlag.sync="updateFormShowFlag">
            <div slot="btn" @click.stop="updateFormShowFlag = true">
              <div class="caption grey--text">編集</div>
              <v-icon>mdi-magnify-plus</v-icon>
            </div>
            <UserAndCompanyUpdateCard
              slot="formCard"
              :company-name="userAndCompany.company.name"
              :user-and-company-id="userAndCompany.id"
              @updated="updateFormShowFlag = false"
              :gakutika-id="gakutikaId"
              :store-action-name="storeActionName"
            />
          </form-dialog>
        </v-col>
        <v-col cols="6" md="2" @click.stop="$emit('user-and-company-delete-button-click', userAndCompany.id)">
          <div class="caption grey--text">受ける企業から削除</div>
          <v-icon>mdi-delete</v-icon>
        </v-col>
        <v-col v-if ="userAndCompany.user_and_company_and_particular_gakutika != null" cols="6" md="2" @click.stop="$emit('user-and-company-and-gakutika-delete-button-click', userAndCompany.user_and_company_and_particular_gakutika.id)">
          <div class="caption grey--text">話す企業から削除</div>
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
          @created="formShowFlag = false"
          :company-name="userAndCompany.company.name"
          :gakutika-id="gakutikaId"
          :store-action-name="storeActionName"
        />
      </form-dialog>
      <div
        v-for="userAndCompanyAndGakutika in userAndCompany.user_and_company_and_gakutikas"
        :key="userAndCompanyAndGakutika.id"
      >
        <div>
          {{ userAndCompanyAndGakutika.gakutika.title }}
        </div>
        <div>
          <router-link :to="{name: 'GakutikaAndQuestionShow', params: { id: userAndCompanyAndGakutika.gakutika.id }}">
            詳細
          </router-link>&nbsp;
          <span @click.stop="$emit('user-and-company-and-gakutika-delete-button-click', userAndCompanyAndGakutika.id)">話す学チカから削除</span>
        </div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import UserAndCompanyAndGakutikaCreateCard from "@/components/organisms/UserAndCompanyAndGakutikaCreateCard";
import UserAndCompanyUpdateCard from "@/components/organisms/UserAndCompanyUpdateCard";
import FormDialog from "@/components/organisms/FormDialog";

export default {
  name: "Company",
  components: {
    UserAndCompanyAndGakutikaCreateCard,
    UserAndCompanyUpdateCard,
    FormDialog,
  },
  props: {
    userAndCompany: {
      type: Object,
    },
    gakutikaId: {
      type: Number,
      default: 0
    },
    storeActionName: {
      type: String,
    }
  },
  data() {
    return {
      formShowFlag: false,
      updateFormShowFlag: false,
    };
  },
};
</script>
