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
    publish_date: null,
    author: null,
    status: null,
    slug: null,
    comments: null,
    category_name: null,
    likes: null,
    post_views: null,
    comment_count: null,
    likes_n: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    readCards: (state, { payload }) => {
      state.loading = false;
      state.id = payload?.id;
      state.title = payload?.title;
      state.content = payload?.content;
      state.image = payload?.image;
      state.category = payload?.category;
      state.publish_date = payload?.publish_date;
      state.author = payload?.author;
      state.status = payload?.status;
      state.slug = payload?.slug;
      state.comments = payload?.comments;
      state.category_name = payload?.category_name;
      state.likes = payload?.likes;
      state.post_views = payload?.post_views;
      state.comment_count = payload?.comment_count;
      state.likes_n = payload?.likes_n;
    },
    createBlogSuccess: (state,{ payload }) => {
      state.loading = false;
      state.id = payload?.id;
      state.title = payload?.title;
      state.content = payload?.content;
      state.image = payload?.image;
      state.category = payload?.category;
      state.publish_date = payload?.publish_date;
      state.author = payload?.author;
      state.status = payload?.status;
      state.slug = payload?.slug;
      state.comments = payload?.comments;
      state.category_name = payload?.category_name;
      state.likes = payload?.likes;
      state.post_views = payload?.post_views;
      state.comment_count = payload?.comment_count;
      state.likes_n = payload?.likes_n;
    },
    deleteBlogSuccess:(state) => {
      state.loading = false;
      state.id = null;
      state.title = null;
      state.content = null;
      state.image = null;
      state.category = null;
      state.publish_date = null;
      state.author = null;
      state.status = null;
      state.slug = null      
      state.comments = null;
      state.category_name = null;
      state.likes = null
      state.post_views = null;
      state.comment_count = null;
      state.likes_n = null;
    },
   
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, readCards, fetchFail,createBlogSuccess,deleteBlogSuccess } = cardsSlice.actions;
export default cardsSlice.reducer;
