import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";

export const getGeolocationPoints = createAsyncThunk(
  "geolocation/getGeolocationPoints",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/geolocation", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);