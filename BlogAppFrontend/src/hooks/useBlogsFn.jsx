import {
  readCards,
  createBlogSuccess,
  deleteBlogSuccess,
  fetchFail,
  fetchStart,
} from "../features/cardsSlice";
import {
  getBlogsSuccess,
  fetchBlogFail,
  fetchBlogStart,
  getCategoriesSuccess,
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
    dispatch(fetchBlogStart());
    try {
      const { data } = await axiosWithToken.get(`/blogs`);
      dispatch(getBlogsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(fetchBlogFail());
    }
  };
  const getCategories = async () => {
    dispatch(fetchBlogStart());
    try {
      const { data } = await axiosWithToken.get(`/categories`);
      dispatch(getCategoriesSuccess(data.result));
    } catch (error) {
      console.log(error);
      dispatch(fetchBlogFail());
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
    dispatch(fetchBlogStart());
    try {
      axiosWithToken.post(`/blogs/`, blog);
      dispatch(createBlogSuccess());

      notify("Blog oluşturma işlemi başarılı", "success");
      navigate("/");
    } catch (error) {
      dispatch(fetchBlogFail());
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Blog oluşturma işleminde bir hata oluştu. Lütfen tekrar deneyiniz",
        "error"
      );
    }
  };
  const updateBlog = async (blog) => {
    dispatch(fetchBlogStart());
    try {
      await axiosWithToken.put(`/blogs/${blog._id}`, blog);
      dispatch(createBlogSuccess());

      notify("Blog başarıyla güncellendi", "success");
      window.location.reload();
    } catch (error) {
      dispatch(fetchBlogFail());
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Blog güncelleme işleminde bir hata oluştu. Lütfen tekrar deneyiniz",
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
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Beğenme işleminde bir hata oluştu.",
        "error"
      );
    }
  };
  const deleteBlog = async (id) => {
    dispatch(fetchBlogStart());

    try {
      await axiosWithToken.delete(`/blogs/${id}`);
      dispatch(deleteBlogSuccess());
      notify("Blog başarıyla silindi", "success");
      navigate("/");
    } catch (error) {
      dispatch(fetchBlogFail());

      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Bir hata oluştu. Lütfen tekrar deneyiniz",
        "error"
      );
      console.log(error);
    }
  };
  return {
    readMore,
    createBlog,
    likesBlog,
    deleteBlog,
    getBlogs,
    getCategories,
    updateBlog,
  };
};
export default useCardsFn;
