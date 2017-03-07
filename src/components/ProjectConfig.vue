<template>
<el-dialog :title="project + '项目配置'" v-model="show" @close="close">
  <el-form label-width="100px" class="demo-ruleForm">
    <el-form-item label="全局变量">
      <el-input type="textarea" v-model="tempGlobal"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
  props: [ 'project', 'show' ],
  data() {
    return {
      tempGlobal: this.configGlobal,
    };
  },
  computed: {
    configGlobal: {
      get() {
        const val = this.configObj.global || {};
        return JSON.stringify(val);
      },
      set(value) {
        this.configObj.global = JSON.parse(value);
      },
    },
    configObj() {
      return this.$store.state.projectConfig[this.project] || {};
    },
  },
  methods: {
    submit() {
      this.close();
    },
    close() {
      this.$emit('closeDialog');
    },
  },
};
</script>
<style scoped>

</style>
