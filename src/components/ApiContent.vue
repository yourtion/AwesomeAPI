<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-form ref="form" :show-message="false" :model="form" :rules="rules">
        <el-table :data="item.params" style="width: 100%">
          <el-table-column prop="name" label="参数" width="180"> </el-table-column>
          <el-table-column label="内容" width="400"> 
            <template scope="scope">
              <el-form-item :prop="scope.row.name" class="form-item">
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
        <el-form-item class="form-action">
          <el-button @click="resetForm()">重置</el-button>
          <el-button v-if="item.sign" type="info" @click="sign()">生成签名</el-button>
          <el-button type="primary" @click="onSubmit" :loading="loading">测试API</el-button>
        </el-form-item>
      </el-form>
      <div v-if="result">
        <el-tooltip placement="right">
          <div slot="content"><pre> {{ result }} </pre></div>
          <el-button>返回结果<i class="el-icon-information el-icon--right"></i></el-button>
        </el-tooltip>
        <pre class="result"> {{ result.data }} </pre>
      </div>
    </el-col>
    <el-col :span="8"><h3>结果示例：</h3><pre class="result"> {{ item.result }} </pre></el-col>
  </el-row>
</template>
<script>
import qs from 'querystring';
import md5 from 'md5';
export default {
  props: [ 'item' ],
  data() {
    return {
      loading: false,
      form: this.getForm(),
      rules: this.getRules(),
      result: '',
    };
  },
  methods: {
    getForm() {
      const res = {};
      for(const item of this.item.params) {
        res[item.name] = '';
        if(item.name === 'timestamp') {
          res[item.name] = Math.round(new Date().getTime() / 1000);
        }
        if(item.name === 'noncestr'){
          res[item.name] = Math.random().toString(36).substr(2, 15);
        }
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
    resetForm() {
      this.form = this.getForm();
    },
    sign() {
      const paramsKey = [];
      for(const item of this.item.params) {
        paramsKey.push(item.name);
      }
      const paramsKeySorted = paramsKey.sort();
      const paramsSorted = {};
      for(const key of paramsKeySorted) {
        const value = this.form[key];
        if(key !== 'signature' && value) {
          paramsSorted[key] = value;
        }
      }
      const signString = qs.stringify(paramsSorted) + `:ssss`;
      this.form.signature = md5(signString);
    },
    onSubmit() {
      this.result = '';
      this.loading = true;
      const req = {
        baseUrl: this.$store.state.projectInfo.baseUrl,
        url: this.item.url,
        method: this.item.method,
        params: this.form,
      };
      this.$store.dispatch('request', req)
      .then((data) => {
        this.result = data;
        this.loading = false;
      })
      .catch((err) => {
        const msg = err.message || '请求出错';
        this.$message.error(msg);
      });
      console.log(this.form);
    },
  },
};
</script>

<style scoped>
.result {
  background: #EEE;
  padding: 10px;
}
.el-table .form-item {
  margin: 3px;
}
.form-action {
  margin-top: 8px;
}
</style>
