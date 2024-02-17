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
import { notify } from "../helper/sweetaAlert";
import useAxios from "./useAxios";

const useCardsFn = () => {
  const { axiosWithToken } = useAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(readCards(data.result));
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
  const likesBlog = async (id, read = false) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.get(`blogs/like/${id}/`);
      if (!read) {
        getBlogs();
      }
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const deleteBlog = async (id) => {
    dispatch(fetchStart());

    try {
      await axiosWithToken.delete(`/blogs/${id}`);
      dispatch(deleteBlogSuccess());
      notify("Blog başarıyla silindi", "success");
      navigate("/");
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
  return { readMore, createBlog, likesBlog, deleteBlog, getBlogs };
};
export default useCardsFn;
