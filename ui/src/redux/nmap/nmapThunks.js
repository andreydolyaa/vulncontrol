import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";

export const startScan = createAsyncThunk(
  "nmap/startScan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/nmap", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const getScans = createAsyncThunk(
  "nmap/getScans",
  async ({ currentPage, limit, search }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/nmap/scans?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
      );
      return {
        scans: response.data.scans,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const abortScan = createAsyncThunk(
  "nmap/abortScan",
  async (scanId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/nmap/abort/${scanId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const deleteScan = createAsyncThunk(
  "nmap/deleteScan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/nmap/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const getScanById = createAsyncThunk(
  "nmap/getScanById",
  async (scanId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/nmap/${scanId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);
