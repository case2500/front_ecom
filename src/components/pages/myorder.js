import React, { useEffect, useState , useRef }  from "react";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { API_URL_PRODUCT, URL } from "../../configurl.js";
import { getOrder } from "../../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";


//import ReactToPrint from "react-to-print";
//import { render } from "react-dom";
//import ComponentToPrint from "./ComponentToPrint";

import {
  // selectName,
  // SET_LOGIN,
  // SET_LOG_OUT,
  selectUser,
} from "../../features/auth/authSlice";
import { toast } from "react-toastify";

// import Invoice from "./../orderInvoice/Invoice.js";



export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Myorder = ({ match }) => {
  const { id } = useParams();
  const [list, setList] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const myorder = useSelector((state) => state.order);

  let componentRef = useRef(null);


  const cancleorder = async (id) => {
    if (window.confirm("ยืนยันการยกเลิกสินค้า ?")) {
      const data = await axios.put(URL + `order/` + id);
      setList(!list);
    }
  };

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, list, id, user]);
  return (
    <main className="max-w-[1000px]  mx-auto h-full mt-5">
      {/* <Invoice myorder={myorder} /> */}




      {myorder.order.map((p, indexpro) => (
        <div key={indexpro}>
          <div className="text-xl">
            เลขที่บิล :  {p.autobill}
          </div>
          <div>
            วันที่สั่งซื้อ :{" "}
            {moment(p.dateOrdered)
              .locale("th")
              .add(543, "years")
              .format("D MMM YYYY")}
          </div>
          <div> ชื่อลูกค้า : {p.user.name}</div>
          <div>ที่อยู่ : {p.user.address}</div>
          <div>เลขที่ใบขนส่ง :</div>

          <div>
            <hr></hr>
          </div>
          <div className="w-auto">
            <div className="grid grid-cols-4">
              <div className="grid justify-items-center">รายการ</div>
              <div className="grid justify-items-center">ราคา/หน่วย</div>
              <div className="grid justify-items-center">จำนวน</div>
              <div className="grid justify-items-end">ยอดรวม</div>
            </div>
          </div>
          {/* {JSON.stringify(p.orderItems)} */}
          <div className="w-auto">
            {p.orderItems.map((pq, index) => (
              <div className="grid grid-cols-4" key={index}>
                <div className="grid justify-items-start">
                  {index + 1}.{pq.product && pq.product.name}
                </div>

                <div className="grid justify-items-center">{pq.quantity}</div>
                <div className="grid justify-items-center">
                  {pq.product && pq.product.price}
                </div>

                <div className="grid justify-items-end">
                  {pq.quantity * (pq.product && pq.product.price)}
                </div>
              </div>
            ))}
          </div>
          <div className="w-auto">
            <hr></hr>
            <div className="grid grid-cols-4">
              <div className="grid justify-items-center">
                ชำระเงิน : {p.isPaid ? "ชำระ" : "รอดำเนินการ"}
              </div>
              <div className="grid justify-items-start">
                {p.status !== "Cancelled" ? (
                  <p> สถานะสินค้า : กำลังดำเนินการ</p>
                ) : (
                  <p className="text-red-600">
                    {" "}
                    สถานะสินค้า : ยกเลิกการสั่งซื้อ{" "}
                  </p>
                )}
              </div>
              <div className="grid justify-items-end"> ราคารวม</div>
              <div className="grid text-xl text-red-700 justify-items-end">
                {p.totalPrice}
              </div>
            </div>
            {p.status !== "Cancelled" ? (
              <button
                onClick={() => {
                  cancleorder(p._id);
                }}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-green-500 border border-transparent active:bg-gray-900 false"
              >
                ยกเลิกการสั่งซื้อ
              </button>
            ) : (
              <button
                onClick={() => {
                  cancleorder(p._id);
                }}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-500 border border-transparent active:bg-gray-900 false"
              >
                ยกเลิกสั่งซื้อ
              </button>
            )}
          </div>
          <br></br>
          <hr className="mb-10"></hr>
        </div>
      ))}
    </main>
  );
};

export default Myorder;
