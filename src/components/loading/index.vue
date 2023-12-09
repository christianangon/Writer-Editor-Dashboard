<!--
 * @Description: loading
 * @Author: Lewis
 * @Date: 2022-06-08 13:45:16
 * @LastEditTime: 2022-08-31 15:33:39
 * @LastEditors: Lewis
-->
<template>
  <div class="app-loading" v-if="loading">
    <ProgressSpinner />
  </div>
</template>

<script>
import ProgressSpinner from "primevue/progressspinner";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Loading",
  components: {
    ProgressSpinner,
  },
  setup() {
    const store = useStore();

    const loading = computed(() => store.state.auth.globalLoading);

    return {
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: #000000, $alpha: 0.3);
  z-index: 20000;
}
</style>
