import axios from "axios";

 import {API_URL_USERS,URL,BACKEND_URL} from "../../configurl.js";
// const API_URL_USERS = "http://localhost:5000/api/users/";

export const updateuser = async (id,formData) => {
  try {  
    const response = await axios.patch(   
      `http://localhost:4000/api/users/` + id,
      formData
    );
alert(JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
   
  }
};

// Register user http://localhost:4000/api/auth/register
const register = async (userData) => {
  const response = await axios.post(BACKEND_URL+`/api/users/register`, userData);
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
  const response = await axios.post(BACKEND_URL+`/api/users/login` , userData);
  if (response.data) {
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
