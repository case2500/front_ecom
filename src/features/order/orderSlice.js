import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL_ORDERS,BACKEND_URL } from "../../configurl.js";
// Create new Order
//export const API_URL_ORDERS = `${BACKEND_URL}/api/orders/`;
export const saveOrder = createAsyncThunk(
  "cart/saveOrder",
  async (formData, thunkAPI) => {
    try {
      return await axios.post(`${BACKEND_URL}/api/order`, formData);
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

// updateOrder
// Get a product id
export const updateOrder = createAsyncThunk(
  "cart/updateOrder",
  async (formData, thunkAPI) => {
    try {
      alert("formData" + JSON.stringify(formData));
      return await axios.post(
        `${BACKEND_URL}/api/order/`+  `updateOrder`,
        formData
      );
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

// Get a product id
export const getOrders = createAsyncThunk(
  "cart/getOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/order`);
      return response.data;
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

// Get a product id
export const getOrder = createAsyncThunk(
  "cart/getOrder",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/order/`+id);
     alert(JSON.stringify(response.data ));
      return response.data;
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

const orderSlice = createSlice({
  name: "cart",
  initialState: {
    order: [],
    orders: [],
    filteredProducts:[]
  },
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const search =  action.payload.search;
      let tempProducts = action.payload.strAscending.filter(
        (product) =>
        product&& product.status.toLowerCase().includes(search.toLowerCase()) ||
        product&&product.user.toLowerCase().includes(search.toLowerCase())
      );  
    state.filteredProducts = (tempProducts)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload;
        state.orderItems = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.orders = action.payload;
      });
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  CLEAR_CART,
  FILTER_BY_SEARCH,
} = orderSlice.actions;

export const selectOrder = (state) => state.order.order;
export const selectOrders = (state) => state.order.orders;
export default orderSlice.reducer;
