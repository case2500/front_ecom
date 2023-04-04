import React, { useState, useEffect } from "react";
import MenubarAdmin from "./MenubarAdmin";
import { useDispatch, useSelector } from "react-redux";
import Search from "./search/Search";
import { listProduct, removeProduct } from "../functions/product";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getProducts,
  selectFilteredProducts,
  FILTER_BY_SEARCH,
} from "../../features/product/productSlice";
import ReactPaginate from "react-paginate";
import Productadmin from "./productadmin";

const HomeAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  // const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const textuser = localStorage.getItem("user");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;
  const [search, setSearch] = useState("");
  // select products
  // const product = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  const { products, isLoggedIn, isError, message, isLoading } = useSelector(
    (state) => state.product
  );

  const loadData = () => {
    dispatch(getProducts());
  };

  useEffect(() => {
    loadData();
  }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [products, search, dispatch]);

  const handleRemove = (id) => {
    // console.log(id)
    if (window.confirm("Delete ?")) {
      removeProduct(authtoken, id)
        .then((res) => {
          toast.success("Deleted " + res.data.title + " Success!!");
          loadData();
          console.log(res);
        })
        .catch((err) => {
          toast.error("Remove Error");
          console.log(err);
        });
    }
  };

  return (
    <div className="w-max">
      <div className="flex flex-row ">
        <div className="mx-10 my-10">
          <MenubarAdmin />
        </div>

        <Productadmin products={products} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default HomeAdmin;
