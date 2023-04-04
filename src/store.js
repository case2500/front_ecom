import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/users/userSlice';
import productReducer from './features/product/productSlice.js';
import filterReducer from "./features/product/filterSlice";
import cartReducer from "./features/cart/cartSlice";
import authReducer from "./features/auth/authSlice";
import orderReducer from "./features/order/orderSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    product: productReducer,
    filter: filterReducer,
    cart:cartReducer,
    auth: authReducer,
    order: orderReducer,
  },
})