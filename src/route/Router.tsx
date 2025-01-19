import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Todos from "../pages/Todos";
import Header from "../components/layout/Header";
import TodoDetail from "../pages/TodoDetail";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import MyPage from "../pages/auth/MyPage";
import UpdateProfile from "../pages/auth/UpdateProfile";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/todos" element={<Todos />} />
          <Route path="/todos/:id" element={<TodoDetail />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/mypage"
            element={<ProtectedRoute page={<MyPage />} />}
          />
          <Route
            path="/update-profile"
            element={<ProtectedRoute page={<UpdateProfile />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
