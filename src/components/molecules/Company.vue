<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="12" md="6">
          <div class="caption grey--text">
            <div class="mb-1">
              直近の面接日：
              <span v-if="userAndCompany.latest_interview_day">
                {{ userAndCompany.latest_interview_day }}
              </span>
              <span v-else>
                まだ登録されていません
              </span>
            </div>
          </div>
          <div>{{ userAndCompany.company.name }}</div>
        </v-col>
        <v-col cols="12" md="2">
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
        <v-col cols="6" md="2" v-if ="userAndCompany.user_and_company_and_particular_gakutika != null"  @click.stop="$emit('user-and-company-and-gakutika-delete-button-click', userAndCompany.user_and_company_and_particular_gakutika.id)">
          <div class="caption grey--text">話す企業から削除</div>
          <v-icon>mdi-delete</v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div>
        話す学チカ一覧 &nbsp;
        <form-dialog :propsFormShowFlag.sync="formShowFlag">
          <!--
          <div slot="btn" @click.stop="formShowFlag = true">
            <div class="caption grey--text">話す学チカを追加</div>
            <v-icon>mdi-pencil</v-icon>
          </div>
          -->
          <Button
            :class-string="'success ml-1 mt-2 mb-2'"
            slot="btn"
            @click.stop="formShowFlag = true"
          >
            話す学チカ追加
          </Button>
          <UserAndCompanyAndGakutikaCreateCard
            slot="formCard"
            @created="formShowFlag = false"
            :company-name="userAndCompany.company.name"
            :gakutika-id="gakutikaId"
            :store-action-name="storeActionName"
          />
        </form-dialog>
      </div>
      <div
        v-for="userAndCompanyAndGakutika in userAndCompany.user_and_company_and_gakutikas"
        :key="userAndCompanyAndGakutika.id"
      >
        <div class="margin-add">
          <v-row>
            <v-col cols="12" md="6">
              <div>
                {{ userAndCompanyAndGakutika.gakutika.title }}
              </div>
            </v-col>
            <v-col cols="6" md="2" click.stop="$emit('gakutika-show-button-click', userAndCompanyAndGakutika.gakutika.id)"> 
              <div class="caption grey--text">詳細</div>
              <v-icon>mdi-magnify-plus</v-icon>
            </v-col>
            <v-col cols="6" md="2" @click.stop="$emit('user-and-company-and-gakutika-delete-button-click', userAndCompanyAndGakutika.id)">
              <div class="caption grey--text">話す学チカから削除</div>
              <v-icon>mdi-delete</v-icon>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import UserAndCompanyAndGakutikaCreateCard from "@/components/organisms/UserAndCompanyAndGakutikaCreateCard";
import UserAndCompanyUpdateCard from "@/components/organisms/UserAndCompanyUpdateCard";
import FormDialog from "@/components/organisms/FormDialog";
import Button from "@/components/atoms/Button.vue";

export default {
  name: "Company",
  components: {
    UserAndCompanyAndGakutikaCreateCard,
    UserAndCompanyUpdateCard,
    FormDialog,
    Button,
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
<style scoped>
  .margin-add {
    margin-right: 24px;
  }
</style>
