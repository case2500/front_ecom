import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BiMinus, BiPlus } from "react-icons/bi";

import { getProduct } from "./../../features/product/productSlice";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "./../../features/cart/cartSlice.js";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import { simillar_products } from "./../data/products.js";
import { getProducts } from "./../../features/product/productSlice";

const ProductDetail = ({ match }) => {
  const { id } = useParams();
  const { nameCat } = useParams();
  const dispatch = useDispatch();
  const [productid, setProductID] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const product = [useSelector((state) => state.product.product)];
  const navigate = useNavigate();


  // get products
  const { products, isLoggedIn, isError, message } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts());
  }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProductID(product);
  }, [dispatch, id]);

  const buycart = (p, quantity) => {
    dispatch(addToCart({ ...p, quantity }));
    navigate("/payment");
  };

  // localStorage.setItem("cart", JSON.stringify(cart));
  return (
    <div className="w-full mx-auto">
      <div className="max-w-[1000px] bg-white min-h-[800px] mx-auto my-5 ">
        {product &&
          product.map((p, index) => (
            <div key={index} className="md:flex md:flex-row md:pt-5 md:mx-20 ">
              <img
                src={p.images && p.images.length ? p.images[0].url : ""}
              //  className="object-cover h-90 w-96 "
              className="object-scale-down h-48 w-92 "
                //object-scale-down h-48 w-full
              />
              <div className="flex flex-col mx-10 text-xl ">
                <p className="">
                  {p.name} {p.description}{" "}
                </p>
                <p className="px-0 py-2 text-gray-500">
                  4.7 rating | ขายแล้ว : {p.sold}{" "}
                </p>
                <p className="px-3 py-1 my-1 text-4xl text-red-600 bg-slate-100">
                  ฿{p.price} ลด:{"10%"}{" "}
                </p>

                <div className="flex flex-row ">
                  <div>
                    <p className="py-5 text-sm text-gray-500">การจัดส่ง</p>{" "}
                  </div>
                  <div className="px-5 py-5 text-sm text-gray-500">
                    <div className="px-5 pb1">
                      <h3>การจัดส่ง ถึง ค่าจัดส่ง {}</h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row ">
                  <div>
                    <p className="pr-10 text-sm text-gray-500 "></p>{" "}
                    <div className="px-3 py-1">
                      <h3 className="px-5">จำนวน : {p.quantity}</h3>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <p className="pr-10 text-sm text-gray-500 "></p>{" "}
                    <div className="px-0 py-1">
                      <h5 className="px-5 text-gray-400 text-md">
                        ยอดขาย : {p.sold}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mx-auto my-5">
                  <div
                    className="px-2 text-center text-red-600 bg-white border border-red-500 w-14 hover:bg-red-400 hover:text-white hover:border-transparent"
                    onClick={() =>
                      setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                  >
                    -
                  </div>
                  <div className="px-2 text-center text-red-600 bg-white border w-14 hover:border-transparent">
                    {quantity}
                  </div>
                  <div
                    className="px-2 text-center text-red-600 bg-white border border-red-500 w-14 hover:bg-red-400 hover:text-white hover:border-transparent"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </div>
                </div>

                <div className="mx-auto my-1 ">
                  <button
                    className="w-64 p-2 text-center text-white bg-red-700 border md:border hover:bg-red-600 hover:text-white hover:border-transparent"
                    onClick={() => dispatch(addToCart({ ...p, quantity }))}
                  >
                    เพิ่มใส่รถเข็น
                  </button>
                </div>
                <div className="mx-auto my-1 ">
                  <button
                    className="w-64 p-2 text-center text-white bg-orange-400 border hover:bg-orange-600 md:border hover:text-white hover:border-transparent"
                    onClick={() => buycart(p, quantity)}
                  >
                    ซื้อสินค้า
                  </button>
                </div>
              </div>
            </div>
          ))}

        <div className="flex flex-row mx-20 mt-5 mb-2 text-lg text-gray-600">
          <p>ข้อมูลจำเพาะของสินค้า</p>
        </div>
        {/* {JSON.stringify(product)} */}
        {product.map((p, index) => (
          <div className="flex flex-row mx-20 my-1 text-gray-500">
            <div className="">
              <p className=""> หมวดหมู่ </p>
              <p className=""> จำนวนสินค้า </p>
              <p className=""> ส่งจาก </p>
              <p className=""> ขนาด (ยาว x กว้าง x สูง) </p>
            </div>
            <div className="mx-10 text-gray-600">
              <p className="" key={index}>
                {p.category && p.category.name}
              </p>
              <p className=""> {p.quantity} หน่วย</p>
              <p className=""> ส่งจาก </p>
              <p className=""> ขนาด (ยาว x กว้าง x สูง) </p>
            </div>
          </div>
        ))}
        <br></br>
        <Swiper
        slidesPerView={4}
        spaceBetween={5}
        slidesPerGroup={3}
        navigation={true}
        modules={[Navigation]}
        className="flex"
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 5,
          },
        }}
      >

        {products.map((product,index) => (
          <SwiperSlide >
            <Link to={`/productdetail/${product._id}`}>
            <img key={index}
                    src={
                      product.images && product.images.length
                        ? product.images[0].url
                        : ""
                    }
                    // src={product.image && product.image.filePath}
                    className="object-cover w-16 h-16 pt-5 mx-auto md:h-32 md:w-64 "
                  />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      
    </div>
  );
};

export default ProductDetail;
