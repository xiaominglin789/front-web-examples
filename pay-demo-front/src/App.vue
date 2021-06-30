<template>
  <router-view />
</template>

<script lang="ts" setup>
import { provide } from "vue";
import { useCardStore } from "./hooks/curd";

provide("cardStore", useCardStore);

</script>

<style>
.page {
  width: 86%;
  margin: 0 auto;
}
</style>