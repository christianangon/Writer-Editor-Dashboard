<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-12-08 13:04:50
 * @LastEditTime: 2023-12-09 09:45:11
 * @LastEditors: Ian
-->
<template>
  <div
    class="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
    style="border-radius: 1rem; background: #f2c94c"
  >
    <div>
      <div class="text-black-100 font-medium text-xl mt-2 mb-3">
        {{
          roles === "Editor"
            ? "In the editor hands, words transform. Each edit is a brushstroke, refining stories into timeless art. Embrace the power of precision, for in every edit lies the alchemy that turns sentences into echoes that linger in the hearts of readers."
            : "Ready to dive into a creating of fascinating articles?"
        }}
      </div>
      <div class="text-black font-medium text-5xl">
        Your daily dose of inspiration starts here!
      </div>
    </div>
    <div class="mt-4 mr-auto md:mt-0 md:mr-0" v-if="roles !== 'Editor'">
      <a
        class="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised"
        @click="handleCreateArticle"
      >
        Write new post
      </a>
    </div>
    <CreateArticleForm ref="CreateArticleForm" />
  </div>
</template>

<script>
import { ref } from "vue";
import CreateArticleForm from "./createArticleForm.vue";
import store from "../../../store/index";
export default {
  name: "CreateArticle",
  components: {
    CreateArticleForm,
  },
  computed: {
    roles() {
      return store.state.auth.roles;
    },
  },
  methods: {
    handleCreateArticle() {
      this.$refs.CreateArticleForm.visible = true;
      this.$refs.CreateArticleForm.mode = "add";
    },
  },
};
</script>

<style lang="scss" scoped></style>
