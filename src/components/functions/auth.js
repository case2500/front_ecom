import axios from "axios";

const REACT_APP_API = "http://localhost:4000/api"

export const register = async (value) =>
  await axios.post(REACT_APP_API + "/register", value);

  export const login = async (value) =>
  await axios.post(REACT_APP_API + "/login", value);
  

export const currentUser = async (authtoken) => {
  return await axios.post(REACT_APP_API + "/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentAdmin = async (authtoken) => {
  return await axios.post(REACT_APP_API + "/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}
