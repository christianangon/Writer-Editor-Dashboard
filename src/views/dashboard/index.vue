<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-12-08 08:06:24
 * @LastEditTime: 2023-12-09 09:19:49
 * @LastEditors: Ian
-->
<script>
import { onMounted, reactive, ref, watch } from "vue";
import CreateArticle from "./components/createArticle.vue";
import createCompanyUser from "./components/createCompanyUser.vue";
import ArticleForEdit from "./components/ArticleForEdit.vue";
import ArticlePublished from "./components/ArticlePublished.vue";
import AllMedia from "./components/AllMedia.vue";
import { getArticle } from "../../api/article/index";
import store from "../../store/index";
export default {
  name: "Dashboard",
  components: {
    CreateArticle,
    createCompanyUser,
    ArticleForEdit,
    ArticlePublished,
    AllMedia,
  },
  computed: {
    roles() {
      return store.state.auth.roles;
    },
  },
  data() {
    return {
      articles: [],
      articlesPublished: [],
      articlesForEdit: [],
    };
  },
  methods: {
    handleGetArticle() {
      getArticle().then((res) => {
        this.articles = res.data;
        this.articlesPublished = res.data.filter(
          (i) => i.status === "Published"
        );
        this.articlesForEdit = res.data.filter((i) => i.status === "For Edit");
      });
    },
  },
  mounted() {
    this.handleGetArticle();
  },
};
</script>

<template>
  <div class="grid">
    <div :class="roles !== 'Writer' ? 'col-12 xl:col-9' : 'col-12 xl:col-12'">
      <CreateArticle />
    </div>
    <div class="col-12 lg:col-12 xl:col-3" v-if="roles !== 'Writer'">
      <createCompanyUser />
    </div>
    <div class="col-12 xl:col-6">
      <ArticleForEdit :articlesForEdit="articlesForEdit" />
    </div>
    <div class="col-12 xl:col-6">
      <ArticlePublished :articlesPublished="articlesPublished" />
    </div>
    <div class="col-12 xl:col-12">
      <AllMedia :articles="articles" />
    </div>
  </div>
</template>
