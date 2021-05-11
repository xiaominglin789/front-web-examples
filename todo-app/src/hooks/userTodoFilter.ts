import { TodoListItemType } from "@/utils/types/todo-list-item";
import { ref, computed, Ref } from "vue";

/** 列表分类过滤 */
export default function useTodoFilter(todos: Ref<Array<TodoListItemType>>) {
  const filter = ref("all");

  const filterTodos = computed(() => {
    let filterList: Array<TodoListItemType>;
    switch (filter.value) {
      case "done":
        filterList = todos.value.filter(child => child.completed === true);
        break;
      case "todo":
        filterList = todos.value.filter(child => child.completed === false);
        break;
      default:
        filterList = todos.value;
        break;
    }
    return filterList;
  });

  return {
    filterTodos,
    filter
  };
}
