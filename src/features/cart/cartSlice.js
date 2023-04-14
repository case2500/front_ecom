import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
         const { price, name } = action;
  
      const itemInCart = state.cart.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity:  action.payload.quantity });
      }
    
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload._id);
      item.quantity++;
      // alert(JSON.stringify(state))
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload._id);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
      // alert(JSON.stringify(state))
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item._id !== action.payload);
      state.cart = removeItem;
    },
    CLEAR_CART: (state, action) => {
      state.cart= [];
    }, 
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  CLEAR_CART
} = cartSlice.actions;

export default cartSlice.reducer;