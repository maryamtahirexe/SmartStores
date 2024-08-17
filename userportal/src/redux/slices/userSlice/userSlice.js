import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state for the user slice
const initialState = {
  email: '',
  password: '',
  role: 'owner',
  loading: false,
  error: null,
  redirectTo: null
};

// Create an async thunk for handling login (replace with actual logic if connecting to an API)
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData, { rejectWithValue }) => {
    // Simulate login logic or replace with actual API call
    try {
      // Example of an API call (uncomment when connecting to a backend)
      // const response = await axios.post('/api/auth/login', formData);
      // return response.data;

      // Simulated login result
      return formData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Login failed');
    }
  }
);

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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle redirect based on role
        state.redirectTo = action.payload.role === 'owner' ? '/owner-dashboard' : '/cashier-dashboard';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const selectUser = (state) => state.user;


export const { setEmail, setPassword, setRole, logout, setRedirectTo } = userSlice.actions;

export default userSlice.reducer;
