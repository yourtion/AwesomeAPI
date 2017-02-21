<template>
 <div>
 <h2> {{ group_name }}</h2>
 <h3>项目：{{ $route.params.project }} 文件：{{ $route.params.file }}</h3>
 <div>
  {{ content }}
 </div>
 </div>
</template>
<script>
  export default {
    created() {
      this.loading = true;
      console.log(this.$route.params);
      this.$store.dispatch('getApiFile', this.$route.params).then(() => { this.loading = false; });
    },
    data() {
      return {
        loading: true,
        content: this.$store.state.content,
      };
    },
    computed: {
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
