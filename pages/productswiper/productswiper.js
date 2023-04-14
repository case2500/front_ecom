import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
// import { simillar_products } from "./../data/products.js";
import { Link } from "react-router-dom";

const Productswiper= ({products}) => {
  //check token
  const textuser = localStorage.getItem("user");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={4}
        slidesPerGroup={3}
        navigation={true}
        modules={[Navigation]}
        // className="swiper simillar_swiper products__swiper"
        breakpoints={{
          640: {
            width: 840,
            slidesPerView: 2,
          },
        }}
      >      
        {products&&products.map((product) => (
          <SwiperSlide>
            <Link to={`/productdetail/${product._id}`}>
            <img
                    src={
                      product.images && product.images.length
                        ? product.images[0].url
                        : ""
                    }
                    // src={product.image && product.image.filePath}
                    className="object-cover h-32 mx-auto"
                  />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Productswiper;
