import axios from "axios";
import {BACKEND_URL} from "./../../configurl.js";

// Create New Product
export const createProduct = async (authtoken,values) => {
  // alert("createProduct"+`${BACKEND_URL}/api/product/`+JSON.stringify(values))
  return await axios.post(`${BACKEND_URL}/api/product/`, values, {
    headers: {
      authtoken,
    },
  });
};

// Get a Product
const getProduct = async (id) => {
  //  alert("getProduct")
  const response = await axios.get(`${BACKEND_URL}/api/product/` + id);
  //  alert(JSON.stringify("response.data"+response.data))
  return response.data;
};


// Get all products
const getProducts = async () => {
  // alert("getProducts")
  const response = await axios.get(`${BACKEND_URL}/api/product/`);
    // alert(JSON.stringify(response.data))
  return response.data;
};

//getProductsCat
const getProductsCat = async (query) => {
  // alert("getProductsCat")
  // const response = await axios.get(`${API_URLCAT}${query}`);
  const response = await axios.get(`${BACKEND_URL}/api/product/cat/${query}`);
  //  alert(response.data)
  return response.data;
};

//getProducts search
const getProductSearch  = async  (keyword) => {
  // alert("getProductSearch ")
  const response = await axios.get(`${BACKEND_URL}/api/product/productsearch/${keyword}`);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(`${BACKEND_URL}/api/product/` + id);
  return response.data;
};

// Update Product
const updateProduct = async (id, values) => {
  // alert("updateProduct ")
  const response = await axios.put(`${BACKEND_URL}/api/product/` + id, values);
  
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductsCat,
  getProductSearch,

};

export default productService;
