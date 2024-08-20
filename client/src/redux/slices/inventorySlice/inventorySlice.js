// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Initial state
// const initialState = {
//   inventories: [],
//   loading: false,
//   error: null,
// };

// // Thunks
// export const fetchInventories = createAsyncThunk(
//   'inventory/fetchInventories',
//   async () => {
//     const response = await axios.get('/api/inventory');
//     return response.data;
//   }
// );

// export const createInventory = createAsyncThunk(
//   'inventory/createInventory',
//   async (inventoryData) => {
//     const response = await axios.post('/api/inventory', inventoryData);
//     return response.data;
//   }
// );

// export const updateInventory = createAsyncThunk(
//   'inventory/updateInventory',
//   async ({ id, ...updateData }) => {
//     const response = await axios.put(`/api/inventory/${id}`, updateData);
//     return response.data;
//   }
// );

// export const deleteInventory = createAsyncThunk(
//   'inventory/deleteInventory',
//   async (id) => {
//     await axios.delete(`/api/inventory/${id}`);
//     return id;
//   }
// );

// // Slice
// const inventorySlice = createSlice({
//   name: 'inventory',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchInventories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchInventories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.inventories = action.payload;
//       })
//       .addCase(fetchInventories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(createInventory.fulfilled, (state, action) => {
//         state.inventories.push(action.payload);
//       })
//       .addCase(updateInventory.fulfilled, (state, action) => {
//         const index = state.inventories.findIndex(inv => inv._id === action.payload._id);
//         if (index !== -1) {
//           state.inventories[index] = action.payload;
//         }
//       })
//       .addCase(deleteInventory.fulfilled, (state, action) => {
//         state.inventories = state.inventories.filter(inv => inv._id !== action.payload);
//       });
//   },
// });

// export default inventorySlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../utils/api';

// Async thunks for inventory operations
export const fetchInventories = createAsyncThunk('inventories/fetchInventories', async () => {
  const response = await API.get('/inventories');
  return response.data;
});

export const fetchInventoryById = createAsyncThunk('inventories/fetchInventoryById', async (id) => {
  const response = await API.get(`/inventories/${id}`);
  return response.data;
});

export const createInventory = createAsyncThunk('inventories/createInventory', async (inventoryData) => {
  const response = await API.post('/inventories', inventoryData);
  return response.data;
});

export const updateInventory = createAsyncThunk('inventories/updateInventory', async ({ id, ...inventoryData }) => {
  const response = await API.put(`/inventories/${id}`, inventoryData);
  return response.data;
});

export const deleteInventory = createAsyncThunk('inventories/deleteInventory', async (id) => {
  await API.delete(`/inventories/${id}`);
  return id;
});

// Inventory slice
const inventorySlice = createSlice({
  name: 'inventories',
  initialState: {
    inventories: [],
    currentInventory: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventories.fulfilled, (state, action) => {
        state.loading = false;
        state.inventories = action.payload;
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchInventoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInventory = action.payload;
      })
      .addCase(fetchInventoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventories.push(action.payload);
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.inventories.findIndex(inventory => inventory._id === action.payload._id);
        if (index !== -1) {
          state.inventories[index] = action.payload;
        }
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventories = state.inventories.filter(inventory => inventory._id !== action.payload);
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default inventorySlice.reducer;

