import axios from "axios";
import {BACKEND_URL} from "../../configurl.js";

export const createCategory = async (authtoken, value) => {
  return await axios.post(`${BACKEND_URL}/api/category/`, value, {
    headers: {
      authtoken,
    },
  });
};

export const listCategory = async () =>

  await axios.get(`${BACKEND_URL}/api/category`, {
 
  });

  // export const BACKEND_URL = `https://node-ecommerce-three.vercel.app/api/category/id`;
export const deleteCategory = async (authtoken, id) =>

  await axios.delete(`${BACKEND_URL}/api/category/` + id, {
    headers: {
      authtoken,
    },
  });

export const ReadCategory = async (authtoken, id) =>
  await axios.get(`${BACKEND_URL}/api/category/` + id, {
    headers: {
      authtoken,
    },
  });

export const EditCategory = async (authtoken, id, value) => {
  // console.log("value functions page", value);
  return await axios.put(`${BACKEND_URL}/api/category/` + id, value, {
    headers: {
      authtoken,
    },
  });
};
