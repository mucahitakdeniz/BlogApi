import { useEffect } from "react";
import Cards from "./Cards";
import useAxios from "../hooks/useAxios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { blogsData } = useSelector((state) => state.blogs);
  const { axiosFn } = useAxios();
  useEffect(() => {
    axiosFn();
  }, []);

  return <Cards blogsData={blogsData} />;
};

export default Dashboard;
