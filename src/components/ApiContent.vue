<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-form ref="form" :model="form" :rules="rules">
        <el-table :data="item.params" style="width: 100%">
          <el-table-column prop="name" label="参数" width="180"> </el-table-column>
          <el-table-column label="内容" width="400"> 
            <template scope="scope">
              <el-form-item :prop="scope.row.name">
                <el-input v-model="form[scope.row.name]" size="small" :placeholder="scope.row.name"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="150"> </el-table-column>
          <el-table-column label="必填" width="100"> 
            <template scope="scope">{{ scope.row.required ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
        </el-table>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">测试API</el-button>
        </el-form-item>
      </el-form>
      <pre> {{ result }} </pre>
    </el-col>
    <el-col :span="8"><pre> {{ item.result }} </pre></el-col>
  </el-row>
</template>
<script>
export default {
  props: [ 'item' ],
  data() {
    return {
      form: this.getForm(),
      rules: this.getRules(),
      result: {},
    };
  },
  methods: {
    getForm() {
      const res = {};
      for(const item of this.item.params) {
        res[item.name] = '';
      }
      return res;
    },
    getRules() {
      const res = {};
      for(const item of this.item.params) {
        res[item.name] = [{ required: item.required, message: `请输入 ${ item.name }`, trigger: 'blur' }];
      }
      return res;
    },
    onSubmit() {
      const req = {
        baseUrl: this.$store.state.projectInfo.baseUrl,
        url: this.item.url,
        method: this.item.method,
        params: this.form,
      };
      this.$store.dispatch('request', req).then((data) => { this.result = data;this.loading = false; });
      console.log(this.form);
    },
  },
};
</script>
<style>
</style>
