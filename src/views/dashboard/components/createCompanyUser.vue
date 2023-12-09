<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-12-08 13:05:28
 * @LastEditTime: 2023-12-09 10:25:00
 * @LastEditors: Ian
-->
<template>
  <div class="flex flex-column">
    <Button
      label="Create new user"
      icon="pi pi-plus"
      severity="help"
      @click="handleCreateCompany"
      class="flex align-items-center justify-content-center h-4rem font-bold border-round mb-3"
    />
    <Button
      label="Create company"
      icon="pi pi-plus"
      severity="help"
      @click="handleCreateCompany"
      class="flex align-items-center justify-content-center h-5rem font-bold border-round"
    />
    <CreateUser ref="CreateUser" />
    <CreateCompany ref="CreateCompany" />
  </div>
</template>

<script>
import CreateUser from "../../../components/create-user/index.vue";
import CreateCompany from "../../../components/create-company/index.vue";
export default {
  name: "CreateCompanyUserHome",
  components: { CreateUser, CreateCompany },
  methods: {
    handleCreateUser() {
      this.$refs.CreateUser.visible = true;
    },
    handleCreateCompany() {
      this.$refs.CreateCompany.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
