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
      state.gakutika = {};
      state.gakutika.content = payload.gakutika.content;
      state.gakutika.endMonth = payload.gakutika.endMonth;
      state.gakutika.id = payload.gakutika.id;
      state.gakutika.startMonth = payload.gakutika.startMonth;
      state.gakutika.title = payload.gakutika.title;
      state.gakutika.toughRank = payload.gakutika.toughRank;
    },
    clear(state) {
      state.gakutikas = [];
    },
    setSortPropAndReverseFlag(state, payload) {
      state.sortProp = payload.sortProp;
      state.reverseFlag = payload.reverseFlag;
    },
    pushNewGakutika(state, payload) {
      state.gakutikas.push(payload.newGakutika);
    },
    deleteGakutika(state, payload) {
      const gakutika = state.gakutikas.find(
        (gakutika) => gakutika.id == payload.deleteGakutikaId
      );
      state.gakutikas.splice(state.gakutikas.indexOf(gakutika), 1);
    }
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
        context.commit("setGakutika", { gakutika: response.data });
        return context.dispatch(
          "questions/fetchQuestions",
          { questions: response.data.questions },
          { root: true }
        );
      });
    },
    destoryGakutika(context, payload) {
      return api({
        method: "delete",
        url: "/gakutikas/" + payload.id,
      }).then((response) => {
        console.log(response);
        console.log(context);
        return context.commit("deleteGakutika", {
          deleteGakutikaId: payload.id
        });
      })
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
            tough_rank: "0",
          },
        },
      }).then((response) => {
        console.log(response.data);
        return context.commit("pushNewGakutika", {
          newGakutika: response.data,
        });
      });
    },
    updateGakutika(context, payload) {
      return api({
        method: "patch",
        url: "/gakutikas/" + payload.id,
        data: {
          gakutika: {
            title: payload.title,
            content: payload.content,
            start_month: payload.startMonth,
            end_month: payload.endMonth,
            tough_rank: payload.toughRank,
          },
        },
      }).then((response) => {
        context.commit("setGakutika", { gakutika: response.data });
      });
    },
  },
};

const questionModule = {
  namespaced: true,
  state: {
    questions: [],
  },
  mutations: {
    setQuestions(state, payload) {
      state.questions = payload.questions;
    },
    pushQuestions(state, payload) {
      state.questions.push(payload.newQuestion);
    },
    setUpdatedQuestion(state, payload) {
      const question = state.questions.find(
        (question) => question.id == payload.updatedQuestion.id
      );
      question.query = payload.updatedQuestion.query;
      question.answer = payload.updatedQuestion.answer;
      question.day = payload.updatedQuestion.day;
      question.companyName = payload.updatedQuestion.companyName;
    },
    deleteQuestion(state, payload) {
      const question = state.questions.find(
        (question) => question.id == payload.deleteQuestionId
      );
      state.questions.splice(state.questions.indexOf(question), 1);
    }
  },
  getters: {
    getQuestionsSortedByDay(state) {
      console.log("question getters");
      return state.questions
        .slice()
        .sort((a, b) => (a["day"] < b["day"] ? -1 : 1));
    },
  },
  actions: {
    createQuestion(context, payload) {
      console.log(payload);
      return api({
        method: "post",
        url: "/questions",
        data: {
          question: {
            query: payload.query,
            answer: payload.answer,
            company_name: payload.companyName,
            day: payload.day,
            gakutika_id: payload.gakutikaId,
          },
        },
      }).then((response) => {
        console.log(response.data);
        return context.commit("pushQuestions", { newQuestion: response.data });
      });
    },
    fetchQuestions(context, payload) {
      return context.commit("setQuestions", { questions: payload.questions });
    },
    updateQuestion(context, payload) {
      console.log(payload);
      return api({
        method: "patch",
        url: "/questions/" + payload.id,
        data: {
          question: {
            query: payload.query,
            answer: payload.answer,
            company_name: payload.companyName,
            day: payload.day,
            gakutika_id: payload.gakutikaId,
          },
        },
      }).then((response) => {
        return context.commit("setUpdatedQuestion", {
          updatedQuestion: response.data,
        });
      });
    },
    destoryQuestion(context, payload) {
      return api({
        method: "delete",
        url: "/questions/" + payload.id,
      }).then((response) => {
        console.log(response);
        console.log(context);
        return context.commit("deleteQuestion", {
          deleteQuestionId: payload.id
        });
      })
    }
  },
};

const companyModule = {
  namespaced: true,
  state: {
    userAndCompanies: [],
  },
  getters: {
    getCompanies(state) {
      return state.userAndCompanies; 
    }
  },
  mutations: {
    setCompanies(state, payload) {
      state.userAndCompanies = payload.userAndCompanies;
    },
  },
  actions: {
    fetchCompanyList(context) {
      return api({
        method: "get",
        url: "/companies/",
      }).then((response) => {
        console.log(response);
        console.log(response.data);
        context.commit("setCompanies", {
          userAndCompanies: response.data,
        });
      });
    }
  }
};

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    flashMessage: flashMessageModule,
    gakutikas: gakutikaModule,
    questions: questionModule,
    companies: companyModule,
  },
});

export default store;
