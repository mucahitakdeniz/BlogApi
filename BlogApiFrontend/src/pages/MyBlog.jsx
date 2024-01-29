import { useEffect } from "react";
import MyBlogsCards from "../component/MyBlogsCards";
import useAxios from "../hooks/useAxios";
import { useSelector } from "react-redux";

const MyBlog = () => {
  const { blogsData } = useSelector((state) => state.blogs);
  const { currentUser } = useSelector((state) => state.auth);
  const { axiosFn } = useAxios();
 

  useEffect(() => {
    axiosFn();
  }, [blogsData]);
  return (

  <MyBlogsCards cardsData={blogsData} authorname={currentUser.username} /> )
};

export default MyBlog;
