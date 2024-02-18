import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notify } from "../helper/sweetaAlert";
import useAxios from "./useAxios";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithToken } = useAxios();
  const login = async (user) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`/auth/login/`, user);
      dispatch(loginSuccess(data));
      notify("Giriş İşlemi Başarılı", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Bir hata oldu. Lütfen tekrar deneyiniz",
        "error"
      );
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.get(`auth/logout/`);
      dispatch(logoutSuccess());
      notify("Çıkiş işlemi başarılı", "success");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      notify("Bir hata oldu. Lütfen tekrar deneyiniz", "error");
    }
  };
  const register = async (user) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`/users/`, user);
      console.log(data);
      dispatch(registerSuccess(data));
      notify("Kayıt işlemi başarılı ", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Kayıt işleminde bir hata oldu. Lütfen tekrar deneyiniz",
        "error"
      );
    }
  };
  return { login, logout, register };
};

export default useAuthCall;
