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
      const { data } = await axios.post(`${URL}/users/auth/login/`, user);
      dispatch(loginSuccess(data));
      notify("Login successful", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      notify("Login failed", "error");
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.post(`${URL}/users/auth/logout/`);
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
      const { data } = await axios.post(`${URL}/users/register/`, user);
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
