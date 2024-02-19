import { createSlice } from "@reduxjs/toolkit";

const blogSlace = createSlice({
  name: "blogs",
  initialState: {
    loading: false,
    error: false,
    blogsData: [],
    categories: [],
  },
  reducers: {
    fetchBlogStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchBlogFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    getBlogsSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogsData = payload;
    },
    getCategoriesSuccess: (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
    },
  },
});
export const {
  fetchBlogFail,
  fetchBlogStart,
  getBlogsSuccess,
  getCategoriesSuccess,
} = blogSlace.actions;
export default blogSlace.reducer;
