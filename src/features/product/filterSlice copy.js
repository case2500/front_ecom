import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  filteredProducts: [],
  AllfilteredProducts: [],
};

// Get category products
export const getProductSearch = createAsyncThunk(
  "product/search ",
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

// Get category products
export const getProductsCategory = createAsyncThunk(
  "product/getsingle",
  
  async (kindcategory, thunkAPI) => {
    try {
      //  alert(kindcategory)
      // alert(kindcategory);
      return await productService.getProductsCat(kindcategory);
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


const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    update_filteredProducts(state, action) {
      const { ProductSearch } = action.payload;
      const tempProducts = ProductSearch;
      state.filteredProducts = tempProducts;
      state.AllfilteredProducts = tempProducts;
      // alert(JSON.stringify(state.filteredProducts))
    },

    FILTER_BY_SEARCH(state, action) {
      const { tmpproducts, search } = action.payload;
      const tempProducts = tmpproducts.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
    FILTER_BY_BRAND(state, action) {
      const {
      
        AllFilteredProducts,
        brand,
        price,

      } = action.payload;
      //  alert("brand=>" + brand + FilteredProducts);
      let tempProducts = [];
      if (brand === "All") {
        tempProducts = AllFilteredProducts;
      } else {
        tempProducts = AllFilteredProducts.filter(
          (product) => product.brand === brand
          
        );
        // alert("brand=>"+tempProducts);
  
      // }
      // if (color !== "all") {
      //   tempProducts = tempProducts.filter((product) => {
      //     return product.colors.find((c) => c === color);
      //   });
      }
      // filter by price
      if (price !== "") {
        tempProducts = tempProducts.filter((product) => product.price <= price);

      }

      // filter by shipping
      // if (shipping) {
      //   tempProducts = tempProducts.filter(
      //     (product) => product.shipping === true
      //   );
      // }
      // return {  filteredProducts: tempProducts };
      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products;
      }

      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = tempProducts;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProducts;
    },

    // FILTER_BY_PRICE(state, action) {
    //   const { tmpproducts, price } = action.payload;
    //   let tempProducts = [];
    //   tempProducts = tmpproducts.filter((product) => product.price <= price);
    //   state.filteredProducts = tempProducts;
    // },
    GET_PRICE_RANGE(state, action) {
      const { FilteredProducts } = action.payload;
      // alert(FilteredProducts )
      const array = [];
      FilteredProducts.map((product) => {
        const price = product.price;
        return array.push(price);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
  extraReducers: (builder) => {
    builder
    // .addCase(getProducts.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getProducts.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isError = false;
    //   console.log(action.payload);
    //   state.products = action.payload;
    // })

    .addCase(getProductsCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      alert(JSON.stringify(action.payload));
      // state.categoryproducts = action.payload;
      state.product = action.payload;
      // return {
      //   ...state,
      //   categoryproducts: [...action.payload],
      //   filtered_products: [...action.payload],
      //   tmpproducts: [...action.payload],
      //   // filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      // };
    })
    // .addCase(getProducts.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   toast.error(action.payload);
    // })

    // .addCase(getProduct.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getProduct.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isError = false;
    //   console.log(action.payload);
    //   state.product = action.payload;
    // })
    // .addCase(getProduct.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   toast.error(action.payload);
    // })

    //getProductSearch
    .addCase(getProductSearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      alert(JSON.stringify(action.payload));
      state.filteredProducts = action.payload;

    })
    .addCase(getProductSearch.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      console.log(action.payload);
      // toast.error(action.payload);
    });
},
});

export const {

  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  GET_PRICE_RANGE,
  update_filteredProducts,

} = filterSlice.actions;

export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;
export const selectMaxprice = (state) => state.filter.maxprice;
export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export const selectAllFilteredProducts = (state) => state.filter;
// export const selectMinPrice = (state) => state.product.minPrice;
// export const selectMaxPrice = (state) => state.product.maxPrice;

export default filterSlice.reducer;
