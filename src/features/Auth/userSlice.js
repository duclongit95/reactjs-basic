import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-keys";

export const registerUserApi = createAsyncThunk(
  "user/register",
  async (payload) => {
    const data = await userApi.register(payload);

    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    return data.user;
  }
);

export const loginUserApi = createAsyncThunk("user/login", async (payload) => {
  const data = await userApi.login(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
  },
  reducers: {
    logout: (state, action) => {
      state.current = {};
    },
  },
  extraReducers: {
    [registerUserApi.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [loginUserApi.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
const { logout } = actions;
export { logout };
export default reducer;
