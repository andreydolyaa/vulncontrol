// import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/index";

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
      const response = await api.post("/api/auth/logout", data);
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
      const rawToken = localStorage.getItem("login_token_1");
      const token = rawToken.replace(/"/g, "");
      
      const response = await api.get("/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response ,"REPSONSE");
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    status: "idle",
    message: null,
    tokenName: "login_token_1",
    token: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem(
          state.tokenName,
          JSON.stringify(action.payload?.token)
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {};
        localStorage.clear(state.tokenName);
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getLoggedUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload, "getLoggedUser succeeded");
      })
      .addCase(getLoggedUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;
