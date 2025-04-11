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

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");

//   const istokenExpired = token ? isExpired(token) : true;

//   if (to.path !== "/" && !token ) {
//     localStorage.removeItem("token"); // 清除过期或不存在的 token
//     next("/"); // token 为空，重定向到登录页
//   } else if (to.path === "/" && token) {
//     next("/home"); // 已登录还访问登录页，重定向到首页
//   } else {
//     next(); // 放行
//   }
// });

// function isExpired(token) {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     const currentTime = Math.floor(Date.now() / 1000);
//     return payload.exp < currentTime;
//   } catch (e) {
//     console.error("Token parsing error:", e);
//     return true; // 如果解析失败，视为过期
//   }
// }

export default router;
