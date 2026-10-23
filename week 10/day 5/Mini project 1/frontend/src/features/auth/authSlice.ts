import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { AuthResponse, User } from "../../../../types/models";
import { apiRequest, authRequest, setAccessToken } from "../../lib/api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: "loading" | "authenticated" | "anonymous";
  error: string | null;
}

const initialState: AuthState = { user: null, accessToken: null, status: "loading", error: null };

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await authRequest<AuthResponse>("/auth/login", credentials);
    setAccessToken(response.accessToken);
    return response;
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (details: { username: string; email: string; password: string }) => {
    const response = await authRequest<AuthResponse>("/auth/register", details);
    setAccessToken(response.accessToken);
    return response;
  },
);

let sessionRestoreRequest: Promise<AuthResponse | null> | null = null;

export const restoreSession = createAsyncThunk(
  "auth/restore",
  async () => {
    if (!sessionRestoreRequest) {
      sessionRestoreRequest = (async () => {
        try {
          const response = await authRequest<AuthResponse>("/auth/refresh");
          setAccessToken(response.accessToken);
          return response;
        } catch (error) {
          if (typeof error === "object" && error !== null && "status" in error && error.status === 401) {
            setAccessToken(null);
            return null;
          }
          throw error;
        }
      })().finally(() => {
        sessionRestoreRequest = null;
      });
    }
    return sessionRestoreRequest;
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await apiRequest<void>("/auth/logout", { method: "POST" });
  } finally {
    setAccessToken(null);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    sessionExpired(state) {
      state.user = null;
      state.accessToken = null;
      state.status = "anonymous";
      state.error = "Your session expired. Please sign in again.";
    },
    tokenRefreshed(state, action: { payload: string }) {
      state.accessToken = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload?.user ?? null;
        state.accessToken = action.payload?.accessToken ?? null;
        state.status = action.payload ? "authenticated" : "anonymous";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = "anonymous";
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.status = "anonymous";
        state.error = action.error.message
          ? `Signed out locally, but the server could not end your session: ${action.error.message}`
          : "You were signed out locally, but the server could not end your session.";
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.status = "anonymous";
        state.error = action.error.message ?? "Unable to restore your session.";
      })
      .addMatcher(isAnyOf(login.rejected, register.rejected), (state, action) => {
        state.status = "anonymous";
        state.error = action.error.message ?? "Unable to authenticate.";
      });
  },
});

export const { clearAuthError, sessionExpired, tokenRefreshed } = authSlice.actions;
export default authSlice.reducer;
