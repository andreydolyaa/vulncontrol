import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/index";
import { createBearerToken } from "../utils";

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", data);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({ message: "An error occurred" });
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/register", data);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: createBearerToken(
              import.meta.env.VITE_AUTH_TOKEN_NAME
            ),
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const getLoggedUser = createAsyncThunk(
  "user/getLoggedUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/auth/user", {
        headers: {
          Authorization: createBearerToken(
            import.meta.env.VITE_AUTH_TOKEN_NAME
          ),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    user: null,
    loading: false,
    message: null,
    tokenName: import.meta.env.VITE_AUTH_TOKEN_NAME,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        localStorage.setItem(
          state.tokenName,
          JSON.stringify(action.payload.token)
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.message = action.payload;
        console.log(state.message, "state.message");
        
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        localStorage.clear(state.tokenName);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(getLoggedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getLoggedUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.message = action.payload;
      });
  },
});

export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;
