<template>
  <div class="todo-item" :class="todo.completed ? ' done' : ''">
    <label>
      <input
        type="checkbox"
        @checked="todo.completed"
        @click="$emit('onchange', $event)"
      />
      {{ todo.content }}
      <span class="check-button"></span>
    </label>
  </div>
</template>

<script lang="ts">
import { TodoListItemType } from "@/utils/types/todo-list-item";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "",
  props: {
    todo: {
      type: Object as PropType<TodoListItemType>,
      default: () => null
    },
    co: Number
  }
});
</script>

<style lang="scss" scoped>
.todo-item {
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  color: #626262;
  label {
    position: relative;
    display: flex;
    align-items: center;
  }
  label span.check-button {
    position: absolute;
    top: 0;
    user-select: none;
  }
  label span.check-button::before,
  label span.check-button::after {
    content: "";
    display: block;
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
  label span.check-button::before {
    border: 1px solid #b382f9;
  }
  label span.check-button::after {
    transition: 0.4s;
    background-color: #b382f9;
    transform: translate(1px, 1px) scale(0.8);
    opacity: 0;
  }
  label input {
    outline: none !important;
    border: none !important;
    opacity: 0;
    margin-right: 16px;
  }
  label input:checked + span.check-button::after {
    opacity: 1;
  }
}
.todo-item.done label {
  text-decoration: line-through !important;
  span.check-button::after {
    opacity: 1;
  }
}
</style>
