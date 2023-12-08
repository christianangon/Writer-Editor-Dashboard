/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-08-03 10:23:42
 * @LastEditTime: 2023-12-07 23:43:57
 * @LastEditors: Ian
 */
import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "@/layout/AppLayout.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/dashboard/index.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("../views/login/index.vue"),
        },
      ],
    },
  ],
});

export default router;
