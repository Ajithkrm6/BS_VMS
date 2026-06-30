import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, LoginPayload, RegisterPayload } from '~/types/auth';
import { loginAPI, registerAPI, logoutAPI, getCurrentUserAPI } from '~/services/authAPI';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Login Thunk
 */
export const loginUser = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  const response = await loginAPI(payload);
  return response;
});

/**
 * Register Thunk
 */
export const registerUser = createAsyncThunk('auth/register', async (payload: RegisterPayload) => {
  const response = await registerAPI(payload);
  return response;
});

/**
 * Logout Thunk
 */
export const logoutUser = createAsyncThunk('auth/logout', async (token: string) => {
  await logoutAPI(token);
});

/**
 * Validate Token on App Load
 */
export const validateSession = createAsyncThunk('auth/validateSession', async (token: string) => {
  const user = await getCurrentUserAPI(token);
  return { user, token };
});

/**
 * Auth Slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // Save to localStorage
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // Save to localStorage
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        // Clear localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Logout failed';
      });

    // Validate Session
    builder
      .addCase(validateSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(validateSession.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        // Clear localStorage on validation failure
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
