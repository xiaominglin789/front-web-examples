<template>
  <div>
    <com-add class="com-add" @setAddItem="setAddItem" />
    <com-list :list="list" @setComplated="setComplated" @removeItem="removeItem" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ComAdd from './components/ComAdd.vue'
import ComList from './components/ComList.vue'

export default defineComponent({
  name: 'App',
  components: {
    ComAdd,
    ComList
  },
  props: {
    list: Array
  },
  setup() {
    type ItemType = {
      id: number,
      content: string,
      complated: boolean
    }

    const list = ref(Array<ItemType>())

    const setAddItem = (params: ItemType) => {
      list.value.push(params)
    }

    const setComplated = (id: number) => {
      list.value.map(item => {
        if (item.id === id) {
          item.complated = !item.complated
        }
        return item
      })
    }

    const removeItem = (id: number) => {
      list.value = list.value.filter(item => item.id !== id)
    }

    return {
      list,
      setAddItem,
      setComplated,
      removeItem
    }
  }
});
</script>

<style>
.com-add > .add-btn {
  color: red;
}
</style>
