import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import {
  API,
  deleteStores,
  fetchOwner,
  fetchStores,
  login,
} from "../../../utils/api";
import Cookies from "js-cookie";


export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await login({ email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      Cookies.set("token", token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStoresss = createAsyncThunk(
  "admin/fetchStoresWithOwnersssss",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/stores");
      return response.data.stores;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStoresWithOwners = createAsyncThunk(
  "admin/fetchStoresWithOwners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchStores();
      return response.data.stores;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchStoreById = createAsyncThunk(
  "admin/fetchStoreById",
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/stores/${storeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addStore = createAsyncThunk(
  "admin/addStore",
  async (storeData, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post("/stores/stores", storeData);
      dispatch(fetchStoresWithOwners());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteStore = createAsyncThunk(
  "admin/deleteStore",
  async (storeId, { rejectWithValue }) => {
    try {
      await deleteStores(storeId);
      return storeId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOwnersByStoreId = createAsyncThunk(
  "admin/fetchOwnersByStoreId",
  async (storeId, { rejectWithValue }) => {
    try{
    const response = await API.get(`/owner/${storeId}`);
    console.log("ok", response.data);
    return response.data;
  }catch (error){
    return rejectWithValue(error.response.data);
  }
  }
);

export const updateStore = createAsyncThunk(
  "admin/updateStore",
  async ({ id, ...storeData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.patch(`/stores/${id}`, storeData);

      dispatch(fetchStoresWithOwners());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





export const addInventory = createAsyncThunk(
  "admin/addInventory",
  async (inventoryData, { rejectWithValue }) => {
    try {
      const response = await API.post("/inventories", inventoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInventory = createAsyncThunk(
  "admin/updateInventory",
  async ({ id, ...inventoryData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/inventories/${id}`, inventoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const fetchBranches = createAsyncThunk(
//   "admin/fetchBranches",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get(`/branches/branch`);
//       console.log("Fetched branches:", response.data); // Add this line
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const fetchBranches = createAsyncThunk(
  "admin/fetchBranches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/branches/branch");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const addBranch = createAsyncThunk(
//   "admin/addBranch",
//   async (branchData, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await API.post("/stores/:storeId/branches", branchData);
//       dispatch(fetchBranches());
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const addBranch = createAsyncThunk(
  "admin/addBranch",
  async (branchData, { rejectWithValue, dispatch }) => {
    try {
      // Use the actual storeId in the URL
      const response = await API.post(`/stores/${branchData.storeId}/branches`, branchData);

      dispatch(fetchBranches());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBranch = createAsyncThunk(
  "admin/updateBranch",
  async ({ id, ...branchData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.patch(`/branches/${id}`, branchData);
      dispatch(fetchBranches());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const deleteBranch = createAsyncThunk(
//   "admin/deleteBranch",
//   async (branchId, { rejectWithValue, dispatch }) => {
//     try {
//       await API.delete(`/branches/${branchId}`);
//       dispatch(fetchBranches());
//       return branchId;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const deleteBranch = createAsyncThunk(
  "admin/deleteBranch",
  async ({ storeId, id }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/branches/${id}`, { data: { storeId } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBranchById = createAsyncThunk(
  "admin/fetchBranchById",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/branches/${branchId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchInventories = createAsyncThunk(
  "admin/fetchInventories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/inventories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOwners = createAsyncThunk(
  "owners/fetchOwners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchOwner();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: localStorage.getItem("token") || null,
    inventories: [],
    inventoriesStatus: "idle",
    inventoriesError: null,
    branches: [], // Add branch-related state
    branchesStatus: "idle",
    branchesError: null,
    error: null,
    loading: false,
    stores: [],
    storesStatus: "idle",
    storesError: null,
    owners: [],
    ownersStatus: "idle",
    ownersError: null,
    addStoreStatus: "idle",
    addStoreError: null,
    store: null,
    storeStatus: "idle",
    storeError: null,
    updateStoreStatus: "idle",
    updateStoreError: null,
    deleteStoreStatus: "idle",
    deleteStoreError: null,
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
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })


      .addCase(fetchStoresWithOwners.pending, (state) => {
        state.storesStatus = "loading";
        state.storesError = null;
      })
      .addCase(fetchStoresWithOwners.fulfilled, (state, action) => {
        state.storesStatus = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStoresWithOwners.rejected, (state, action) => {
        state.storesStatus = "failed";
        state.storesError = action.payload.message;
      })


      .addCase(fetchOwners.pending, (state) => {
        state.ownersStatus = "loading";
        state.ownersError = null;
      })
      .addCase(fetchOwners.fulfilled, (state, action) => {
        state.ownersStatus = "succeeded";
        state.owners = action.payload;
      })
      .addCase(fetchOwners.rejected, (state, action) => {
        state.ownersStatus = "failed";
        state.ownersError = action.payload.message;
      })


      .addCase(fetchStoreById.pending, (state) => {
        state.storeStatus = "loading";
        state.storeError = null;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.storeStatus = "succeeded";
        // Destructure inventories from the response payload
        const { inventories, ...rest } = action.payload;
        state.store = {
          ...rest,
          inventories,
        };
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.storeStatus = "failed";
        state.storeError = action.payload.message;
      })


      .addCase(addStore.pending, (state) => {
        state.addStoreStatus = "loading";
        state.addStoreError = null;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.addStoreStatus = "succeeded";
        if (action.payload) {
          console.log("action payload is", action.payload);
          state.stores.push(action.payload); 
          state.storeStatus = "idle";
        } else {
          console.warn("Received empty payload from addStore");
        }
      })
      .addCase(addStore.rejected, (state, action) => {
        state.addStoreStatus = "failed";
        state.addStoreError = action.payload.message;
      })


      .addCase(deleteStore.pending, (state) => {
        state.deleteStoreStatus = "loading";
        state.deleteStoreError = null;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.deleteStoreStatus = "succeeded";
        state.stores = state.stores.filter(
          (store) => store.id !== action.payload
        );
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.deleteStoreStatus = "failed";
        state.deleteStoreError = action.payload.message;
      })

 
      .addCase(updateStore.pending, (state) => {
        state.updateStoreStatus = "loading";
        state.updateStoreError = null;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.updateStoreStatus = "succeeded";
        const index = state.stores.findIndex(
          (store) => store.id === action.payload.id
        );
        if (index !== -1) {
          state.stores[index] = action.payload;
        }
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.updateStoreStatus = "failed";
        state.updateStoreError = action.payload.message;
      })
      .addCase(fetchOwnersByStoreId.pending, (state) => {
        state.ownersStatus = "loading";
        state.storesError = null;
      })
      .addCase(fetchOwnersByStoreId.fulfilled, (state, action) => {
        state.ownersStatus = "succeeded";
        state.owners = action.payload;
      })
      .addCase(fetchOwnersByStoreId.rejected, (state, action) => {
        state.ownersStatus = "failed";
        state.ownersError = action.error.message;
      })
      .addCase(fetchInventories.pending, (state) => {
        state.inventoriesStatus = 'loading';
      })
      .addCase(fetchInventories.fulfilled, (state, action) => {
        state.inventoriesStatus = 'succeeded';
        state.inventories = action.payload;
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.inventoriesStatus = 'failed';
        state.inventoriesError = action.error.message;
      })
      .addCase(fetchBranches.pending, (state) => {
        state.branchesStatus = "loading";
        state.branchesError = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.branchesStatus = "succeeded";
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.branchesStatus = "failed";
        state.branchesError = action.payload.message;
      })

      .addCase(addBranch.pending, (state) => {
        state.branchesStatus = "loading";
        state.branchesError = null;
      })
      .addCase(addBranch.fulfilled, (state, action) => {
        state.branchesStatus = "succeeded";
        state.branches.push(action.payload);
      })
      .addCase(addBranch.rejected, (state, action) => {
        state.branchesStatus = "failed";
        state.branchesError = action.payload.message;
      })

      .addCase(updateBranch.pending, (state) => {
        state.branchesStatus = "loading";
        state.branchesError = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.branchesStatus = "succeeded";
        const index = state.branches.findIndex(
          (branch) => branch.id === action.payload.id
        );
        if (index !== -1) {
          state.branches[index] = action.payload;
        }
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.branchesStatus = "failed";
        state.branchesError = action.payload.message;
      })

      .addCase(deleteBranch.pending, (state) => {
        state.branchesStatus = "loading";
        state.branchesError = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.branchesStatus = "succeeded";
        state.branches = state.branches.filter(
          (branch) => branch.id !== action.payload
        );
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.branchesStatus = "failed";
        state.branchesError = action.payload.message;
      })
      .addCase(fetchBranchById.pending,(state)=>{
        state.branchesStatus = "loading";
        state.branchesError = null;
      })
      .addCase(fetchBranchById.fulfilled,(state, action)=>{
        state.branchesStatus = "succeeded";
        state.branches = action.payload;
      })
      .addCase(fetchBranchById.rejected,(state, action)=>{
        state.branchesStatus = "failed";
        state.branchesError = action.payload.message;
      });
  },
});

export default adminSlice.reducer;
//fetchBranchById