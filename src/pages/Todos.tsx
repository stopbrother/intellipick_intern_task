import { Link } from "react-router-dom";
import { useTodosQuery } from "../query/useTodosQuery";

const Todos = () => {
  const { data: todos, isLoading, error } = useTodosQuery();
  if (isLoading) return <p>로딩중</p>;
  if (error) return <p>에러 발생</p>;

  return (
    <section>
      <h2>Todos</h2>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <Link to={`/todos/${todo.id}`}>
              <p>{todo.completed ? "완료" : "미완료"}</p>
              <p>{todo.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Todos;
