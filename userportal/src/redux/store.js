import { configureStore } from '@reduxjs/toolkit';
import ownerReducer  from './slices/ownerSlice/page.js'; 
import cashierReducer  from './slices/cashierReducer/page.js'; 

const store = configureStore({
  reducer: {
    owner: ownerReducer,
    cashier:cashierReducer,
  },
});

export default store;
