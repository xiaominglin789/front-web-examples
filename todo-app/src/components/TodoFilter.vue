<template>
  <div class="filters">
    <span
      v-for="(filter, index) in filters"
      :key="index"
      class="filter"
      :class="{ active: selected === filter.value }"
      @click="$emit('onchange', filter.value)"
    >
      {{ filter.label }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "",
  props: {
    selected: {
      type: String,
      default: "all"
    }
  },
  setup() {
    const filters = [
      { label: "全部", value: "all" },
      { label: "完成", value: "done" },
      { label: "未完成", value: "todo" }
    ];

    return {
      filters
    };
  }
});
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  margin: 24px 2px;
  color: #c0c2ce;
  font-size: 14px;
  .filter {
    margin-right: 14px;
    transition: 0.4s;
    cursor: pointer;
  }
  .active {
    color: #6b729c;
    transform: scale(1.2);
  }
}
</style>
