<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-12-08 17:21:57
 * @LastEditTime: 2023-12-08 23:55:13
 * @LastEditors: Ian
-->
<template>
  <div>
    <DataTable :value="articlesForEdit" tableStyle="min-width: 50rem">
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">Articles(For Edit)</span>
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
            type="button"
            icon="pi pi-file-edit"
            text
            @click="handleEdit(slotProps.data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are
        {{ articlesForEdit ? articlesForEdit.length : 0 }} articles.
      </template>
    </DataTable>
    <CreateArticleForm ref="CreateArticleForm" />
  </div>
</template>

<script>
import CreateArticleForm from "../components/createArticleForm.vue";
export default {
  props: ["articlesForEdit"],
  components: { CreateArticleForm },
  methods: {
    handleEdit(data) {
      this.$refs.CreateArticleForm.visible = true;
      this.$refs.CreateArticleForm.mode = "edit";
      this.$refs.CreateArticleForm.editData = data;
    },
  },
};
</script>
