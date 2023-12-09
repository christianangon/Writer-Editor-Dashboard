<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-08-03 10:23:41
 * @LastEditTime: 2023-12-08 11:18:05
 * @LastEditors: Ian
-->
<script>
import AppTopbar from "./AppTopbar.vue";
import AppFooter from "./AppFooter.vue";
import { ref, computed, watch, inject } from "vue";
import store from "../store";
import AppLoading from "../components/loading/index.vue";
import GlobalToast from "../components/global-toast/index.vue";
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
    AppLoading,
    GlobalToast,
  },
};
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <div class="layout-main-container">
      <app-topbar></app-topbar>
      <AppLoading />
      <GlobalToast />
      <div>
        <div class="layout-main">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- <app-footer></app-footer> -->
    <div class="layout-mask"></div>
  </div>
</template>

<style lang="scss" scoped></style>
