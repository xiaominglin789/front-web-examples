<template>
  <div class="add-box">
    <input type="text" v-model="inputValue" placeholder="新选项">
    <button class="add-btn" @click="setAddItem">添加</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ComAdd',
  setup(props, { emit }) {
    const inputValue = ref('')
    
    const setAddItem = () => {
      const _value = inputValue.value.trim()
      if (!_value) return

      emit('set-add-item', {
        id: new Date().getTime(),
        content: _value,
        complated: false
      })

      inputValue.value = ''
    }
    
    return {
      inputValue,
      setAddItem  
    }
  }
})
</script>
