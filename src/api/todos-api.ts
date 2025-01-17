import { Todo } from "../types/todo.types";
import { api } from "./axiosInstance";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await api.get<Todo[]>("/todos");
  return response.data;
};

export const fetchTodo = async () => {
  const response = await api.get("/todos/1");
  return response.data;
};
