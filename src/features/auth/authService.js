import axios from "axios";

 import {API_URL_USERS,URL} from "../../configurl.js";
// const API_URL_USERS = "http://localhost:5000/api/users/";

export const updateuser = async (id,formData) => {
   alert(JSON.stringify(formData+id))
  // `http://localhost:4000/api/users/`,
  try {  
    const response = await axios.patch(   
      API_URL_USERS + id,
      formData
    );

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
   alert(URL+`auth/register`)
  const response = await axios.post(URL+`auth/register`, userData);
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
//  alert(JSON.stringify(URL+`auth/login`))
  const response = await axios.post(URL+`auth/login` , userData);
  if (response.data) {
    // alert(JSON.stringify(response.data))
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
