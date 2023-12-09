<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-12-08 17:21:57
 * @LastEditTime: 2023-12-09 14:30:35
 * @LastEditors: Ian
-->
<template>
  <div>
    <DataTable :value="articlesPublished" tableStyle="min-width: 50rem">
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">Articles(Published)</span>
        </div>
      </template>
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="`${slotProps.data.image}`"
            :alt="slotProps.data.image"
            class="w-6rem shadow-2 border-round"
          />
        </template>
      </Column>
      <Column field="title" header="Title">
        <template #body="slotProps">
          {{ slotProps.data.title }}
        </template>
      </Column>
      <Column field="link" header="Link"></Column>
      <Column header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.status" />
        </template>
      </Column>
      <Column field="editor" header="Editor"></Column>
      <Column field="writer" header="Writer"></Column>
      <Column style="flex: 0 0 4rem" header="Action">
        <template #body="slotProps">
          <Button
            v-if="roles !== 'Writer'"
            type="button"
            icon="pi pi-file-edit"
            text
            @click="handleEdit(slotProps.data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are
        {{ articlesPublished ? articlesPublished.length : 0 }} articles.
      </template>
    </DataTable>
    <CreateArticleForm ref="CreateArticleForm" />
  </div>
</template>

<script>
import CreateArticleForm from "../components/createArticleForm.vue";
import store from "../../../store/index";
export default {
  props: ["articlesPublished"],
  components: { CreateArticleForm },
  computed: {
    roles() {
      return store.state.auth.roles;
    },
  },
  methods: {
    handleEdit(data) {
      console.log("data", data);
      this.$refs.CreateArticleForm.visible = true;
      this.$refs.CreateArticleForm.mode = "edit";
      this.$refs.CreateArticleForm.editData = data;
    },
  },
};
</script>
