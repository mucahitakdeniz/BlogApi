import { createSlice } from "@reduxjs/toolkit";

const cardsSlice = createSlice({
  name: "card",
  initialState: {
    loading: false,
    error: false,
    id: null,
    title: null,
    content: null,
    image: null,
    category: null,
    author: null,
    status: null,
    likes: null,
    likes_n: [],
    post_views: null,
    comment_count: null,
    createds: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    readCards: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.id = payload?._id;
      state.title = payload?.title;
      state.content = payload?.content;
      state.image = payload?.image;
      state.author = payload?.author;
      state.status = payload?.status;
      state.category = payload?.category_id;
      state.likes = payload?.likes;
      state.post_views = payload?.post_views;
      state.comment_count = payload?.comment_count;
      state.likes_n = payload?.likes_n;
      state.createds = payload?.createds;
    },
    createBlogSuccess: (state) => {
      state.loading = false;
    },
    deleteBlogSuccess: (state) => {
      state.loading = false;
      state.id = null;
      state.title = null;
      state.content = null;
      state.image = null;
      state.category = null;
      state.author = null;
      state.status = null;
      state.likes = null;
      state.post_views = null;
      state.comment_count = null;
      state.likes_n = null;
      state.createds = null;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  readCards,
  fetchFail,
  createBlogSuccess,
  deleteBlogSuccess,
  likeBlogSuccsess,
} = cardsSlice.actions;
export default cardsSlice.reducer;
