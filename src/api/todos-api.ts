import { Todo } from "../types/todo.types";
import { todoClient } from "./axiosInstance";

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await todoClient.get<Todo[]>("/todos");
  return data;
};

export const fetchTodo = async (id: Todo["id"]): Promise<Todo> => {
  const { data } = await todoClient.get<Todo>(`/todos/${id}`);
  return data;
};
