import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import {
//   selectMinPrice,
//   selectMaxPrice,
// } from "./../../features/product/productSlice";

import {
  selectAllFilteredProducts,
  getProductsCategory,
  selectFilteredProducts,
} from "./../../features/product/filterSlice";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUniqueValues, formatPrice } from "../utils/helpers.js";
import ProductFilter from "./ProductFilter";
import axios from "axios";
import { URL } from "./../../configurl.js";

const CategorytDetail = ({ match }) => {
  const dispatch = useDispatch();
  const { categoryfind } = useParams();

  const AllFilteredProducts = useSelector(selectAllFilteredProducts);

  const [categoryFilters, setCategoryFilters] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([300]);
  const [colorFilters, setColorFilters] = useState([]);
  const [productall, setProducts] = useState([]);

  const handleCategoryFilterChange = (event) => {
    const { value, checked } = event.target;
    setCategoryFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((f) => f !== value)
    );
  };

  //handleBrandFilterChange
  const handleBrandFilterChange = (event) => {
    const { value, checked } = event.target;
    setBrandFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((f) => f !== value)
    );
  };

  const handlePriceFilterChange = (event, newValue) => {
    setPriceFilters(newValue);
  };

  const handleColorFilterChange = (event) => {
    const { value, checked } = event.target;
    alert(checked);
    setColorFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((f) => f !== value)
    );
  };

  const filteredProducts = productall.filter(
    (p) =>
      // (categoryFilters.length === 0 ||
      //   categoryFilters.includes(p.category.name)) &&
      (brandFilters.length === 0 || brandFilters.includes(p.brand)) &&
      p.price <= priceFilters &&
      (colorFilters.length === 0 || colorFilters.includes(p.color))
  );

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    setPriceFilters(event.target.value);
  };

  const newproduct = productall.map((p) => p.price);
  const max = Math.max(...newproduct);
  const min = Math.min(...newproduct);

  const loadData = async (categoryfind) => {
    const response = await axios.get(`${URL}product/cat/${categoryfind}`);
    setProducts(response.data);
  };

  const brandList = [...new Set(productall.map((b, index) => b.brand))];
  const colorList = [...new Set(productall.map((c, index) => c.color))];

  useEffect(() => {
    loadData(categoryfind);
  }, [categoryfind]);

  useEffect(() => {
    setPriceFilters(max);
  }, [max]);

  return (
    <div className="flex flex-row mt-2 max-w-[1240px]  mx-auto ">
      <div className="mx-5 mt-2 ">
        <div className="mt-2 mb-2 ">
          <h4>ค้นหาแบนด์สินค้า</h4>
          {/* colorFilters   {JSON.stringify(colorFilters)} */}
        </div>
        <hr></hr>
        <div className="min-h-screen px-2 ">
          {brandList.map((item, index) => (
            <div className="px-2 ">
              <ul>
                <li>
                  <div className="flex flex-row gap-1">
                    <input
                      type="checkbox"
                      onChange={handleBrandFilterChange}
                      value={item}
                    />

                    {item}
                  </div>
                </li>
              </ul>
            </div>
          ))}
          <div>
            <h2>Price</h2>
            <h5>
              {0}-{max}
            </h5>
            <input
              type="range"
              min={0}
              max={max + 100}
              // value={priceFilters}
              // onChange={handlePriceFilterChange}
              onChange={(e) => handleCheck(e)}
            />
          </div>
          price : {priceFilters}
          <br></br>
          <hr></hr>
          <div>
            <h2>Color</h2>
            {colorList.map((itemcolor, index) => (
              <div className="px-2 ">
                <ul>
                  <li>
                    <div className="flex flex-row gap-1">
                      <input
                        type="checkbox"
                        onChange={handleColorFilterChange}
                        value={itemcolor}
                      />

                      {itemcolor}
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 ">
        {/* {JSON.stringify(filteredProducts)} */}

        <div className="grid grid-cols-5 gap-1 px-5 my-5 ">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className=" bg-white max-h-[850px] w-[200px] cursor-pointer hover:shadow-md  ">
                {/* {JSON.stringify(product.image.filePath)} */}
                <Link to={`/productdetail/${product._id}`}>
                  <div key={index}>
                    <img
                      src={
                        product.images && product.images.length
                          ? product.images[0].url
                          : ""
                      }
                      className="object-cover mx-auto h-44 hover:scale-110"
                    />
                  </div>

                  <div className="mt-2 mb-2  max-w-[200px]">
                    <p className="text-center">{product.name}</p>
                    <p className="text-start max-w-[200px] h-10 text-gray-400  ">
                      {product.description.slice(0, 40)}...
                    </p>
                    <p className="flex justify-start mt-0 mb-2 italic font-bold text-red-500 text-md">
                      {product.price}฿
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex justify-start mt-0 mb-2 text-2xl font-bold text-red-500 text-md">
              ไม่พบสินค้า{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CategorytDetail;
