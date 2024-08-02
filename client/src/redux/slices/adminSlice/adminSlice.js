
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API, login } from '../../../utils/api';
import Cookies from 'js-cookie';

// Thunk for admin login

export const loginAdmin = createAsyncThunk('admin/loginAdmin', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await login({ email, password });
    const token = response.data.token;
  localStorage.setItem('token', token);
  Cookies.set('token', token);
    console.log(response.data.token);
    Cookies.set('token', response.data.token);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    // Store token in cookies

    return response.data;
  } catch (error) {
    console.error('Error response:', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

// Thunk for fetching stores with owners
export const fetchStoresWithOwners = createAsyncThunk('admin/fetchStoresWithOwners', async (_, { rejectWithValue }) => {
  try {
    const response = await API.get('/stores/with-owners');
    return response.data.stores;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: localStorage.getItem('token') || null,
    error: null,
    loading: false,
    stores: [],
    storesStatus: 'idle',
    storesError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.error = null;
        // Optionally dispatch an action to set user details if needed
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchStoresWithOwners.pending, (state) => {
        state.storesStatus = 'loading';
        state.storesError = null;
      })
      .addCase(fetchStoresWithOwners.fulfilled, (state, action) => {
        state.storesStatus = 'succeeded';
        state.stores = action.payload;
      })
      .addCase(fetchStoresWithOwners.rejected, (state, action) => {
        state.storesStatus = 'failed';
        state.storesError = action.payload.message;
      });
  },
});

export default adminSlice.reducer;
