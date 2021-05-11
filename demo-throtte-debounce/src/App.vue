<template>
  <div @mouseenter="onThrottle" class="box">
    {{ ok }}
  </div>
  <button class="btn" @click="onThrottle">测试-节流（mouseenter:1500ms）</button>
  <!-- test2 -->
  <button class="btn" @click="onDebounce">测试-防抖（mouseenter:1500ms） => {{ok}}</button>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { debounce, throttle } from "./utils/utils";
const ok = ref(0);

const dosome = () => {
  return ok.value += 9;
}

const onThrottle = throttle(dosome, 1500);

const onDebounce = debounce(dosome, 1000, false);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box {
  width: 300px;
  height: 300px;
  background: rgb(22, 143, 224);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.btn {
  margin-top: 6px;
}
</style>
