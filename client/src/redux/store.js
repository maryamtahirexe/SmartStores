import { configureStore } from '@reduxjs/toolkit';
import adminReducer  from './slices/adminSlice/adminSlice'; 
import authReducer  from './slices/auth/authSlice'; 
import ownerReducer  from './slices/ownerSlice/ownerSlice'; 
import updateReducer from './slices/updateSlice/updateSlice';
import inventoryReducer from './slices/inventorySlice/inventorySlice';
import branchReducer from "./slices/branchSlice/branchSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth:authReducer,
    owners:ownerReducer,
    update: updateReducer,
    inventories: inventoryReducer,
    branches: branchReducer,
  },
});

export default store;
