import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";

Vue.use(Vuex);

const authModule = {
  namespaced: true,
  state: {
    name: "",
    email: "",
    isLoggedIn: false,
  },
  mutations: {
    set(state, payload) {
      state.name = payload.user.name;
      state.email = payload.user.email;
      state.isLoggedIn = true;
    },
    reset(state) {
      state.username = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
  actions: {
    signup(context, payload) {
      return api({
        method: "post",
        url: "/users/",
        data: {
          user: {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
          },
        },
      });
    },
    renew(context) {
      return api({
        method: "get",
        url: "/me/",
      }).then((response) => {
        context.commit("set", { user: response.data });
        return response;
      });
    },
    signin(context, payload) {
      return api({
        method: "post",
        url: "/signin",
        data: {
          session: {
            email: payload.email,
            password: payload.password,
          },
        },
      })
        .then((response) => {
          localStorage.setItem("access", response.data.access);
          return context.dispatch("renew");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signout(context) {
      localStorage.removeItem("access");
      context.commit("reset");
    },
  },
};

const flashMessageModule = {
  namespaced: true,
  state: {
    messages: [],
    color: "",
  },
  mutations: {
    set(state, payload) {
      if (payload.error) {
        state.messages = payload.error;
        state.color = "error";
      } else if (payload.warning) {
        state.messages = payload.warning;
        state.color = "warning";
      } else if (payload.success) {
        state.messages = payload.success;
        state.color = "success";
      }
    },
    clear(state) {
      state.messages = [];
      state.color = "";
    },
  },
  actions: {
    setErrorMessage(context, payload) {
      context.commit("clear");
      console.log("actions");
      console.log(payload.message);
      context.commit("set", { error: payload.messages });
    },
    setWarningMessages(context, payload) {
      context.commit("clear");
      context.commit("set", { warning: payload.messages });
    },
    setSuccessMessage(context, payload) {
      context.commit("clear");
      context.commit("set", { success: payload.messages });
    },
    clearMessages(context) {
      context.commit("clear");
    },
  },
};

const gakutikaModule = {
  namespaced: true,
  state: {
    gakutikas: [],
    sortProp: "id",
    reverseFlag: true,
    gakutika: null,
  },
  getters: {
    getGakutikasSorted(state) {
      let sortedGakutikas = state.gakutikas
        .slice()
        .sort((a, b) => (a[state.sortProp] < b[state.sortProp] ? -1 : 1));
      if (state.reverseFlag) return sortedGakutikas.reverse();
      else return sortedGakutikas;
    },
  },
  mutations: {
    set(state, payload) {
      state.gakutikas = payload.gakutikas;
    },
    setGakutika(state, payload) {
      state.gakutika = payload.gakutika;
    },
    clear(state) {
      state.gakutiaks = [];
    },
    setSortPropAndReverseFlag(state, payload) {
      state.sortProp = payload.sortProp;
      state.reverseFlag = payload.reverseFlag;
    },
    pushNewGakutika(state, payload) {
      state.gakutikas.push(payload.newGakutika);
    },
  },
  actions: {
    fetchGakutikaList(context) {
      return api({
        method: "get",
        url: "/gakutikas",
      }).then((response) => {
        console.log(response.data);
        return context.commit("set", { gakutikas: response.data });
      });
    },
    fetchGakutika(context, payload) {
      return api({
        method: "get",
        url: "/gakutikas/" + payload.id,
      }).then((response) => {
        console.log(response);
        return context.commit("setGakutika", { gakutika: response.data });
      });
    },
    setGakutikaList(context, payload) {
      return context.commit("set", { gakutikas: payload.sortedGakutikas });
    },
    setSortPropAndReverseFlag(context, payload) {
      return context.commit("setSortPropAndReverseFlag", {
        sortProp: payload.sortProp,
        reverseFlag: payload.reverseFlag,
      });
    },
    updateToughRank(context, payload) {
      return api({
        method: "post",
        url: "/update-tough-rank",
        data: {
          id_and_new_tough_rank: payload.id_and_new_tough_rank,
        },
      }).then((response) => {
        return context.commit("set", { gakutikas: response.data });
      });
    },
    createGakutika(context, payload) {
      return api({
        method: "post",
        url: "/gakutikas",
        data: {
          gakutika: {
            title: payload.title,
            content: payload.content,
            start_month: payload.startMonth,
            end_month: payload.endMonth,
            tough_rank: 0,
          },
        },
      }).then((response) => {
        console.log(response.data);
        return context.commit("pushNewGakutika", {
          newGakutika: response.data,
        });
      });
    },
  },
};

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    flashMessage: flashMessageModule,
    gakutikas: gakutikaModule,
  },
});

export default store;
