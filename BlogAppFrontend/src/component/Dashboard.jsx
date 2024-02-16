import { useEffect } from "react";
import Cards from "./Cards";
import useBloggsFn from "../hooks/useBlogsFn";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { blogsData } = useSelector((state) => state.blogs);
  const { getBlogs } = useBloggsFn();
  useEffect(() => {
    getBlogs();
  }, []);

  return <Cards blogsData={blogsData} />;
};

export default Dashboard;
