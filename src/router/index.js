import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.path !== "/" && !token) {
    next("/"); // token 为空，重定向到登录页
  } else if (to.path === "/" && token) {
    next("/home"); // 已登录还访问登录页，重定向到首页
  } else {
    next(); // 放行
  }
});

export default router;
