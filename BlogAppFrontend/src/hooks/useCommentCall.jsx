import { useDispatch } from "react-redux";
import {
  fetchCommentFail,
  getCommentSuccess,
  fetchCommentStart,
  deleteCommentSuccess,
} from "../features/commentSlice";
import useAxios from "./useAxios";

const useCommentCall = () => {
  const { axiosWithToken } = useAxios;
  const dispatch = useDispatch();

  const getComment = async (blog_id) => {
    dispatch(fetchCommentStart());
    try {
      const data = axiosWithToken.get(`/comments/${blog_id}`);
      dispatch(getCommentSuccess(data));
    } catch (error) {}
    dispatch(fetchCommentFail());
  };
  const deleteComment = async (id) => {
    dispatch(fetchCommentStart());
    try {
      axiosWithToken.delete(`/comments/${id}`);
      dispatch(deleteCommentSuccess());
    } catch (error) {}
    dispatch(fetchCommentFail());
  };

  return { getComment, deleteComment };
};

export default useCommentCall;
