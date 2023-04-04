import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../functions/auth";

const AdminRoute = ({ children }) => {
  //check token
  const textuser = localStorage.getItem("user");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;

  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (textuser) {
      // alert(objuser.role);
      if (objuser.role === "admin") {
        setOk(true);
      } else {
        setOk(false);
      }
    }
  }, [textuser]);

  return ok ? children : <LoadingToRedirect />;
};

export default AdminRoute;
