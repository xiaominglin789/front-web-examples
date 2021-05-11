<template>
  <div class="todo-list">
    <todo-list-item
      v-for="child in list"
      :key="child.id"
      :todo="child"
      @onchange="child.completed = $event.target.checked"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import TodoListItem from "@/components/TodoListItem.vue";
import { TodoListItemType } from "@/utils/types/todo-list-item";

export default defineComponent({
  name: "",
  components: {
    TodoListItem
  },
  props: {
    list: {
      type: Array as PropType<Array<TodoListItemType>>,
      default: () => []
    }
  }
});
</script>

<style lang="scss" scoped>
.todo-list {
  display: grid;
  row-gap: 14px;
}
</style>
