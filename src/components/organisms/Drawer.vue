<template>
  <v-navigation-drawer
    app
    class="success"
    :value="value"
    @input="$emit('handle-drawer')"
  >
    <v-list v-if="isLoggedIn">
      <v-list-item router to="/">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-clipboard-list</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text">学チカ一覧</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item router to="/companies">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-domain</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text"
            >面接を受ける企業一覧</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item router to="/sign-up">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text"
            >アカウント新規登録</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "Drawer",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
};
</script>
