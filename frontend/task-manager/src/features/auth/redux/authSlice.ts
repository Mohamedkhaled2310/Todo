import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/axiosInstance"; 
import { AuthState } from "@/utils/types";
import Cookies from "js-cookie";

const storedUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

const initialState: AuthState = {
  user: storedUser,
  loading: false,
  error: null,
};


export const registerUser = createAsyncThunk("auth/register", async (userData: any, { rejectWithValue }) => {
  try {
    const response = await api.post("/user/register", userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});


export const loginUser = createAsyncThunk("auth/login", async (credentials: any, { rejectWithValue }) => {
  try {
    const response = await api.post("/user/login", credentials);
    const { user } = response.data;
    Cookies.set("user", JSON.stringify(user.name), { expires: 7 }); 
    return user;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});


export const fetchUserProfile = createAsyncThunk("auth/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
  }
});


export const updateUserProfile = createAsyncThunk("auth/updateProfile", async (userData: any, { rejectWithValue }) => {
  try {
    const response = await api.put("/user/profile", userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update profile");
  }
});


export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await api.post("/user/logout");
    Cookies.remove("token");
    Cookies.remove("user");
    return null;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      .addCase(fetchUserProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
