// redux/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://aisun-production.up.railway.app/api/v1"; // Укажите ваш URL

export const handleSignUp = createAsyncThunk(
  "authentication/handleSignUp",
  async (data) => {
    const response = await axios.post(`${baseUrl}/register`, {
      email: data.email,
      password: data.password,
      username: data.username,
      city: data.city,
    });
    return response.data;
  }
);

export const handleSignIn = createAsyncThunk(
  "authentication/handleSignIn",
  async (data) => {
    const response = await axios.post(`${baseUrl}/login`, {
      email: data.email,
      password: data.password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("userData", JSON.stringify(response.data));
    }
    return response.data;
  }
);

export const handleSignOut = createAsyncThunk("authentication/handleSignOut", async () => {
  localStorage.removeItem("userData");
  return {};
});

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleSignUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(handleSignIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(handleSignOut.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export default authSlice.reducer;
