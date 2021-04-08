<template>
  <router-view />
</template>

<script>
export default {
  created() {
    // 数据缓存初始化到页面
    this.$store.dispatch("initAppData");
  },
};
</script>
