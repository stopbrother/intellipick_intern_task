import { Link } from "react-router-dom";
import { useUserProfileQuery } from "../../query/useAuthQuery";

const MyPage = () => {
  const { data, isLoading, error } = useUserProfileQuery();

  if (isLoading) return <p>로딩중</p>;
  if (error) return <p>에러 발생</p>;

  return (
    <section>
      <h2>마이 페이지</h2>
      <Link to="/update-profile"></Link>
      <img src={data?.avatar ?? undefined} alt="프로필이미지" />
      <p>아이디: {data?.id}</p>
      <p>닉네임: {data?.nickname}</p>
      <p>success: {data?.success}</p>
    </section>
  );
};

export default MyPage;
