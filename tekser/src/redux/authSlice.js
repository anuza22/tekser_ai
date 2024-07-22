import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const parseJSON = (item) => {
  try {
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
};

export const loginUser = createAsyncThunk('auth/loginUser', async ({ login, password }, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:6161/api/v1/login', { kundelikLogin: login, kundelikPassword: password });
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  } catch (error) {
    return thunkAPI.rejectWithValue('Login or password is incorrect');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: parseJSON(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    login: null,
    password: null,
    isLoading: false,
    isAuthenticate: !!localStorage.getItem('token'),
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticate = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticate = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;


