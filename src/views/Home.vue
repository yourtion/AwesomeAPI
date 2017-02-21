<template>
  <el-row justify="center">
    <el-col class="nav">
      <navbar></navbar>
    </el-col>
    <el-col>
      <el-row type="flex" justify="center">
        <el-col :md="24" :lg="22">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import NavBar from 'components/NavBar.vue';
  export default {
    components: {
      'navbar': NavBar,
    },
  };
</script>
<style scoped>
</style>
