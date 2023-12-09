/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-12-08 08:06:24
 * @LastEditTime: 2023-12-08 10:55:57
 * @LastEditors: Ian
 */
import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "@/layout/AppLayout.vue";
import store from "../store/index.js";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("../views/login/index.vue"),
          // This guard checks if the user is authenticated and redirects accordingly
          beforeEnter: (to, from, next) => {
            if (store.state.auth.token) {
              // User is authenticated, redirect to home
              next({ name: "home" });
            } else {
              // User is not authenticated, allow access to login
              next();
            }
          },
        },
        {
          path: "/",
          name: "home",
          component: () => import("../views/dashboard/index.vue"),
          // This guard checks if the user is not authenticated and redirects to login
          beforeEnter: (to, from, next) => {
            if (!store.state.auth.token) {
              // User is not authenticated, redirect to login
              next({ name: "login" });
            } else {
              // User is authenticated, allow access to home
              next();
            }
          },
        },
      ],
    },
  ],
});

export default router;
