import { Link } from "react-router-dom";
import { useAuthQuery } from "../query/useAuthQuery";
import { useLogoutMutation } from "../query/useAuthMutation";

const AuthHeader = () => {
  const { data } = useAuthQuery();
  const { mutate: logout } = useLogoutMutation();
  return (
    <div className="flex items-center gap-2">
      {!data ? (
        <>
          <Link to="/register" className="hover:text-[#E63946]">
            회원가입
          </Link>
          <Link to="/login" className="hover:text-[#E63946]">
            로그인
          </Link>
        </>
      ) : (
        <>
          <Link to="/mypage" className="bg-[#588157] hover:bg-[#476947]">
            마이페이지
          </Link>
          <button
            type="button"
            className="bg-[#588157] hover:bg-[#476947]"
            onClick={() => logout()}
          >
            로그아웃
          </button>
        </>
      )}
    </div>
  );
};

export default AuthHeader;
