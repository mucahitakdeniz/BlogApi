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
    email: null,
    creationDate: null,
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
      state.email = payload.email;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.token = null;
      state.currentUserId = null;
      state.isAdmin = null;
      state.isActive = null;
      state.image = null;
      state.email = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user_name;
      state.currentUserId = payload?.user_id;
      state.token = payload?.token;
      state.isAdmin = payload?.is_admin;
      state.isActive = payload?.is_active;
      state.image = payload?.image;
      state.email = payload.email;
    },
    sendResetPasswordToEmailSuccsess: (state, { payload }) => {
      state.currentUserId = payload.id;
      state.email = payload?.email;
      state.creationDate = payload?.creationDate;
    },
    sendVerificationPasswordSuccsess: (state, { payload }) => {
      state.token = payload.token;
    },
    cahangePaswordSuscess: (state) => {
      state.currentUserId = null;
      state.email = null;
      state.creationDate = null;
      state.token = null;
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
  sendResetPasswordToEmailSuccsess,
  sendVerificationPasswordSuccsess,
  cahangePaswordSuscess,
} = authSlice.actions;
export default authSlice.reducer;
