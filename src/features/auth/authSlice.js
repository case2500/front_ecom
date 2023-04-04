import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoggedIn: false,
  user: user ? user : null,
  users: [],
  userid: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",

  user: {
    name: "",
    email: "",
    phone: "",
    address: ""
  },
  token: "",
};

// Update product
export const updateUser = createAsyncThunk(
  "auth/updateuser",
  async ({id,formData}, thunkAPI) => {
    try {

      return await authService.updateuser(id,formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all users
export const getuser = createAsyncThunk(
  "auth/getuser",
  async (id, thunkAPI) => {
    try {
      return await authService.getUser(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      alert("password wrong")
    return thunkAPI.rejectWithValue(message);
  }
});

// Get all users
export const getuserList = createAsyncThunk(
  "auth/getuserlist",
  async (_, thunkAPI) => {
    try {
      return await authService.getuserlist();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_USER(state, action) {
      // const {address} = action.payload
      // alert("setuser=="+JSON.stringify(action.payload.payload.name))

      const profile = action.payload.payload;
      state.user.name = profile.name?profile.name:"";
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.address = profile.address;
      // alert("setuser=="+JSON.stringify(user))
    },
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //  getuserList
      .addCase(getuserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        // alert(JSON.stringify(action.payload))
      })
      .addCase(getuserList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.users = null;
      })

      //  getuser
      .addCase(getuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userid = action.payload;
        alert(JSON.stringify("getuser" + action.payload));
      })
      .addCase(getuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userid = null;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        // state.user = action.payload;
        // alert(JSON.stringify(action.payload))
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { SET_LOGIN, reset, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectUserid = (state) => state.auth.userid;

export default authSlice.reducer;
