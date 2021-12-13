import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/templates/HomeView";
import SignUp from "@/components/templates/SignUpView";
import SignIn from "@/components/templates/SignInView";
import CompanyList from "@/components/templates/CompanyListView";
import GakutikaAndQuestionShow from "@/components/templates/GakutikaAndQuestionShowView";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/gakutika/:id",
    name: "GakutikaAndQuestionShow",
    component: GakutikaAndQuestionShow,
    meta: { requiresAuth: true },
  },
  {
    path: "/companies",
    name: "CompanyList",
    component: CompanyList,
    meta: { requiresAuth: true },
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.auth.isLoggedIn;
  const token = localStorage.getItem("access");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      console.log("ログインする必要があります");
      if (token != null) {
        console.log("ユーザ情報を再取得します");
        store
          .dispatch("auth/renew")
          .then(() => {
            console.log("再取得できました．次へ進みます");
            next();
          })
          .catch(() => {
            forceToLoginPage(to);
          });
      } else {
        forceToLoginPage(to);
      }
    } else {
      console.log("ログイン済みなので次のページへ進みます");
      next();
    }
  } else {
    console.log("ログインが不要なので次のページへ進みます");
    next();
  }
});

function forceToLoginPage(to) {
  console.log("ログイン画面へリダイレクトします");
  router.replace({
    path: "/sign-in",
    query: { next: to.fullPath },
  });
}

export default router;
