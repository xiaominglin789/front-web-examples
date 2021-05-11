<template>
  <main>
    <div class="container">
      <h1>代办清单</h1>
      <!-- add -->
      <todo-add :tid="todos.length" @add="addTodo" />
      <!-- filters -->
      <todo-filter :selected="filter" @onchange="filter = String($event)" />
      <!-- list -->
      <todo-list :list="filterTodos" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoAdd from "@/components/TodoAdd.vue";
import TodoList from "@/components/TodoList.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import useTodo from "@/hooks/useTodo";
import useTodoFilter from "@/hooks/userTodoFilter";

export default defineComponent({
  components: {
    TodoAdd,
    TodoList,
    TodoFilter
  },
  setup() {
    const { todos, addTodo } = useTodo();
    const { filterTodos, filter } = useTodoFilter(todos);

    return {
      todos,
      filterTodos,
      addTodo,
      filter
    };
  }
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

main {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(203, 200, 232);
}

.container {
  width: 64%;
  max-width: 400px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 48px 24px;
  background-color: rgb(245, 246, 252);
  h1 {
    margin: 24px 0;
    font-size: 32px;
    font-weight: 600;
    color: #414873;
    text-align: center;
    display: inline-block;
  }
}
</style>
