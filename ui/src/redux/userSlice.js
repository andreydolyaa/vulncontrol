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

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        // TODO: handle token parsing to get user data
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { display, changeName } = userSlice.actions;
export default userSlice.reducer;
