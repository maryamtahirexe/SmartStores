import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../utils/api';

export const fetchOwners = createAsyncThunk('owners/fetchOwners', async () => {
  const response = await API.get('/owner');
  return response.data;
});

export const createOwner = createAsyncThunk('owner/createOwner', async (ownerData) => {
  console.log("Owner Data:", ownerData);
  const response = await API.post('/owner', ownerData);
  return response.data;
});

export const updateOwner = createAsyncThunk('owners/updateOwner', async ({ id, ...ownerData }) => {
  const response = await API.patch(`/owner/${id}`, ownerData);
  return response.data;
});

export const deleteOwner = createAsyncThunk('owners/deleteOwner', async (id) => {
  await API.delete(`/owner/${id}`);
  return id;
});

const ownerSlice = createSlice({
  name: 'owners',
  initialState: {
    owners: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOwners.fulfilled, (state, action) => {
        state.loading = false;
        state.owners = action.payload;
      })
      .addCase(fetchOwners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.owners.push(action.payload);
      })
      .addCase(createOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOwner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.owners.findIndex(owner => owner._id === action.payload._id);
        if (index !== -1) {
          state.owners[index] = action.payload;
        }
      })
      .addCase(updateOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.owners = state.owners.filter(owner => owner._id !== action.payload);
      })
      .addCase(deleteOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ownerSlice.reducer;