import axios from "axios";
import { axiosFail, axiosSuccess, axiosStart } from "../features/blogSlice";
import { useDispatch } from "react-redux";

const useAxios = () => {
  const dispatch = useDispatch();
  const axiosFn = async () => {
    dispatch(axiosStart());
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/blogs/`
      );
      dispatch(axiosSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(axiosFail());
    }
  };
  return { axiosFn };
};
export default useAxios;
