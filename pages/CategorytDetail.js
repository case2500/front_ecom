import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "./../../configurl.js";
import { getProducts } from "./../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const CategorytDetail = ({ match }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryfind } = useParams();

  const { nameCat} = useParams();
  const [brandFilters, setBrandFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([300]);
  const [colorFilters, setColorFilters] = useState([]);
  const [productall, setProducts] = useState([]);

  // get products
  const { products, isLoggedIn, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [isLoggedIn, isError, message, dispatch]);

  // //handleBrandFilterChange
  const handleBrandFilterChange = (event) => {
    const { value, checked } = event.target;
    setBrandFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((f) => f !== value)
    );
  };
  const handleColorFilterChange = (event) => {
    const { value, checked } = event.target;
    alert(checked);
    setColorFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((f) => f !== value)
    );
  };
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

  const filteredProducts = productall.filter(
    (p) =>
      // (categoryFilters.length === 0 ||
      //   categoryFilters.includes(p.category.name)) &&
      (brandFilters.length === 0 || brandFilters.includes(p.brand)) &&
      p.price <= priceFilters &&
      (colorFilters.length === 0 || colorFilters.includes(p.color))
  );

  useEffect(() => {
    loadData(categoryfind);
  }, [categoryfind]);

  useEffect(() => {
    setPriceFilters(max);
  }, [max]);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        slidesPerGroup={3}
        navigation={true}
        modules={[Navigation]}
        className="flex"
        breakpoints={{
          640: {
            width: 850,
            slidesPerView: 5,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide>
            <Link to={`/productdetail/${product._id}`}>
              <img
                key={index}
                src={
                  product.images && product.images.length
                    ? product.images[0].url
                    : ""
                }
                // src={product.image && product.image.filePath}
                className="object-cover w-16 h-16 mx-auto md:h-32 md:w-64 "
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col  md:flex md:flex-row mt-2 max-w-[1240px]  mx-auto ">
        <div className="mx-5 mt-2 ">
          <div className="mt-2 mb-2 ">
            <h4>ค้นหาแบนด์สินค้า กลุ่ม <b className="text-red-400"> {nameCat} </b> </h4>
          </div>
          <hr></hr>

          <div className="flex flex-col px-auto md:min-h-screen">
            {brandList.map((item, index) => (
              <div className="px-10 ">
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
            <hr></hr>
            <div className="px-10 ">
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
            <div className="px-10 "> price : {priceFilters} </div>
            <hr></hr>
          </div>
        </div>

        <div className="mx-auto mt-5">
          {/* {JSON.stringify(filteredProducts)} */}

          <div className="grid gap-1 md:px-5 md:my-1 md:grid-cols-4 ">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div className="cursor-pointer hover:shadow-lg hover:shadow-greay-500">
                  {/* {JSON.stringify(product.image.filePath)} */}
                  <Link to={`/productdetail/${product._id}`}>
                    <div key={index}>
                      <img
                        src={
                          product.images && product.images.length
                            ? product.images[0].url
                            : ""
                        }
                        className="object-cover p-2 mx-1 h-36 w-42"
                      />
                    </div>

                    <div className="mt-2 mb-2  max-w-[200px]">
                      <p className="text-center">{product.name}</p>
                      <p className="h-10 px-5 text-sm text-gray-400 max-w-[250px] ">
                        {product.description.slice(0, 40)}...
                      </p>
                      <p className="flex justify-start mx-2 mt-5 mb-2 italic font-bold text-red-500 text-md">
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
    </>
  );
};
export default CategorytDetail;
