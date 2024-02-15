import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { notify } from "../helper/sweetaAlert";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;

  const login = async (user) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${URL}/auth/login/`, user);
      dispatch(loginSuccess(data));
      notify("Giriş İşlemi Başarılı", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      notify(
        error?.response?.data.message
          ? error.response.data.message
          : "Login failed",
        "error"
      );
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.post(`${URL}/auth/logout/`);
      dispatch(logoutSuccess());
      notify("Logout successful", "success");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      notify("Logout failed", "error");
    }
  };
  const register = async (user) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${URL}/users/`, user);
      dispatch(registerSuccess(data));
      notify("Register successful", "success");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      notify("Register failed", "error");
    }
  };
  return { login, logout, register };
};

export default useAuthCall;
