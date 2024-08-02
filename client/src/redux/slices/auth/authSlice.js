import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin } from '../adminSlice/adminSlice';
import Cookies from 'js-cookie'; //changed

const initialState = {
  userId: null,
  token: localStorage.getItem('token') || null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userId = null;
      state.token = null;
      localStorage.removeItem('token');
      Cookies.remove('token');//changed
    },
    //changed
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      Cookies.set('token', action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId; 
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  
  
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
