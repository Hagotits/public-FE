import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/auth/signup`, userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, userData);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "auth/authUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/auth/auth`);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/auth/logout`);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);
