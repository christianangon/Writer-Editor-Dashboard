<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-12-08 15:55:44
 * @LastEditTime: 2023-12-09 09:28:52
 * @LastEditors: Ian
-->
<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Create company"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @update:visible="handleDialogClose"
  >
    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-6">
        <label for="name">Name</label>
        <InputText
          id="name"
          type="text"
          v-model="form.name"
          :class="!form.name ? 'p-invalid' : ''"
        />
        <small v-if="!form.name" class="p-error">Name is required.</small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="status">Status</label>
        <Dropdown
          id="state"
          v-model="form.status"
          optionValue="name"
          :options="statusOptions"
          optionLabel="name"
          placeholder="Select One"
          :class="!form.status ? 'p-invalid' : ''"
        ></Dropdown>
        <small v-if="!form.status" class="p-error">Status is required.</small>
      </div>
      <div class="field col-12 md:col-12">
        <label for="name">Logo</label>
        <FileUpload
          mode="basic"
          name="demo[]"
          url="/api/upload"
          accept="image/*"
          customUpload
          @uploader="customBase64Uploader"
        />
      </div>

      <Button
        label="Create"
        @click="handleSubmit"
        class="p-3 w-full border-1 mx-3"
      ></Button>
    </div>
  </Dialog>
</template>

<script>
import { createUser } from "../../api/user/auth";
export default {
  name: "CreateCompany",
  data() {
    return {
      visible: false,
      form: {
        name: null,
        logo: null,
        status: null,
      },
      statusOptions: [
        { id: 1, name: "Active" },
        { id: 2, name: "Inactive" },
      ],
    };
  },
  methods: {
    handleSubmit() {
      if (!this.form.name || !this.form.logo || !this.form.status) {
        // Show a toast indicating the missing fields
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all fields.",
          life: 3000,
        });
        return; // Do not proceed with form submission
      }
      createUser(this.form).then((res) => {
        console.log("res", res);
        this.handleDialogClose();
      });
      console.log("form", this.form);
    },
    handleDialogClose(newValue) {
      // This method will be called when the dialog is closed
      if (!newValue) {
        // Reset the form when the dialog is closed
        this.form = {
          name: null,
          logo: null,
          status: null,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
