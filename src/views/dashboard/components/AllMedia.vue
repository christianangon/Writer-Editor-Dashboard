<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>DataView</h5>
        <DataView
          :value="articles"
          :layout="layout"
          :paginator="true"
          :rows="9"
        >
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-6 text-right">
                <DataViewLayoutOptions v-model="layout" />
              </div>
            </div>
          </template>
          <template #list="slotProps">
            <div class="col-12">
              <div
                class="flex flex-column md:flex-row align-items-center p-3 w-full"
              >
                <img
                  :src="slotProps.data.image"
                  :alt="slotProps.data.name"
                  class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                />
                <div class="flex-1 text-center md:text-left">
                  <div class="font-bold text-2xl">
                    {{ slotProps.data.title }}
                  </div>
                  <div class="mb-3">{{ slotProps.data.link }}</div>
                  <div class="flex align-items-center">
                    <i class="pi pi-user mr-2"></i>
                    <span class="font-semibold"
                      >Writer: {{ slotProps.data.writer }}</span
                    >
                  </div>
                  <div class="flex align-items-center">
                    <i class="pi pi-user mr-2"></i>
                    <span class="font-semibold"
                      >Editor: {{ slotProps.data.editor }}
                    </span>
                  </div>
                </div>
                <div
                  class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0"
                >
                  <span class="text-2xl font-semibold">{{
                    slotProps.data.status
                  }}</span>
                  <Button
                    icon="pi pi-file-edit"
                    label="Edit"
                    @click="handleEdit(slotProps.data)"
                    class="mb-2"
                  ></Button>
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="col-12 md:col-4">
              <div class="card m-3 border-1 surface-border">
                <div class="flex align-items-center justify-content-between">
                  <div class="flex align-items-center">
                    <i class="pi pi-user mr-2"></i>
                    <span class="font-semibold"
                      >Writer: {{ slotProps.data.writer }}</span
                    >
                  </div>
                  <div class="flex align-items-center">
                    <i class="pi pi-user mr-2"></i>
                    <span class="font-semibold"
                      >Editor: {{ slotProps.data.editor }}</span
                    >
                  </div>
                </div>
                <div class="text-center">
                  <img
                    :src="slotProps.data.image"
                    :alt="slotProps.data.name"
                    class="w-9 shadow-2 my-3 mx-0"
                  />
                  <div class="text-2xl font-bold">
                    {{ slotProps.data.title }}
                  </div>
                  <div class="mb-3">{{ slotProps.data.link }}</div>
                </div>
                <div class="flex align-items-center justify-content-between">
                  <span class="text-2xl font-semibold">{{
                    slotProps.data.status
                  }}</span>
                  <Button
                    icon="pi pi-file-edit"
                    @click="handleEdit(slotProps.data)"
                  ></Button>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
    <CreateArticleForm ref="CreateArticleForm" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import { getArticle } from "../../../api/article/index";
import CreateArticleForm from "../components/createArticleForm.vue";
export default {
  components: { CreateArticleForm },
  methods: {
    handleEdit(data) {
      console.log("data", data);
      this.$refs.CreateArticleForm.visible = true;
      this.$refs.CreateArticleForm.mode = "edit";
      this.$refs.CreateArticleForm.editData = data;
    },
  },
  setup() {
    onMounted(() => {
      handleGetArticle();
    });

    const handleGetArticle = () => {
      getArticle().then((res) => {
        articles.value = res.data;
        console.log("res", res);
      });
    };

    const articles = ref();
    const layout = ref("grid");

    return {
      articles,
      layout,
      handleGetArticle,
    };
  },
};
</script>
