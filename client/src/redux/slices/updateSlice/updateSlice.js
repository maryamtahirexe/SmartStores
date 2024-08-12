import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../utils/api';

export const updateAdmin = createAsyncThunk(
  'admin/updateAdmin',
  async ({ email, oldPassword, password }, { rejectWithValue }) => {
    try {
      const response = await API.patch('/auth/update', { email, oldPassword,  password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateSlice = createSlice({
  name: 'update',
  initialState: {
    loading: false,
    message: '',
    error: ''
  },
  reducers: {
    clearMessage: (state) => {
      state.message = '';
    },
    clearError: (state) => {
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = '';
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  }
});

export const { clearMessage, clearError } = updateSlice.actions;

export default updateSlice.reducer;