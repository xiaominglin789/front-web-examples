<template>
  <div class="page card">
    <div class="header">
      购物车列表
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { useCardStore } from "../../hooks/curd";

const cardStore = inject("cardStore") as unknown as ReturnType<typeof useCardStore>;
const list = ref(cardStore.state.selectGoods)

</script>

<style lang="scss" scoped>
  
</style>
