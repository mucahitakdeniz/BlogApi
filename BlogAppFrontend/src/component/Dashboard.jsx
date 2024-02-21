import { useEffect } from "react";
import Cards from "./Cards";
import useBloggsFn from "../hooks/useBlogsFn";
import { useSelector } from "react-redux";

const Dashboard = ({ search }) => {
  const { blogsData } = useSelector((state) => state.blogs);
  const { getBlogs } = useBloggsFn();
  const filterBlogs = blogsData.filter(
    (blog) =>
      blog.content.toLowerCase().includes(search?.toLowerCase() || '') &&
      blog.status === "p"
  );
  
  useEffect(() => {
    getBlogs();
  }, []);

  return <Cards blogsData={filterBlogs} />;
};

export default Dashboard;
