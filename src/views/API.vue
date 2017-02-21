<template>
 <div>
 <h2> {{ group_name }}</h2>
 <h3>项目：{{ $route.params.project }} 文件：{{ $route.params.file }}</h3>
 <div>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item v-for="item in content.apis" :name="item.title">
    <template slot="title">
      <el-tag type="primary">{{ item. method }}</el-tag> {{ item.url }} - {{ item.title }}
    </template>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-table :data="item.params" style="width: 100%">
            <el-table-column prop="name" label="参数明" width="180"> </el-table-column>
            <el-table-column label="内容" width="400"> 
              <template scope="scope"><el-input size="small" :placeholder="scope.row.name"></el-input></template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="150"> </el-table-column>
            <el-table-column label="必填" width="100"> 
              <template scope="scope">{{ scope.row.required ? '是' : '否' }}</template>
            </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="8"><pre> {{ item.result }} </pre></el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
 </div>
 </div>
</template>
<script>
  export default {
    created() {
      this.loading = true;
      this.$store.dispatch('getApiFile', this.$route.params).then(() => { this.loading = false; });
    },
    data() {
      return {
        loading: true,
        activeName: '',
      };
    },
    computed: {
      content() {
        return this.$store.state.content;
      },
      group_name() {
        return this.$store.state.content.group;
      },
    },
  };
</script>
<style>
  .index {
    margin-top: 20px;
  }
</style>
