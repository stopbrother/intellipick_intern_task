import { Link } from "react-router-dom";
import AuthHeader from "../AuthHeader";

const Header = () => {
  return (
    <header className="w-full sticky top-0 border-b">
      <nav className="flex justify-between max-w-[1200px] h-[60px] items-center mx-auto">
        <ul className="space-x-6">
          <Link to="/" className="hover:text-[#E63946]">
            홈
          </Link>

          <Link to="/todos" className="hover:text-[#E63946]">
            목록
          </Link>
        </ul>
        <AuthHeader />
      </nav>
    </header>
  );
};

export default Header;
