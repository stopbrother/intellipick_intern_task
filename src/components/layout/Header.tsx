import { Link } from "react-router-dom";
import AuthHeader from "../AuthHeader";

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/todos">목록</Link>
        </li>
      </ul>
      <AuthHeader />
    </nav>
  );
};

export default Header;
