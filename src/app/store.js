import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "features/Todo/todoSlice";
import userReducer from "features/Auth/userSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
});

export default store;
