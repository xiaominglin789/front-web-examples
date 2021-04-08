<template>
  <div>
    <input type="text" v-model="inputValue" placeholder="添加新项">
    <button @click="onAddItem">添加</button>
  </div>
</template>

<script>
export default ({
  name: 'ComAdd',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    onAddItem() {
      let _value = this.inputValue
      _value = _value.trim()
      if (!_value) return

      this.$emit("set-add-item", {
        id: new Date().getTime(),
        content: _value,
        complated: false
      })

      this.inputValue = ''
    }
  }
})
</script>

<style lang="scss" scoped></style>
