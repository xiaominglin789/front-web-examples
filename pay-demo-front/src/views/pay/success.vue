<template>
  <div class="page">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <span>支付结果: {{isOk}}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { ref, toRef } from "vue";
import { useRoute } from "vue-router";
import { post } from "../../utils/http";

const route = useRoute();
const { out_trade_no, trade_no } = route.query;
const isOk = ref("");

if (!out_trade_no || !trade_no) {
  location.href = "/";
}

onMounted(async () => {
  const res: any = await post("/api/pay/queryOrder", { out_trade_no, trade_no });
  isOk.value = res.msg;
  console.log(res);
})
</script>

<style scoped>
  
</style>
