import { useQuery } from "@tanstack/react-query";
import { fetchTodo, fetchTodos } from "../api/todos-api";
import { QUERY_KEYS } from "./queryKeys";

export const useTodosQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: fetchTodos,
  });
};

export const useTodoQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: fetchTodo,
  });
};
