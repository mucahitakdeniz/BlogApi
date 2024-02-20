import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Dashboard from "../component/Dashboard";
import About from "../pages/About";
import ReadMore from "../component/ReadMore";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import MyBlog from "../pages/MyBlog";
import { useState } from "react";

const AppRouter = () => {
  const [search, setSearch] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home setSearch={setSearch} />}>
        <Route index element={<Dashboard search={search} />} />
        <Route path="/about" element={<About />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="profile" element={<Profile />} />
          <Route path="newblog" element={<NewBlog />} />
          <Route path="readmore/:id" element={<ReadMore />} />
          <Route path="myblog" element={<MyBlog />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
