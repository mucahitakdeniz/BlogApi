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
    isActive: false,
    image: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user_name;
      state.currentUserId = payload?.user_id;
      state.token = payload?.token;
      state.isAdmin = payload?.is_admin;
      state.isActive = payload?.is_active;
      state.image = payload?.image;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.token = null;
      state.currentUserId = null;
      state.isAdmin = null;
      state.isActive = null;
      state.image = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user_name;
      state.currentUserId = payload?.user_id;
      state.token = payload?.token;
      state.isAdmin = payload?.is_admin;
      state.isActive = payload?.is_active;
      state.image = payload?.image;
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
