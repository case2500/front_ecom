import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
// import {
//   getProduct,
//   getProducts,
//   selectIsLoading,
//   selectProduct,
//   updateProduct,
//   // getProductSearch,
//   selectProductsearch,
// } from "./../redux/features/product/productSlice";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  selectFilteredProducts,
  getProductSearch,
  selectAllFilteredProducts,
  GET_PRICE_RANGE,
  selectMaxprice,
  selectMinPrice,
} from "../../features/product/filterSlice.js";
// import ProductFilter from "./ProductFilter";

const ProductSearch = ({ match }) => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [datasearch, setDataSearch] = useState();
  const FilteredProducts = useSelector(selectFilteredProducts);
//   const AllFilteredProducts = useSelector(selectAllFilteredProducts);

  useEffect(() => {
    dispatch(getProductSearch(keyword));
    //GET_PRICE_RANGE
    // dispatch(GET_PRICE_RANGE(AllFilteredProducts));
  }, [keyword, dispatch]);

  return (
    <div className="max-w-[1500px] mx-auto my-5 h-screen bg-white">
      <div className="flex flex-row justify-center py-3"> ข้อความค้นหา : {keyword }  </div>
      <div className="grid md:grid md:grid-cols-7">
        <div className="px-20">
          {/* <ProductFilter
            FilteredProducts={FilteredProducts}
            AllFilteredProducts={AllFilteredProducts}
          /> */}
        </div>

        <div className="col-span-6">
        <div className="mx-auto md:items-center md:justify-center md:pb-1 md:flex md:flex-row">
        <div className="grid grid-cols-2 gap-1 px-10 mb-8 md:grid-cols-5 ">

        {/* {JSON.stringify(FilteredProducts)} */}
        {FilteredProducts &&
          FilteredProducts.map((product, index) => (
            <div
              key={index}
              className="p-1 bg-white max-h-[360px] max-w-[200px] cursor-pointer hover:shadow-md hover:bg-gray-100"
            >
              {/* {JSON.stringify(product.image.filePath)} */}
              <Link to={`/productdetail/${product._id}`}>
                <div>
                  <img
                     src={product.images && product.images.length ? product.images[0].url : ""}
                    className="object-cover mx-auto h-44 hover:scale-105"
                  />
                </div>

                <div className="mt-2 mb-2  max-w-[200px]">
                  <p className="text-center">{product.name}</p>
                  <p className="text-start max-w-[150px] h-8 text-gray-400  ">
                    {product.description.slice(0, 40)}...
                  </p>
                  <p className="flex justify-start mt-2 mb-2 text-sm italic font-bold text-red-500">
                    {product.price}฿
                  </p>
                </div>
              </Link>
            </div>
          ))}
          </div>
          </div>
      </div>
      </div>
    </div>
  );
};

export default ProductSearch;
