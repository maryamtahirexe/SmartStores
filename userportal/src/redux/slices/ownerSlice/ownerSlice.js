// src/redux/slices/ownerSlice/ownerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStoreAPI, loginOwnerAPI, updateAdminAPI } from '@/utils/api';
import Cookies from 'js-cookie';

// Async thunk for owner login
export const loginOwner = createAsyncThunk(
  'owner/loginOwner',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginOwnerAPI({ email, password });
      Cookies.set('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Login failed');
    }
  }
);

// Async thunk for fetching stores
export const fetchStores = createAsyncThunk(
  'owner/fetchStores',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchStoreAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch stores');
    }
  }
);

// Async thunk for updating profile
export const updateAdmin = createAsyncThunk(
  'owner/updateAdmin',
  async ({ email, oldPassword, password }, { rejectWithValue }) => {
    try {
      const response = await updateAdminAPI({ email, oldPassword, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to update profile');
    }
  }
);

const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    isAuthenticated: false,
    userInfo: null,
    stores: [],
    error: null,
    loading: false,
    updateLoading: false,
    updateMessage: '',
  },
  reducers: {
    logoutOwner(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.stores = [];
    },
    setOwnerError(state, action) {
      state.error = action.payload;
    },
    clearUpdateMessage(state) {
      state.updateMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginOwner.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userInfo = action.payload.user;
        state.stores = action.payload.user.stores;
      })
      .addCase(loginOwner.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.loading = false;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.updateLoading = true;
        state.updateMessage = '';
        state.error = '';
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateMessage = action.payload.message;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectOwnerStores = (state) => ({
  stores: state.owner.stores,
  loading: state.owner.loading,
  error: state.owner.error,
});
export const selectUpdateStatus = (state) => ({
  updateMessage: state.owner.updateMessage,
  updateLoading: state.owner.updateLoading,
  error: state.owner.error,
});

export const { logoutOwner, setOwnerError, clearUpdateMessage } = ownerSlice.actions;
export default ownerSlice.reducer;

// // // import { createSlice } from '@reduxjs/toolkit';

// // // const ownerSlice = createSlice({
// // //   name: 'owner',
// // //   initialState: {
// // //     isAuthenticated: false,
// // //     userInfo: null,
// // //     error: null,
// // //   },
// // //   reducers: {
// // //     loginOwner(state, action) {
// // //       // Handle login logic for Owner
// // //       state.isAuthenticated = true;
// // //       state.userInfo = action.payload;
// // //     },
// // //     logoutOwner(state) {
// // //       // Handle logout logic for Owner
// // //       state.isAuthenticated = false;
// // //       state.userInfo = null;
// // //     },
// // //     setOwnerError(state, action) {
// // //       state.error = action.payload;
// // //     },
// // //   },
// // // });

// // // export const { loginOwner, logoutOwner, setOwnerError } = ownerSlice.actions;
// // // export default ownerSlice.reducer;


// // import { addProductAPI, loginOwnerAPI } from '@/utils/api';
// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // export const loginOwner = createAsyncThunk(
// //   'owner/loginOwner',
// //   async ({ email, password}, { rejectWithValue }) => {
// //     try {
// //       // Replace with actual API call
// //       console.log("Owner Slice mein its fine")
// //       const response = await loginOwnerAPI({ email, password });
// //       return response.data;

// //       // Simulated login response
// //       // const simulatedResponse = {
// //       //   email,
// //       //   role,
// //       //   token: 'simulated-jwt-token', // This would normally come from the API
// //       // };

// //       // return simulatedResponse;
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data?.msg || 'Login failed');
// //     }
// //   }
// // );

// // // Async thunk for adding a product
// // export const addProduct = createAsyncThunk(
// //   'owner/addProduct',
// //   async (productData, { rejectWithValue }) => {
// //     console.log("Product Data in slice", productData)
// //     try {
// //       const response = await addProductAPI(productData);
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );


// // const ownerSlice = createSlice({
// //   name: 'owner',
// //   initialState: {
// //     isAuthenticated: false,
// //     userInfo: null,
// //     error: null,
// //     products: [], // Add products array to the state
// //     addProductStatus: null, // To track the status of adding a product
// //   },
// //   reducers: {
// //     loginOwner(state, action) {
// //       state.isAuthenticated = true;
// //       state.userInfo = action.payload;
// //     },
// //     logoutOwner(state) {
// //       state.isAuthenticated = false;
// //       state.userInfo = null;
// //     },
// //     setOwnerError(state, action) {
// //       state.error = action.payload;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(addProduct.pending, (state) => {
// //         state.addProductStatus = 'loading';
// //       })
// //       .addCase(addProduct.fulfilled, (state, action) => {
// //         state.products.push(action.payload);
// //         state.addProductStatus = 'succeeded';
// //       })
// //       .addCase(addProduct.rejected, (state, action) => {
// //         state.error = action.payload;
// //         state.addProductStatus = 'failed';
// //       })
// //       .addCase(loginOwner.fulfilled, (state, action) => {
// //         state.isAuthenticated = true;
// //         state.userInfo = action.payload.user;
// //         state.stores = action.payload.user.stores; // Store the associated stores
// //       })
// //       .addCase(loginOwner.rejected, (state, action) => {
// //         state.error = action.payload;
// //         state.isAuthenticated = false;
// //       });
// //   },
// // });

// // export const { setOwnerError } = ownerSlice.actions;
// // export default ownerSlice.reducer;


// // src/redux/slices/ownerSlice.js



// // src/redux/slices/ownerSlice/ownerSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchStoreAPI, loginOwnerAPI } from '@/utils/api';
// import Cookies from 'js-cookie';

// // Async thunk for owner login
// export const loginOwner = createAsyncThunk(
//   'owner/loginOwner',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await loginOwnerAPI({ email, password });
//       // Store token in cookies or localStorage if needed
//       Cookies.set('token', response.data.token);
//       console.log(
//         response.data
//       )
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.msg || 'Login failed');
//     }
//   }
// );

// // Async thunk for fetching stores
// export const fetchStores = createAsyncThunk(
//   'owner/fetchStores',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchStoreAPI();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to fetch stores');
//     }
//   }
// );


// const ownerSlice = createSlice({
//   name: 'owner',
//   initialState: {
//     isAuthenticated: false,
//     userInfo: null,
//     stores: [],
//     error: null,
//     loading: false,
//   },
//   reducers: {
//     logoutOwner(state) {
//       state.isAuthenticated = false;
//       state.userInfo = null;
//       state.stores = [];
//     },
//     setOwnerError(state, action) {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginOwner.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.userInfo = action.payload.user;
//         state.stores = action.payload.user.stores; // Update stores from login
//       })
//       .addCase(loginOwner.rejected, (state, action) => {
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       })
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

// // Selectors
// export const selectOwnerStores = (state) => ({
//   stores: state.owner.stores,
//   loading: state.owner.loading,
//   error: state.owner.error,
// });

// export const { logoutOwner, setOwnerError } = ownerSlice.actions;
// export default ownerSlice.reducer;
