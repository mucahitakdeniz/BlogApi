import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Dishboard from "../component/Dishboard";
import About from "../component/About";
import ReadMore from "../component/ReadMore";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import MyBlog from "../pages/MyBlog";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />}>
        <Route index element={<Dishboard />} />
        <Route path="/about" element={<About />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="profile" element={<Profile />} />
          <Route path="newblog" element={<NewBlog />} />
          <Route path="readmore" element={<ReadMore />} />
          <Route path="myblog" element={<MyBlog/>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
