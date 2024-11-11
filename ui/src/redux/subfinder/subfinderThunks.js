import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";

export const startSubfinderScan = createAsyncThunk(
  "subfinder/startSubfinderScan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/subfinder", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const getScans = createAsyncThunk(
  "subfinder/getScans",
  async ({ currentPage, limit, search }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/subfinder/scans?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
      );
      return {
        scans: response.data?.data?.scans || [],
        totalPages: response.data?.data?.totalPages || 1,
        currentPage: response.data?.data?.currentPage || 1,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const deleteSubfinderScan = createAsyncThunk(
  "subfinder/deleteSubfinderScan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/subfinder/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);
