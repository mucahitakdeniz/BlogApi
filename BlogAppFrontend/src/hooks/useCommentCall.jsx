import { useDispatch } from "react-redux";
import {
  fetchCommentFail,
  getCommentSuccess,
  fetchCommentStart,
  deleteCommentSuccess,
} from "../features/commentSlice";
import useAxios from "./useAxios";
import { notify } from "../helper/sweetaAlert";

const useCommentCall = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getComment = async (id) => {
    dispatch(fetchCommentStart());
    try {
      const { data } = await axiosWithToken.get(`/comments/${id}`);
      dispatch(getCommentSuccess(data.data));
    } catch (error) {
      console.log(error);
    }
  };
  const createComment = async (comment) => {
    dispatch(fetchCommentStart());
    try {
      const { data } = await axiosWithToken.post(`/comments`, comment);
      dispatch(deleteCommentSuccess());
      notify("Yorum yaptının için teşekkürler", "success");
    } catch (error) {
      dispatch(fetchCommentFail());
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Bir hata oluştu. Lütfen tekrar deneyiniz",
        "error"
      );
      console.log(error);
    }
  };
  const deleteComment = async (id) => {
    dispatch(fetchCommentStart());
    try {
      await axiosWithToken.delete(`/comments/${id}`);
      dispatch(deleteCommentSuccess());
    } catch (error) {
      dispatch(fetchCommentFail());
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Bir hata oluştu. Lütfen tekrar deneyiniz",
        "error"
      );
      console.log(error);
    }
  };

  return { getComment, deleteComment, createComment };
};

export default useCommentCall;
