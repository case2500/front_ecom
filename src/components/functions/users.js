import axios from "axios";
const textuser = localStorage.getItem("token");
const objuser = JSON.parse(textuser);
const authtoken = objuser && objuser.token;


export const listUser = async (authtoken) => {
  return await axios.get(`https://node-ecommerce-three.vercel.app/api/users`, {
    headers: {
      authtoken,
    },
  });
};

export const changeStatus = async (authtoken, value) => {
  return await axios.post(`https://node-ecommerce-three.vercel.app/api/users`, value, {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, value) => {
  alert("change"+(value))
  return await axios.post("https://node-ecommerce-three.vercel.app/api/users/change-role", value, {
    headers: {
      authtoken,
    },
  });
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete(`https://node-ecommerce-three.vercel.app/api/users/` + id, {
    headers: {
      authtoken,
    },
  });
};

export const resetPassword = async (authtoken, id, values) => {
  return await axios.put(`https://node-ecommerce-three.vercel.app/api/users/` + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const userCart = async (authtoken, cart) => {
  return await axios.post(
    `https://node-ecommerce-three.vercel.app/api` + "/user/cart",
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(`https://node-ecommerce-three.vercel.app/api` + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};
// Save Addresss
export const saveAddress = async (authtoken, address) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/address",
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};
// save order
export const saveOrder = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/order",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const getOrders = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/orders", {
    headers: {
      authtoken,
    },
  });
};

// Wishlist

export const getWishList = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/wishlist", {
    headers: {
      authtoken,
    },
  });
};

export const addToWishList = async (authtoken, productId) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/wishlist",
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeWishList = async (authtoken, productId) => {
  return await axios.put(
    process.env.REACT_APP_API + "/user/wishlist/" + productId,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
