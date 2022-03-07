<template>
  <nav>
    <v-snackbar v-model="snac" top :color="flashMessage.color">
      <div v-for="message in flashMessage.messages" :key="message">
        {{ message }}
      </div>
    </v-snackbar>
    <Appbar @handle-drawer="drawerChange" />
  </nav>
</template>
<script>
import Appbar from "@/components/organisms/Appbar";

export default {
  name: "Navbar",
  data() {
    return {
      snac: true,
      drawerNotify: false,
    };
  },
  components: {
    Appbar,
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
  },
};
</script>
