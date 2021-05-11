import { TodoListItemType } from "@/utils/types/todo-list-item";
import { ref } from "vue";

/** 业务: todo初始化 */
export default function useTodo() {
  const todos = ref(Array<TodoListItemType>());

  const addTodo = (item: TodoListItemType) => todos.value.push(item);

  return {
    todos,
    addTodo
  };
}
