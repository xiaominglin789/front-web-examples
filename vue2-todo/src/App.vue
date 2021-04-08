<template>
  <div id="app">
    <com-add @set-add-item="setAddItem" />
    <ComList :list="list" @onRemoveItem="onRemoveItem" @setComplated="setComplated" />
  </div>
</template>

<script>
import Vue from 'vue';
import ComAdd from './components/ComAdd.vue'
import ComList from './components/ComList.vue'

export default Vue.extend({
  name: 'App',
  components: {
    ComAdd,
    ComList,
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    setAddItem(params) {
      console.log(params);
      this.list.push(params)
    },
    onRemoveItem(id) {
      this.list = this.list.filter(item => item.id !== id)
    },
    setComplated(id) {
      this.list = this.list.map(item => {
        if (item.id === id) {
          item.complated = !item.complated 
        }
        return item
      })
    }
  }
});
</script>

<style>
