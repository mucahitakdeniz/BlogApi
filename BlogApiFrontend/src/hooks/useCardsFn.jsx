import {
  fetchFail,
  fetchStart,
  readCards,
  createBlogSuccess,
  deleteBlogSuccess,
} from "../features/cardsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { notify } from "../helper/sweetaAlert";

const useCardsFn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const readMore = async (id) => {
    dispatch(fetchStart());
    ;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/blogs/${id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      dispatch(readCards(data));
      navigate("/readMore");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  const createBlog = async (blog) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/blogs/`,
        blog,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log("axios success");
      dispatch(createBlogSuccess(data));

      notify("Creating a new blog is successful", "success");

      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      notify("Creating a new blog is not successful", "error");
    }
  };
  const likesBlog = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/likes/${id}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Blog beğenme işlemi başarılı:", response.data);
    } catch (error) {
      console.error("Blog beğenme işlemi sırasında hata oluştu:", error);
    }
  };
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/blogs/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(deleteBlogSuccess());
      notify("Blog Deleted is successful", "success");

      console.log("Blog silme işlemi başarılı:");
    } catch (error) {
      notify("Blog Deleted is not successful", "error");

      console.error("Blog silme işlemi sırasında hata oluştu:", error);
    }
  };
  return { readMore, createBlog, likesBlog, deleteBlog };
};
export default useCardsFn;
