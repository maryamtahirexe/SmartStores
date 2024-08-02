import { configureStore } from '@reduxjs/toolkit';
import adminReducer  from './slices/adminSlice/adminSlice'; 

const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export default store;
