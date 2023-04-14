import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { getProducts } from "./../../features/product/productSlice";
// import { useNavigate } from "react-router-dom";
// import { listCategory } from "../functions/category";
import AllProduct from "./AllProduct.js";
// import { selectUser } from "./../../features/auth/authSlice";
// import { Swiper, SwiperSlide } from "swiper/react";
import Productswiper from "./productswiper/productswiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import { Navigation } from "swiper";
// import { simillar_products } from "./../data/products.js";
// import { Link } from "react-router-dom";

const Home = () => {
  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
  const dispatch = useDispatch();
  //check token
  const textuser = localStorage.getItem("user");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;

  // get products
  const { products, isError, message } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getProducts());
  }, [ dispatch, isError, message]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  return (
    <div>
      <div className="flex justify-center ">
        <h1 className="py-5 text-2xl text-red-500">สินค้าใหม่</h1>
      </div>
      {/* Swiper */}
      <Productswiper products={products} />
      {/* Product myh's,f */}
      <main className="max-w-[1240px]  mx-auto max-h-[550px] mt-5">
        <div className="flex">
          <div>
            <AllProduct currentItems={currentItems} />
          </div>
        </div>
        <ReactPaginate
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="previous"
          pageClassName="page-item px-5 py-1 leading-tight  rounded-md bg-white border border-blue-600    "
          pageLinkClassName="page-link "
          previousClassName="page-item px-3 py-0   rounded-md bg-white border border-blue-600 "
          previousLinkClassName="page-link"
          nextClassName="page-item px-3 py-1  rounded-md bg-white border border-blue-600  "
          nextLinkClassName="page-link  "
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active px-2 py-1 leading-tight text-white rounded-md  bg-blue-600"
          renderOnZeroPageCount={null}
          className="flex flex-row justify-center gap-2"
        />
      </main>
    </div>
  );
};

export default Home;
