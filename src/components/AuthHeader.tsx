import { Link } from "react-router-dom";
import { useAuthQuery } from "../query/useAuthQuery";
import { useLogoutMutation } from "../query/useAuthMutation";

const AuthHeader = () => {
  const { data } = useAuthQuery();
  const { mutate: logout } = useLogoutMutation();
  return (
    <div>
      {!data ? (
        <>
          <Link to="/register">회원가입</Link>
          <Link to="/login">로그인</Link>
        </>
      ) : (
        <>
          <Link to="/mypage">마이페이지</Link>
          <button type="button" onClick={() => logout()}>
            로그아웃
          </button>
        </>
      )}
    </div>
  );
};

export default AuthHeader;
