import { createSlice } from '@reduxjs/toolkit';

const cashierSlice = createSlice({
  name: 'cashier',
  initialState: {
    isAuthenticated: false,
    userInfo: null,
    error: null,
  },
  reducers: {
    loginCashier(state, action) {
      // Handle login logic for Cashier
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logoutCashier(state) {
      // Handle logout logic for Cashier
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    setCashierError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { loginCashier, logoutCashier, setCashierError } = cashierSlice.actions;
export default cashierSlice.reducer;
