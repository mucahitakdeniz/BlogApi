import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    currentUserId: null,
    loading: false,
    error: false,
    token: null,
    isAdmin: false,
    image: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.currentUser = payload?.user_name;
      state.currentUserId = payload?.user_id;
      state.token = payload?.token;
      state.isAdmin = payload?.is_admin;
      state.image = payload?.image;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state;
      state.currentUser = null;
      state.token = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user;
      state.token = payload?.token;
      state.currentUser = payload?.user_name;
      state.currentUserId = payload?.user_id;
      state.token = payload?.token;
      state.isAdmin = payload?.is_admin;
      state.image = payload?.image
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} = authSlice.actions;
export default authSlice.reducer;
