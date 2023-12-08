<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-08-03 10:23:41
 * @LastEditTime: 2023-12-07 23:45:34
 * @LastEditors: Ian
-->
<script>
import AppTopbar from "./AppTopbar.vue";
import AppFooter from "./AppFooter.vue";
import Login from "../views/login/index.vue";
import { ref, computed, watch, inject } from "vue";
import store from "../store";
export default {
  name: "Home",
  setup(props, context) {
    const token = computed(() => store.state.auth.token);
    return {
      token,
    };
  },

  components: {
    AppTopbar,
    Login,
  },
};
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <div v-if="token" class="layout-main-container">
      <app-topbar></app-topbar>
      <div>
        <div class="layout-main">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Login v-if="!token"></Login>
    <!-- <app-footer></app-footer> -->
    <div class="layout-mask"></div>
  </div>
</template>

<style lang="scss" scoped></style>
