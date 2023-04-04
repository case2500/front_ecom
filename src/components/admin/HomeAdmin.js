import React, { useState, useEffect } from "react";
import MenubarAdmin from "./MenubarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../functions/product";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getProducts,
  selectFilteredProducts,
  FILTER_BY_SEARCH,
} from "../../features/product/productSlice";
import Productadmin from "./productadmin";

const HomeAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const textuser = localStorage.getItem("user");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);
  const { products, isLoggedIn, isError, message, isLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [isLoggedIn, isError, message, dispatch]);


  return (
    <div >
      <div className="flex flex-row ">
        <div className="mx-32 my-10">
          <MenubarAdmin />
        </div>
        <Productadmin products={products}  />
      </div>
      {/* {JSON.stringify()} */}
    </div>
  );
};

export default HomeAdmin;
