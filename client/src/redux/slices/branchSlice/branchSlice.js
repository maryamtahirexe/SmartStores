import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for your API
const API_URL = "http://localhost:5000/branches";

// Thunks for async operations
export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/stores/${storeId}/branches`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBranchById = createAsyncThunk(
  "branches/fetchBranchById",
  async ({ storeId, branchId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/stores/${storeId}/branches/${branchId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBranch = createAsyncThunk(
  "branches/createBranch",
  async ({ storeId, branchData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/stores/${storeId}/branches`, branchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBranch = createAsyncThunk(
  "branches/updateBranch",
  async ({ storeId, id, branchData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/stores/${storeId}/branches/${id}`, branchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "branches/deleteBranch",
  async ({ storeId, id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/stores/${storeId}/branches/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  branches: [],
  branch: null,
  loading: false,
  error: null,
};

// Slice
const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBranchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranchById.fulfilled, (state, action) => {
        state.loading = false;
        state.branch = action.payload;
      })
      .addCase(fetchBranchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches.push(action.payload);
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = state.branches.map((branch) =>
          branch._id === action.payload._id ? action.payload : branch
        );
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = state.branches.filter(
          (branch) => branch._id !== action.payload
        );
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default branchSlice.reducer;
