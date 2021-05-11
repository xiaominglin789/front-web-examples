<template>
  <div class="input-add">
    <input
      type="text"
      name="todo"
      v-model="newContent"
      @keyup.enter="emitAddTodo"
    />
    <button @click="emitAddTodo">
      <i class="plus"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { TodoListItemType } from "@/utils/types/todo-list-item";
import { defineComponent, ref } from "vue";

function useEmitTodoAdd() {
  console.log("123");
  console.log("123");
  console.log("123");
  console.log("123");
  console.log("123");
}

export default defineComponent({
  name: "",
  props: {
    /** 新添项的id */
    tid: Number
  },
  setup(props, { emit }) {
    const newContent = ref("");

    const emitAddTodo = () => {
      if (!newContent.value) return;
      const todo: TodoListItemType = {
        id: Number(props.tid),
        content: newContent.value,
        completed: false
      };
      emit("add", todo);
      newContent.value = "";
    };

    return {
      newContent,
      emitAddTodo
    };
  }
});
</script>

<style lang="scss" scoped>
.input-add {
  position: relative;
  display: flex;
  align-items: center;
  input {
    padding: 16px 32px 16px 18px;
    border-radius: 48px;
    border: none;
    outline: none;
    box-shadow: 0 0 24 rgba(0, 0, 0, 0.08);
    width: 100%;
    font-size: 16px;
    color: #626262;
  }
  button {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: linear-gradient(#c0a5f3, #7f95f7);
    border: none;
    outline: none;
    color: #ffffff;
    position: absolute;
    right: 0;
    cursor: point;
  }
  .plus {
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff);
    background-size: 50% 2px, 2px 50%;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
