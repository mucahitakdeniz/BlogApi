import { createSlice } from "@reduxjs/toolkit";

const commentSlace = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    error: false,
    comments: [],
  },
  reducers: {
    fetchCommentStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCommentFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    getCommentSuccess: (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
    },
    deleteCommentSuccess: (state) => {
      state.loading = false;
    },
  },
});
export const {
  fetchCommentFail,
  fetchCommentStart,
  getCommentSuccess,
  deleteCommentSuccess,
} = commentSlace.actions;
export default commentSlace.reducer;
