import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import {
  getOrders,
  updateOrder,
  FILTER_BY_SEARCH,
} from "./../../../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import MenubarAdmin from "./../MenubarAdmin";
import Search from "../search/Search.js";
// export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

import { API_URL_ORDERS, BACKEND_URL } from "../../../configurl.js";

const AdminOrder = ({ match }) => {
  const { id } = useParams();
  const [list, setList] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const selectOrder = useSelector((state) => state.order);
  const filter = useSelector((state) => state.order);
  const [con, setCon] = useState([]);
  // const myorder = useSelector((state) => state.order);
  const [search, setSearch] = useState("");
  const [tempmap, setTempMap] = useState([]);
  const strAscending = [...tempmap].sort((a, b) => (a.date > b.date ? 1 : -1));
  const stausData = ["Pending", "Cancelled", "Pay", "Deliver", "Completed"];
  const [value, setValue] = useState(false);

  const handleChangeStatus = async (orderId, orderstatus) => {
    const formData = {
      _id: orderId,
      newstatus: orderstatus,
    };
    try {
      await axios.post(`${BACKEND_URL}/api/order/updateOrder`, formData);
      //  window.location.reload();
      alert("เปลียนสถานะเป็น " + orderstatus);
      setList(!list);
    } catch (error) {
      alert(error);
    }
  };

  const LoadData = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/order`);
    setCon(response.data);
    setTempMap(response.data);
  };

  useEffect(() => {
    LoadData();
  }, [list]);

  useEffect(() => {
    const tempProducts = con.filter(
      (product) =>
        (product &&
          product.status.toLowerCase().includes(search.toLowerCase())) ||
        (product && product.name.toLowerCase().includes(search.toLowerCase()))
    );
    setTempMap(tempProducts);
    // alert(JSON.stringify(tempmap));
  }, [list, search, value]);

  return (
    <div className="flex flex-row ">
      <div className="mx-20 my-10">
        <MenubarAdmin />
      </div>
      {/* { (JSON.stringify(con))} */}

      <div>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />

        {tempmap &&
          tempmap
            .sort((a, b) => (a.date > b.date ? 1 : -1))
            .map((p, indexpro) => (
              <div key={indexpro}>
                <div className="flex bg-slate-200">
                  <div className=" w-32 ...">NO.{p?.autobill}</div>
                  <div className=" w-32 ...">
                    {moment(p.dateOrdered)
                      .locale("th")
                      .add(543, "years")
                      .format("D MMM YYYY")}
                  </div>
                  <div className=" w-64 ...">ชื่อลูกค้า: {p?.name}</div>
                  <div className=" w-max ...">ที่อยู่ : {p?.address}</div>
                </div>

                <>
                  {p &&
                    p.orderItems.map((pq, index) => (
                      <div className="flex" key={index}>
                        <div className=" w-32 ..."></div>
                        <div className=" w-64 ...">
                          {index + 1} . {pq.product && pq.product}
                        </div>
                        <div className=" w-64 ...">
                          {pq.quantity}X{pq.product && pq.price}
                        </div>
                      </div>
                    ))}

                  <div className="flex">
                    {/* สถานะ : {p.status === "Pending" ? "Pending" : null} */}
                    {p.status === "Cancelled" ? (
                      <>
                        <div className="flex-initial w-32 text-red-700"></div>
                        <div className="flex-initial w-64 px-24 text-red-700">
                          ยอดรวม
                        </div>
                        <div className="flex-initial w-64 text-xl text-red-700">
                          <b className="underline line-through underline-offset-8">
                            {" "}
                            {p.totalPrice}
                          </b>
                        </div>
                      </>
                    ) : (
                      <>
                        {p.status === "Completed" ? (
                          <>
                            <div className="flex-initial w-32 text-gray-700"></div>
                            <div className="flex-initial w-64 px-24 text-gray-700">
                              ยอดรวม
                            </div>
                            <div className="flex-initial w-64 text-xl text-gray-700">
                              <b className="underline-offset-8">
                                {" "}
                                {p.totalPrice}
                              </b>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex-initial w-32 text-green-700"></div>
                            <div className="flex-initial w-64 px-24 text-green-700">
                              ยอดรวม
                            </div>
                            <div className="flex-initial w-64 text-xl text-green-700">
                              <b className="underline underline-offset-4">
                                {" "}
                                {p.totalPrice}
                              </b>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    <div className="text-xl ">
                      สถานะ :
                      <select
                        className="px-1 pb-1 underline underline-offset-4"
                        onChange={(e) =>
                          handleChangeStatus(p._id, e.target.value)
                        }
                      >
                        <option value={p.status}> {p.status} </option>
                        {stausData &&
                          stausData.map((item, index) => (
                            <option key={index} value={item}>
                              <div className="text-xl text-red-500 ">
                                {item}
                              </div>
                            </option>
                          ))}
                      </select>
                    </div>
                    

                  </div>
                </>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AdminOrder;
