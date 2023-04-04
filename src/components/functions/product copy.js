import axios from "axios";
import { API_URL_USERS, URL } from "../../configurl.js";

export const createProduct = async (authtoken, value) => {
  return await axios.post(URL + "product", value, {
    headers: {
      authtoken,
    },
  });
};

export const listProduct = async (count) =>
  await axios.get(URL + "product/" + count);

export const removeProduct = async (authtoken, id) =>
  await axios.delete(URL + "product/" + id, {
    headers: {
      authtoken,
    },
  });

// update
export const readProduct = async (id) =>
  await axios.get(URL + "product/" + id);

export const updateProduct = async (authtoken, id, product) =>
  await axios.put(URL + "product/" + id, product, {
    headers: {
      authtoken,
    },
  });

export const listProductBy = async (sort, order, limit) =>
  await axios.post(URL + "productby", {
    sort,
    order,
    limit,
  });

export const searchFilters = async (arg) =>
  await axios.post(URL + "search/filters", arg);
// alert(JSON.stringify(arg))
