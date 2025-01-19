import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Todos from "../pages/Todos";
import Header from "../components/layout/Header";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
