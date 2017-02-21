<template>
  <el-menu router theme="dark" default-active="1" mode="horizontal">
    <el-menu-item index="/home">API管理系统 - {{ project }}</el-menu-item>
    <el-menu-item v-for="item in list" :index="'/api/' + project + '/' + item">{{ item }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  computed: {
    project() {
      return this.$store.state.project;
    },
    list() {
      const res = [];
      for (const key in this.$store.state.projectInfo.files){
        res.push(key);
      }
      return res;
    },
  },
};
</script>

<style scoped>
</style>
