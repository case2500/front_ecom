import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  // addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  CLEAR_CART,
} from "../../features/cart/cartSlice.js";
import { saveOrder } from "../../features/order/orderSlice.js";
import ProflieForm from "./ProflieForm.js";
import {BACKEND_URL} from "./../../configurl.js";

const Payment = () => {

  const [listuser, setListuser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const localStorageuser = localStorage.getItem("user");
  const objuser = JSON.parse(localStorageuser);
  const id = objuser && objuser._id;


  const getUserData = async (id) => {
    const response = await axios.get(`${BACKEND_URL}/api/users/` + id);
    setListuser(response.data);
  };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = cart.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalpro = cart.cart.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageuser = localStorage.getItem("user");
    const objuser = JSON.parse(localStorageuser);
    if (!objuser) {
      navigate("/login");
    } else {
      getUserData(id);
    }
  }, [dispatch, isEditing]);

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };
  const AddOrder = async (formData) => {
    if (
      listuser.name === "" ||
      listuser.address === "" ||
      listuser.phone === ""
    ) {
      alert("กรุณาป้อนข้อมูล ชื่อ ที่อยู่ เบอร์โทรศัพท์");
      return;
    }
    dispatch(saveOrder({ formData }));
    clearCart();
    alert("รายการสั่งซื้อเรียบร้อย");
    // <Link to={`/myorder/`+objuser._id} >
    navigate(`/myorder/` + objuser._id, { replace: true });
  };

  return isEditing ? (
    <ProflieForm
      id={id}
      setIsEditing={setIsEditing}
      isEditing={isEditing}
      listuser={listuser}
    />
  ) : (
    <div>
      {/* {JSON.stringify(listuser)} */}
      <div className="max-w-[1200px] bg-white min-h-[800px] mx-auto my-5  ">
        <div className="border border-red-500 ">
          <div className="grid justify-start grid-rows-2 gap-3 p-2 px-2">
            {/* {JSON.stringify(objuser)} */}
            <h1 className="text-xl">ที่จัดส่ง</h1>
            <div className="border-b-2 border-gray-200">
              ชื่อ : {listuser.name}
            </div>
            <div className="border-b-2 border-gray-200">
              ที่อยู่ : {listuser.address}
            </div>
            <div className="border-b-2 border-gray-200">
              Phone : {listuser.phone}
            </div>
            <div className="border-b-2 border-gray-200">
              Email :
              <input
                type="text"
                name="email"
                value={listuser?.username}
                disabled
              />
            </div>
          </div>
          <button
            className="w-20 p-1 mx-5 my-1 text-white bg-red-400"
            onClick={() => setIsEditing(!isEditing)}
          >
            แก้ไข
            {isEditing}
          </button>
        </div>id:{id}

        <div className="grid grid-cols-7 ">
          <div className="grid col-span-5 ">
            <div className="flex flex-col gap-5 p-2 m-5">
              <div className="grid grid-cols-6 gap-5 text-gray-500">
                <p className="flex flex-row justify-center ">
                  <b>รายการสั่งซื้อสินค้า</b>
                </p>
                <p className="mx-1">รายการสินค้า</p>
                <p className="flex flex-row justify-center ">ราคาต่อหน่วย</p>
                <p className="flex flex-row justify-center ">จำนวน</p>
                <p className="flex flex-row justify-end ">รายการหน่วย</p>
              </div>
{/* {JSON.stringify(cart)} */}
              {cart.cart.map((p, index) => (
                <div className="grid grid-cols-6 gap-3 " key={index}>
                  <div>
                    <img
                      src={p.images && p.images.length ? p.images[0].url : ""}
                      className="object-cover w-20 h-10 "
                    />
                  </div>
                  <div className="flex flex-row justify-start ">{p.name}</div>
                  <div className="flex flex-row justify-center ">
                    {" "}
                    {p.price}฿
                  </div>

                  {/* button - + */}
                  <div className="flex flex-row ">
                    <div
                      className="text-center text-red-600 border border-red-500 w-14 max-h-7 hover:bg-red-400 hover:text-white hover:border-transparent"
                      onClick={() => dispatch(decrementQuantity({ ...p }))}
                    >
                      -
                    </div>
                    <div className="text-center text-red-600 w-14 max-h-7 hover:border-transparent">
                      {p.quantity}
                    </div>
                    <div
                      className="text-center text-red-600 border border-red-500 w-14 max-h-7 hover:bg-red-400 hover:text-white hover:border-transparent"
                      onClick={() => dispatch(incrementQuantity({ ...p }))}
                    >
                      +
                    </div>
                  </div>

                  <div className="flex flex-row justify-end">
                    {p.quantity * p.price}฿
                  </div>
                  <button
                    className="w-20 mx-10 text-center text-red-600 border border-red-500 max-h-7 hover:bg-red-400 hover:text-white hover:border-transparent"
                    onClick={() => dispatch(removeItem(p._id))}
                  >
                    ลบรายการ
                  </button>
                </div>
              ))}
              <hr></hr>
            </div>
          </div>

          {/*ยอดi;,  */}
          <div className="w-auto col-span-2 p-5 mx-10 mt-5 bg-gray-50 text-start bg-white-50 hover:border-transparent">
            <div className="grid grid-cols-2 mb-5 text-gray-500 ">
              <div className="">จำนวนทั้งหมด </div>
              <div className="flex justify-end">{totalpro} ชิ้น </div>
              <div className=""> ราคา </div>
              <div className="flex justify-end">{total}฿</div>
              <div className=""> ส่วนลด </div>
              <div className="flex justify-end">0฿</div>
            </div>

            <hr></hr>
            <div className="grid grid-cols-2 mt-5 text-gray-500 ">
              <div className=""> ราคารวม </div>
              <div className="flex justify-end text-2xl text-red-600">
                {total}฿
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you wish to delete this item?")
                  )
                    clearCart();
                }}
                className="w-64 p-2 text-center text-white bg-red-700 border hover:bg-red-400 hover:text-white hover:border-transparent"
              >
                Clear Cart
              </button>
            </div>
            <div className="flex justify-center mt-5">
              {total > 0 ? (
                <button
                  onClick={() => {
                    AddOrder({
                      userid: objuser._id,
                      orderItems: cart.cart,
                      totalprice: total,
                    });
                  }}
                  className="w-64 p-2 text-center text-white bg-red-700 border hover:bg-red-400 hover:text-white hover:border-transparent"
                >
                  สั่งซื้อสินค้า
                </button>
              ) : (
                <button
                  className="w-64 p-2 text-center text-white bg-gray-400 border hover:text-white hover:border-transparent"
                  disabled={true}
                >
                  ไม่มีรายการสั่งซื้อสินค้า
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
