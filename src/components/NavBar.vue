<template>
  <el-menu router theme="dark" default-active="1" mode="horizontal">
    <el-menu-item index="/home">API管理系统 - {{ project }}</el-menu-item>
    <el-menu-item v-for="item in list" :index="`/api/${project}/${item}`" :key="`${project}_${item}`">{{ item }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  computed: {
    project() {
      return this.$store.state.project;
    },
    list() {
      return this.$store.getters.navItem;
    },
  },
};
</script>

<style scoped>
</style>
