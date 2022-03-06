<template>
  <v-app-bar flat app>
    <v-app-bar-nav-icon
      class="grey--text"
      @click="handleDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase grey--text">
      <span class="font-weight-light">Gakutika</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on" color="grey">
          <v-icon left>mdi-chevron-down</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      <v-list v-if="isLoggedIn">
        <v-list-item router to="/">
          <v-list-item-content>
            <v-list-item-title>学チカ一覧</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/companies">
          <v-list-item-content>
            <v-list-item-title>面接を受ける企業一覧</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item router to="/sign-up">
          <v-list-item-content>
            <v-list-item-title>アカウント新規登録</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn v-if="isLoggedIn" text color="grey" @click="logout">
      <span>Sign out</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
    <v-btn v-else text color="grey" @click="login">
      <span>Sign In</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "Appbar",
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$store.dispatch("flashMessage/setSuccessMessage", {
        messages: ["ログアウトしました"],
    });
      this.$router.replace("/sign-in");
    },
    login() {
      this.$router.replace("/sign-in");
    },
    handleDrawer() {
      this.$emit("handle-drawer");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
};
</script>
