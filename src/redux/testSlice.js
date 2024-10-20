import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "../common/api";

const BASE_URL = "http://localhost:5000/api/v1";

export const signUp = createAsyncThunk(
  "testSlice/signUp",
  async (params, thunkAPI) => {
    try {
      const response = await callApi(`${BASE_URL}/init-company`, "POST", {
        ...params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

export const otpVerification = createAsyncThunk(
  "testSlice/otpVerification",
  async (params, thunkAPI) => {
    try {
      const response = await callApi(`${BASE_URL}/verify-otp`, "POST", {
        ...params,
      });

      if (response?.data?.token) {
        localStorage.setItem("token", response?.data?.token);
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

export const createInterview = createAsyncThunk(
  "testSlice/createInterview",
  async (params, thunkAPI) => {
    try {
      const response = await callApi(
        `${BASE_URL}/create-interview`,
        "POST",
        {
          ...params,
        },
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

export const verifyToken = createAsyncThunk(
  "testSlice/verifyToken",
  async (params, thunkAPI) => {
    try {
      const response = await callApi(
        `${BASE_URL}/verify-token`,
        "GET",
        {},
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

const testSlice = createSlice({
  name: "testSlice",
  initialState: {
    signupData: {
      isLoading: false,
      status: null,
      companyId: null,
      message: null,
    },
    otpVerification: {
      isLoading: false,
      emailStatus: false,
      phoneStatus: false,
      token: null,
    },
    createInterview: {
      isLoading: false,
      status: false,
    },
    verifyToken: {
      isLoading: false,
      status: null,
    },
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.signupData.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signupData.isLoading = false;
        state.signupData.status = action.payload.success;
        state.signupData.message = action.payload.data.message;
        state.signupData.companyId = action.payload.data.companyId;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signupData.isLoading = false;
        state.signupData.message = action.payload.message;
      });
    ///////////////////////////////////////////////////////////
    builder
      .addCase(otpVerification.pending, (state) => {
        state.otpVerification.isLoading = true;
      })
      .addCase(otpVerification.fulfilled, (state, action) => {
        state.otpVerification.isLoading = false;
        state.otpVerification.emailStatus =
          action?.payload?.data?.isEmailVerified;
        state.otpVerification.phoneStatus =
          action?.payload?.data?.isPhoneVerified;
        state.otpVerification.token = action?.payload?.data?.token;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.otpVerification.isLoading = false;
      });
    ///////////////////////////////////////////////////////////
    builder
      .addCase(createInterview.pending, (state) => {
        state.createInterview.isLoading = true;
      })
      .addCase(createInterview.fulfilled, (state, action) => {
        state.createInterview.isLoading = false;
        state.createInterview.status = action.payload?.status;
      })
      .addCase(createInterview.rejected, (state, action) => {
        state.createInterview.isLoading = false;
      });
    ///////////////////////////////////////////////////////////
    builder
      .addCase(verifyToken.pending, (state) => {
        state.verifyToken.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.verifyToken.isLoading = false;
        state.verifyToken.status = action.payload?.status;
        state.otpVerification.token = action.payload?.status ? localStorage.getItem('token') : null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.verifyToken.isLoading = false;
        state.verifyToken.status = action.payload?.status;
        localStorage.clear();
      });
  },
});

export const { increment, decrement, incrementByAmount } = testSlice.actions;
export default testSlice.reducer;
