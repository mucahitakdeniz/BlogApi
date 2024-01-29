import { useEffect } from "react";
import Cards from "./Cards";
import useAxios from "../hooks/useAxios";
import { useSelector } from "react-redux";

const Dishboard = () => {
  const { blogsData } = useSelector((state) => state.blogs);
  const { axiosFn } = useAxios();
  useEffect(() => {
    axiosFn();
    console.log(blogsData);

  }, []);

   return <Cards cardsData={blogsData} />;
};

export default Dishboard;
