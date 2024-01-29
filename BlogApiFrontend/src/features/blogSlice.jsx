import { createSlice } from "@reduxjs/toolkit";

const blogSlace = createSlice({
  name: "blogs",
  initialState: {
    loading: false,
    error: false,
    blogsData: null,
  },
  reducers: {
    axiosStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    axiosFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    axiosSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogsData = payload;
    },
  },
});
export const { axiosFail, axiosStart, axiosSuccess } = blogSlace.actions;
export default blogSlace.reducer;
