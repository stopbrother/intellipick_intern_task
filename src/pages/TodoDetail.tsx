import { useParams } from "react-router-dom";
import { useTodoQuery } from "../query/useTodosQuery";

const TodoDetail = () => {
  const { id } = useParams();
  const todoId = Number(id);
  const { data: todo, isLoading, error } = useTodoQuery(todoId);

  if (isLoading) return <p>로딩중</p>;
  if (error) return <p>에러발생</p>;

  return (
    <section>
      <div>
        <p>{todo?.completed ? "완료" : "미완료"}</p>
        <p>{todo?.title}</p>
      </div>
    </section>
  );
};

export default TodoDetail;
