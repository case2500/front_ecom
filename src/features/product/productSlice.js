import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  product: [],
  products: [],
  categoryproducts: [],
  tmpproducts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
  filteredProducts:[],
  productsearch: [],
};


// Create New Product
export const createProduct = createAsyncThunk(
  "products/create",
  async ({authtoken,values}, thunkAPI) => {
   alert(authtoken);
    try {
      return await productService.createProduct(authtoken,values);
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
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      console.log(id);
      return await productService.getProduct(id);
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

// Get all products
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
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

// Get category products
export const getProductSearch = createAsyncThunk(
  "products/search ",
  async (keyword, thunkAPI) => {
    try {
      // alert("slice"+keyword)
      // console.log(keyword);
      return await productService.getProductSearch(keyword);
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



// Delete a Product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
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


// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ( {id,values}, thunkAPI) => {
    try {
      return await productService.updateProduct(id, values);
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //FILTER_PRODUCTS
    FILTER_PRODUCTS(state, action) {
      state.categoryproducts = action.payload;
    },
    FILTER_BY_SEARCH(state, action) {
    
      const { products, search } = action.payload;
   
      const tempProducts =(products).filter(
        (pro) =>
        pro.name.toLowerCase().includes(search.toLowerCase()) ||
        pro.category.name.toLowerCase().includes(search.toLowerCase())
      );

      
      state.filteredProducts = tempProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(getProductSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        let maxPrice = action.payload.map((p) => p.price)
        state.maxPrice = Math.max(...maxPrice)
        state.filteredProducts = action.payload;
        state.AllfilteredProducts = action.payload;
      
        // AllfilteredProducts: [];  getProductsCategory
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // alert(JSON.stringify(action.payload))
      //  alert("action.payload==="+JSON.stringify(action.payload));
        state.product= action.payload;
      })

 
  },
});

export const {
  FILTER_PRODUCTS,
  GET_PRICE_RANGE,
  FILTER_BY_SEARCH
} = productSlice.actions;

// export const selectIsLoading = (state) => state.product.isLoading;
export const selectProduct = (state) => state.product.product;
export const selectProducts = (state) => state.product.products;

export const selectFilteredProducts = (state) => state.product.filteredProducts;

export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;
export default productSlice.reducer;
