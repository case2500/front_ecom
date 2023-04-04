import axios from "axios";

 import {API_URL_USERS} from "./../../configurl.js";
// const API_URL_USERS = "http://localhost:5000/api/users/";

export const updateuser = async (formData) => {
  // alert(JSON.stringify(formData))
  try {  
    const response = await axios.patch(
      `${API_URL_USERS}/updateuser`,
      formData
    );
  //  alert(JSON.stringify("response.data"+JSON.stringify(response.data)))
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
   
  }
};

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL_USERS, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Get a getUser
const getUser = async (id) => {
  const response = await axios.get(API_URL_USERS + id);
  return response.data;
};

// Get a getUser id
const getuserlist = async (id) => {
  const response = await axios.get(API_URL_USERS );
  return response.data;
};


// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL_USERS + "login", userData);
  if (response.data) {
    alert(JSON.stringify(response.data))
       localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  getUser,
  updateuser,
  getuserlist,
};

export default authService;
