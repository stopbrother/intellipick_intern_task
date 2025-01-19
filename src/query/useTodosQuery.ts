import { useQuery } from "@tanstack/react-query";
import { fetchTodo, fetchTodos } from "../api/todos-api";
import { QUERY_KEYS } from "./queryKeys";
import { Todo } from "../types/todo.types";

export const useTodosQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: fetchTodos,
  });
};

export const useTodoQuery = (id: Todo["id"]) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS, id],
    queryFn: () => fetchTodo(id),
  });
};
