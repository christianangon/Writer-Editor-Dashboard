<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-12-08 15:55:44
 * @LastEditTime: 2023-12-09 09:28:27
 * @LastEditors: Ian
-->
<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Create new user"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @update:visible="handleDialogClose"
  >
    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-6">
        <label for="username">Username</label>
        <InputText
          id="username"
          type="text"
          v-model="form.username"
          :class="!form.username ? 'p-invalid' : ''"
        />
        <small v-if="!form.username" class="p-error"
          >Username is required.</small
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="password">Password</label>
        <InputText
          id="password"
          type="password"
          v-model="form.password"
          :class="!form.password ? 'p-invalid' : ''"
        />
        <small v-if="!form.password" class="p-error"
          >Password is required.</small
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="firstname">First Name</label>
        <InputText
          id="firstname"
          type="text"
          v-model="form.firstname"
          :class="!form.firstname ? 'p-invalid' : ''"
        />
        <small v-if="!form.firstname" class="p-error"
          >First Name is required.</small
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="lastname">Last Name</label>
        <InputText
          id="lastname"
          type="text"
          v-model="form.lastname"
          :class="!form.lastname ? 'p-invalid' : ''"
        />
        <small v-if="!form.lastname" class="p-error"
          >Last name is required.</small
        >
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
      <div class="field col-12 md:col-6">
        <label for="type">Type</label>
        <Dropdown
          id="state"
          v-model="form.type"
          :options="typeOptions"
          optionValue="name"
          optionLabel="name"
          placeholder="Select One"
          :class="!form.type ? 'p-invalid' : ''"
        ></Dropdown>
        <small v-if="!form.type" class="p-error">Type is required.</small>
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
        username: null,
        password: null,
        firstname: null,
        lastname: null,
        type: null,
        status: null,
      },
      statusOptions: [
        { id: 1, name: "Active" },
        { id: 2, name: "Inactive" },
      ],
      typeOptions: [
        { id: 1, name: "Writer" },
        { id: 2, name: "Editor" },
      ],
    };
  },
  methods: {
    handleSubmit() {
      if (
        !this.form.username ||
        !this.form.password ||
        !this.form.firstname ||
        !this.form.lastname ||
        !this.form.type ||
        !this.form.status
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
          username: null,
          password: null,
          firstname: null,
          lastname: null,
          type: null,
          status: null,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
