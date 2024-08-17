import { configureStore } from '@reduxjs/toolkit';
import ownerReducer from "../redux/slices/ownerSlice/ownerSlice";
import cashierReducer from "../redux/slices/cashierSlice/cashierSlice";
import userReducer from "../redux/slices/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    owner: ownerReducer,
    cashier: cashierReducer,
    user: userReducer,
  },
});
