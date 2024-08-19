import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user slice
const initialState = {
  email: '',
  password: '',
  role: 'owner',
  loading: false,
  error: null,
  redirectTo: null
};



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    logout(state) {
      state.email = '';
      state.password = '';
      state.role = 'owner';
      state.redirectTo = null;
    },
    setRedirectTo(state, action) {
      state.redirectTo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      
  }
});

export const selectUser = (state) => state.user;


export const { setEmail, setPassword, setRole, logout, setRedirectTo } = userSlice.actions;

export default userSlice.reducer;
