import { createSlice } from '@reduxjs/toolkit';

const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    isAuthenticated: false,
    userInfo: null,
    error: null,
  },
  reducers: {
    loginOwner(state, action) {
      // Handle login logic for Owner
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logoutOwner(state) {
      // Handle logout logic for Owner
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    setOwnerError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { loginOwner, logoutOwner, setOwnerError } = ownerSlice.actions;
export default ownerSlice.reducer;
