import { useEffect } from "react";
import Cards from "./Cards";
import useBloggsFn from "../hooks/useBlogsFn";
import { useSelector } from "react-redux";

const Dashboard = ({ search }) => {
  const { blogsData } = useSelector((state) => state.blogs);
  const { getBlogs } = useBloggsFn();
  console.log(search);
  useEffect(() => {
    getBlogs();
  }, []);
  const filterBlogs = search
    ? blogsData.filter((blog) =>
        blog.content.toLowerCase().includes(search.toLowerCase())
      )
    : blogsData;
  return <Cards blogsData={filterBlogs} />;
};

export default Dashboard;
