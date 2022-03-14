<template>
  <nav>
    <v-snackbar v-model="snac" top :color="flashMessage.color">
      <div v-for="message in flashMessage.messages" :key="message">
        {{ message }}
      </div>
    </v-snackbar>
    <!-- <Appbar @handle-drawer="drawerChange" /> -->
    <v-app-bar flat app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click.stop="drawer = !drawer"
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

    <v-navigation-drawer
      app
      class="success"
      v-model="drawer"
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
  </nav>
</template>
<script>
// import Appbar from "@/components/organisms/Appbar";

export default {
  name: "Navbar",
  data() {
    return {
      snac: true,
      drawerNotify: false,
      drawer: false,
    };
  },
  methods: {
    setSnacFalse: function () {
      this.snac = false;
    },
    setSnacTrue: function () {
      this.snac = true;
    },
    drawerChange() {
      console.log("drawerChange");
      this.drawerNotify = !this.drawerNotify;
      console.log(this.drawerNotify);
    },
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
    flashMessage: function () {
      let messages = this.$store.state.flashMessage.messages;
      console.log(messages);
      if (messages.length > 0) {
        this.setSnacTrue();
        if (
          messages.indexOf("ログインの有効期限切れです．") != -1 &&
          this.$route.path != "/sign-in"
        ) {
          console.log("ok");
          this.$router.replace({
            path: "/sign-in",
            query: { next: this.$route.path },
          });
        }
      } else this.setSnacFalse();
      return this.$store.state.flashMessage;
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
};
</script>
