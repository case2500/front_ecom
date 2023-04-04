import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  CLEAR_CART,
} from "../../features/cart/cartSlice.js";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = cart.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalpro = cart.cart.reduce((acc, item) => acc + item.quantity, 0);


  const clearCart = () => {
    dispatch(CLEAR_CART());
  };
  return (
    <div className="max-w-[1200px] bg-white min-h-[800px] mx-auto my-5  ">
      <div className="p-4 bg-gray-100/50">
        <div className="pt-5 mx-10 mt-2 my1 ">ที่อยู่ในการจัดส่ง</div>
        <div className="mx-10 my-4 ">
          สมเกียรติ จันวัน (+66) 925914655 520 ถนน มิตรภาพ, ตำบลในเมือง อ.เมือง,
          อำเภอเมืองนครราชสีมา, จังหวัดนครราชสีมา, 30000
        </div>
      </div>
      {/* {JSON.stringify(cart.cart)}  col-span-2  */}
      {/* {JSON.stringify(cart.cart)} */}
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

            {cart.cart.map((p, index) => (
              <div className="grid grid-cols-6 gap-3 " key={index}>
                <div>
                {p.images.url}
                <img
                src={p.images && p.images.length ? p.images[0].url : ""}
                className="object-cover h-90 w-96 "
              />
                </div>
                <div className="flex flex-row justify-start ">{p.name}</div>
                <div className="flex flex-row justify-center "> {p.price}฿</div>

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
                <button onClick={() => dispatch(removeItem(p._id))}>
                  remove
                </button>
              </div>
            ))}
            <hr></hr>

            {/* <div className="grid grid-cols-6 gap-5 text-gray-500">
              <p></p>
              <p className="flex flex-row justify-end mx-1">
                {" "}
                ค่าขนส่ง Standard{" "}
              </p>
              <p className="flex flex-row justify-end ">Delivery </p>
              <p>ส่งธรรมดาในประเทศ</p>
              <p className="flex flex-row justify-end">{total}฿</p>
            </div> */}
            {/* <hr></hr> */}
            {/* <div className="grid grid-cols-6 gap-5 text-gray-500">
              <p></p>
              <p className="mx-1"></p>
              <p className="flex flex-row justify-end mx-1">
                ยอดสั่งซื้อทั้งหมด
              </p>
              <p className="flex flex-row justify-start mx-1">
                {" "}
                ({totalpro} ชิ้น):
              </p>
              <p className="flex flex-row justify-end">{total}฿</p>
            </div> */}
            {/* <hr></hr> */}
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
          {/* <div className="flex justify-center mt-5">
            <buttom
            onClick={()=>dispatch(CLEAR_CART)}
            className="w-64 p-2 text-center text-white bg-red-700 border hover:bg-red-400 hover:text-white hover:border-transparent">
              Clear Cart
            </buttom>
          </div> */}
          <div className="flex justify-center mt-5">
          <button
            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))  clearCart() } }
            className="w-64 p-2 text-center text-white bg-red-700 border hover:bg-red-400 hover:text-white hover:border-transparent">
            Clear Cart
          </button>
          </div>

          

          <div className="flex justify-center mt-5">
            <button className="w-64 p-2 text-center text-white bg-red-700 border hover:bg-red-400 hover:text-white hover:border-transparent">
              <Link to={`/payment`}>ไปหน้าชำระเงิน</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
