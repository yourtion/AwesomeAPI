<template>
 <div v-loading.body="loading">
 <h2> {{ group_name }}</h2>
 <h3>项目：{{ $route.params.project }} 文件：{{ $route.params.file }}</h3>
 <div>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item v-for="item in content.apis" :name="item.title">
    <template slot="title">
      <el-tag type="primary">{{ item. method }}</el-tag> {{ item.url }} - {{ item.title }}
    </template>
      <api-content :item="item"></api-content>
    </el-collapse-item>
  </el-collapse>
 </div>
 </div>
</template>
<script>
import ApiContent from 'components/ApiContent.vue';
export default {
  components: {
    'api-content': ApiContent,
  },
  watch: {
    '$route'(to) {
      this.params = to.params;
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      loading: true,
      activeName: '',
      params: this.$route.params,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$store.dispatch('getApiIndex', this.params);
      this.$store.dispatch('getApiFile', this.params).then(() => { this.loading = false; });
    },
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
