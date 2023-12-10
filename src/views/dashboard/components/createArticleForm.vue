<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-12-08 13:49:57
 * @LastEditTime: 2023-12-10 15:48:32
 * @LastEditors: Ian
-->
<template>
  <Dialog
    v-model:visible="visible"
    maximizable
    modal
    :header="dialogTitle"
    :style="{ width: '60vw' }"
    :breakpoints="{ '1199px': '90vw', '575px': '90vw' }"
    @update:visible="handleDialogClose"
  >
    <div class="card">
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-6">
          <label for="title">Title</label>
          <InputText
            id="title"
            type="text"
            v-model="form.title"
            :class="{ 'p-invalid': !form.title }"
          />
          <small v-if="!form.title" class="p-error">Title is required.</small>
        </div>
        <div class="field col-12 md:col-6">
          <label for="title">Link</label>
          <InputText
            id="link"
            type="text"
            v-model="form.link"
            :class="{ 'p-invalid': !form.link }"
          />
          <small v-if="!form.link" class="p-error">Link is required.</small>
        </div>
        <div class="field col-12 md:col-6">
          <label for="date">Date</label>
          <Calendar v-model="form.date" :class="{ 'p-invalid': !form.date }" />
          <small v-if="!form.date" class="p-error">Date is required.</small>
        </div>
        <div class="field col-12 md:col-6">
          <label for="state">Company</label>
          <Dropdown
            id="state"
            v-model="form.company"
            :options="companyOptions"
            optionLabel="name"
            placeholder="Select One"
            :class="{ 'p-invalid': !form.company }"
          ></Dropdown>
          <small v-if="!form.company" class="p-error"
            >Company is required.</small
          >
        </div>
        <div class="field col-12 md:col-12">
          <label for="city">Image</label>
          <FileUpload
            ref="fileUpload"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            @uploader="handleImageUpload"
          >
            <template #empty>
              <p>Drag and drop files to here to upload.</p>
            </template>
          </FileUpload>
        </div>
        <div class="field col-12 md:col-12">
          <!-- <editor-content :editor="form.content" /> -->
          <QuillEditor
            theme="snow"
            v-model:content="form.content"
            content-type="html"
          />
        </div>
        <div class="flex flex-wrap w-full justify-content-end mt-7">
          <Button
            v-if="mode === 'add'"
            label="Create"
            @click="handleCreate"
            :class="
              roles === 'Writer' ? 'p-3 w-4 border-1' : 'p-3 w-2 border-1 mr-5'
            "
          ></Button>
          <Button
            v-if="mode === 'edit'"
            label="Save"
            severity="success"
            @click="handleSave"
            :class="
              roles === 'Writer' ? 'p-3 w-4 border-1' : 'p-3 w-2 border-1 mr-5'
            "
          ></Button>
          <Button
            v-if="isPublished"
            label="Published"
            severity="danger"
            @click="handlePublished"
            class="p-3 w-2 border-1"
          ></Button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { getCompany } from "../../../api/company/index";
import store from "../../../store/index";
import { QuillEditor } from "@vueup/vue-quill";
import { createArticle, updateArticle } from "../../../api/article/index";
export default {
  components: { QuillEditor },
  data() {
    return {
      visible: false,
      mode: "",
      editData: {},
      dialogTitle: "",
      companyOptions: [],
      form: {
        title: null,
        link: null,
        date: null,
        image: null,
        company: null,
        content: null,
      },
    };
  },
  computed: {
    roles() {
      return store.state.auth.roles;
    },
    infos() {
      return store.state.auth.info;
    },
    isPublished() {
      if (this.roles !== "Writer") {
        if (this.editData) {
          if (this.editData.status === "For Edit") {
            if (this.mode === "add") {
              return false;
            } else {
              return true;
            }
          }
        }
      }
      return false;
    },
  },
  watch: {
    mode(newValue, oldValue) {
      if (newValue === "add") {
        this.dialogTitle = "Add Article";
        console.log("das", this.formatDate(new Date()));
        this.form.date = this.formatDate(new Date());
      }
      if (newValue === "edit") {
        if (this.editData) {
          this.form.title = this.editData.title;
          this.form.link = this.editData.link;
          this.form.date = this.editData.date;
          this.form.image = this.editData.image;
          this.form.company = this.editData.company;
          this.form.content = this.editData.content;
          if (this.editData.status === "Published") {
            this.dialogTitle = "Edit Article(Published)";
          } else {
            this.dialogTitle = "Edit Article(For Edit)";
          }
        }
      }
    },
  },
  mounted() {
    this.getCompanyAll();
  },
  methods: {
    getCompanyAll() {
      getCompany().then((res) => {
        console.log("res", res.data);
        this.companyOptions = res.data;
      });
    },
    handleImageUpload(event) {
      const file = event.files && event.files[0];
      console.log("event", event);
      if (file) {
        // Assuming you want to store the image data in the form
        this.form.image = file.name;
      }
    },
    handleCreate() {
      if (
        !this.form.title ||
        !this.form.link ||
        !this.form.date ||
        !this.form.company ||
        !this.form.content
      ) {
        // Show a toast indicating the missing fields
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all fields.",
          life: 3000,
        });
        return; // Do not proceed with form submission
      }
      let params = {
        ...this.form,
        writer: this.infos,
      };
      createArticle(params).then((res) => {
        console.log("res", res);
        this.handleDialogClose();
      });
      console.log("form", params);
    },
    handleSave() {
      if (
        !this.form.title ||
        !this.form.link ||
        !this.form.date ||
        !this.form.company ||
        !this.form.content
      ) {
        // Show a toast indicating the missing fields
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all fields.",
          life: 3000,
        });
        return; // Do not proceed with form submission
      }
      let params = {
        ...this.form,
        id: this.editData.id,
        writer: this.editData.writer,
        editor: this.editData.editor ? this.editData.editor : null,
      };
      updateArticle(params).then((res) => {
        console.log("res", res);
        this.handleDialogClose();
      });
      console.log("form", params);
    },
    handlePublished() {
      if (
        !this.form.title ||
        !this.form.link ||
        !this.form.date ||
        !this.form.company ||
        !this.form.content
      ) {
        // Show a toast indicating the missing fields
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all fields.",
          life: 3000,
        });
        return; // Do not proceed with form submission
      }
      let params = {
        id: this.editData.id,
        ...this.form,
        status: "Published",
        writer: this.editData.writer,
        editor: this.infos,
      };
      updateArticle(params).then((res) => {
        console.log("res", res);
        this.handleDialogClose();
      });
      console.log("form", params);
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    handleDialogClose(newValue) {
      this.mode = "";
      // This method will be called when the dialog is closed
      if (!newValue) {
        // Reset the form when the dialog is closed
        this.editData = {};
        this.form = {
          title: null,
          link: null,
          date: this.mode === "add" ? this.formatDate(new Date()) : null,
          image: null,
          company: null,
          content: null,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
