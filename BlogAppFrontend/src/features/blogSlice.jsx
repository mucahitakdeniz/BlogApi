import { createSlice } from "@reduxjs/toolkit";

const blogSlace = createSlice({
  name: "blogs",
  initialState: {
    loading: false,
    error: false,
    blogsData: [],
  },
  reducers: {
    getBlogsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getBlogsFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    getBlogsSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogsData = payload;
    },
  },
});
export const { getBlogsFail, getBlogsStart, getBlogsSuccess } =
  blogSlace.actions;
export default blogSlace.reducer;
