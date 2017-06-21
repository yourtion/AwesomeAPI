<template>
  <div>
    <el-menu router theme="dark" default-active="1" mode="horizontal">
      <el-menu-item index="/home">API管理系统 - {{ project }}</el-menu-item>
      <el-menu-item v-for="item in list" :index="'/api/' + project + '/' + item" :key="item">{{ item }}</el-menu-item>
      <el-button v-if="project" class="config" @click="configVisible = true">
        <i class="el-icon-setting"></i> 项目配置
      </el-button>
    </el-menu>
    <ProjectConfig :show="configVisible" :project="project" @closeDialog="configVisible = false"></ProjectConfig>
  </div>
</template>

<script>
import ProjectConfig from 'components/ProjectConfig';
export default {
  components: {
    ProjectConfig,
  },
  data() {
    return {
      configVisible: false,
    };
  },
  computed: {
    project() {
      return this.$store.state.project;
    },
    list() {
      return this.$store.getters.navItem;
    },
  },
  methods: {
    config() {
     
    },
  },
};
</script>
<style scoped>
.config {
  position: absolute;
  top: 12px;
  right: 30px;
}
</style>
