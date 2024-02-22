import { useEffect, useState } from "react";
import Cards from "./Cards";
import useBloggsFn from "../hooks/useBlogsFn";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import SearchField from "./SearchField";

const Dashboard = () => {
  const { blogsData } = useSelector((state) => state.blogs);
  const { getBlogs } = useBloggsFn();
  const [search, setSearch] = useState(null);

  const filterBlogs = blogsData.filter(
    (blog) =>
      blog.content.toLowerCase().includes(search?.toLowerCase() || "") &&
      blog.status === "p"
  );

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Box>
      <SearchField setSearch={setSearch} search={search} /> <Cards blogsData={filterBlogs} />
    </Box>
  );
};

export default Dashboard;
