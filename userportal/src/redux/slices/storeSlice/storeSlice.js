// // src/redux/slices/storeSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchStoreAPI } from '@/utils/api';

// export const fetchStores = createAsyncThunk(
//   'stores/fetchStores',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchStoreAPI();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch stores');
//     }
//   }
// );

// const storeSlice = createSlice({
//   name: 'stores',
//   initialState: {
//     stores: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStores.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchStores.fulfilled, (state, action) => {
//         state.stores = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchStores.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });
//   },
// });

// export const selectStores = (state) => state.stores;
// export default storeSlice.reducer;
