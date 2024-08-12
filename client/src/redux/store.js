import { configureStore } from '@reduxjs/toolkit';
import adminReducer  from './slices/adminSlice/adminSlice'; 
import authReducer  from './slices/auth/authSlice'; 
import ownerReducer  from './slices/ownerSlice/ownerSlice'; 
import updateReducer from './slices/updateSlice/updateSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth:authReducer,
    owners:ownerReducer,
    update: updateReducer,
  },
});

export default store;
