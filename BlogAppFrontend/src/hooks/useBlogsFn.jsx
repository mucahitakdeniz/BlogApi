import {
  fetchFail,
  fetchStart,
  readCards,
  createBlogSuccess,
  deleteBlogSuccess,
} from "../features/cardsSlice";
import {
  getBlogsFail,
  getBlogsStart,
  getBlogsSuccess,
} from "../features/blogSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { notify } from "../helper/sweetaAlert";
import useAxios from "./useAxios";

const useCardsFn = () => {
  const { axiosWithToken } = useAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const getBlogs = async () => {
    dispatch(getBlogsStart());
    try {
      const { data } = await axiosWithToken.get(`/blogs`);
      dispatch(getBlogsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getBlogsFail());
    }
  };

  const readMore = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`/blogs/${id}/`);
      dispatch(readCards(data));
      navigate("/readMore");
    } catch (error) {
      console.log(error);
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Bir hata oluştu. Lütfen tekrar deneyiniz",
        "error"
      );
      dispatch(fetchFail());
    }
  };
  const createBlog = async (blog) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`$/blogs/`, blog);
      console.log("Blog oluşturma işlemi başarılı");
      dispatch(createBlogSuccess(data));
      notify("Blog oluşturma işlemi başarılı", "success");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Blog oluşturma işleminde bir hata oluştu. Lütfen tekrar deneyiniz",
        "error"
      );
    }
  };
  const likesBlog = async (id) => {
    dispatch(fetchStart());

    try {
      const response = await axiosWithToken.get(
        `/like/${id}/`) 
      console.log("Blog beğenme işlemi başarılı:", response.data);
    } catch (error) {
      dispatch(fetchFail());

      console.error("Blog beğenme işlemi sırasında hata oluştu:", error);
    }
  };
  const deleteBlog = async (id) => {
    dispatch(fetchStart());

    try {
      await axiosWithToken.delete(`/blogs/${id}`) 
      dispatch(deleteBlogSuccess());
      notify("Blog başarıyla silindi", "success");
    } catch (error) {
      dispatch(fetchFail());

      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Bir hata oluştu. Lütfen tekrar deneyiniz",
        "error"
      );
      console.log(error);
    }
  };
  return { readMore, createBlog, likesBlog, deleteBlog,getBlogs };
};
export default useCardsFn;
