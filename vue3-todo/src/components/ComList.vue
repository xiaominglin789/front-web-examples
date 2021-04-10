<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <input type="checkbox" :checked="item.complated" @click="setComplated(item.id)">
      <span :style="{ 'text-decoration': item.complated ? 'line-through' : '' }">{{item.content}}</span>
      <button @click="removeItem(item.id)">删除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '',
  props: {
    list: Array
  },
  setup(props, { emit }) {
    const setComplated = (id: number) => {
      emit('set-complated', id)
    }

    const removeItem = (id: number) => {
      emit('remove-item', id)
    }

    return {
      setComplated,
      removeItem
    }
  }
})
</script>

<style lang="scss" scoped></style>
