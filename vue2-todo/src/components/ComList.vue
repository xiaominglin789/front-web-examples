<template>
  <div>
    <div
      v-for="(item, index) of list"
      :key="index"
    >
      <input type="checkbox" :checked="item.complated" @click="setComplated(item.id)">
      <span :style="{ 'text-decoration': item.complated ? 'line-through':'' }">{{item.content}}</span>
      <button @click="onRemoveItem(item.id)">删除</button>
    </div>
  </div>
</template>

<script>
export default ({
  name: 'ComList',
  props: {
    list: Array
  },
  methods: {
    onRemoveItem(id) {
      this.$emit('onRemoveItem', id)
    },
    setComplated(id) {
      this.$emit('setComplated', id)
    }
  }
})
</script>

<style lang="scss" scoped></style>
