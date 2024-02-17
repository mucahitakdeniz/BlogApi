import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import cardsReducer from "../features/cardsSlice";
import authReducer from "../features/authSlice";
import blogReducer from "../features/blogSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer,);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    card: cardsReducer,
    blogs: blogReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;
