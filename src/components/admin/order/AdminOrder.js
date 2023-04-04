import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { URL } from "./../../../configurl.js";
import {
  getOrders,
  updateOrder,
  FILTER_BY_SEARCH,
} from "./../../../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import MenubarAdmin from "./../MenubarAdmin";
import Search from "../search/Search.js";
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminOrder = ({ match }) => {
  const { id } = useParams();
  const [list, setList] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const selectOrder = useSelector((state) => state.order);
  const filter = useSelector((state) => state.order);

  // const myorder = useSelector((state) => state.order);
  const [search, setSearch] = useState("");
  const strAscending = [...selectOrder.orders].sort((a, b) =>
    a.date > b.date ? 1 : -1
  );
  const stausData = ["Pending","Cancelled", "Pay", "Deliver", "Completed"];
  const [value, setValue] = useState(false);

  const refresh = () => {
    setValue({});
  };

  const handleChangeStatus = (orderId, orderstatus) => {
    const formData = {
      _id: orderId,
      newstatus: orderstatus,
    };
    // alert(orderId)
    dispatch(updateOrder(formData));
    dispatch(getOrders());
  };

  const [con, setCon] = useState([]);
  useEffect(() => {
    dispatch(getOrders());
    // alert(JSON.stringify(strAscending))

  }, [dispatch,search,value]);


  useEffect(() => {
    const tempProducts = strAscending.filter(
      (product) =>
      product&& product.status.toLowerCase().includes(search.toLowerCase()) ||
      product&&product.user.toLowerCase().includes(search.toLowerCase())
    );
      setCon(tempProducts)
  }, [list, search, dispatch, value]);

  useEffect(() => {
    // alert(JSON.stringify(strAscending))
    setValue(!list)
    setCon(strAscending)

  }, [list, search, dispatch,value])
  return (
    <div>
      <div className="flex flex-row ">
        <div className="mx-20 my-10">
          <MenubarAdmin />
        </div>
       {/* { (JSON.stringify(con))} */}
        <button onClick={refresh}>Refresh component</button>
        <div className="max-w-[1000px]  mx-auto h-full mt-5">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="flex">
            <div className="flex-none w-14 h-14">NO.</div>
            <div className="flex-initial w-64 ...">วันที่</div>
            <div className="flex-initial w-32 ...">ชื่อลูกค้า</div>
            <div className="flex-initial w-32 ...">03</div>
          </div>
          {con.map((p, indexpro) => (
            <>
              <div className="flex bg-slate-200">
                <div className="flex-initial w-32 ...">NO.{p.autobill}</div>
                <div className="flex-initial w-32 ...">
                  {moment(p.dateOrdered)
                    .locale("th")
                    .add(543, "years")
                    .format("D MMM YYYY")}
                </div>
                <div className="flex-initial w-64 ...">
                  ชื่อลูกค้า: {p.user}
                </div>
                <div className="flex-initial w-max ...">
                  ที่อยู่ : {p.user.address}
                </div>
              </div>

              <table>
                {p.orderItems.map((pq, index) => (
                  <div className="flex" key={index}>
                    <div className="flex-initial w-32 ..."></div>
                    <div className="flex-initial w-64 ...">
                      {index + 1} . {pq.product && pq.product}
                    </div>
                    <div className="flex-initial w-64 ...">
                      {pq.quantity}X{pq.product && pq.product.price}
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
                            <b className="underline-offset-8">{p.totalPrice}</b>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-initial w-32 text-green-700"></div>
                          <div className="flex-initial w-64 px-24 text-green-700">
                            ยอดรวม
                          </div>
                          <div className="flex-initial w-64 text-xl text-green-700">
                            <b className=""> {p.totalPrice}</b>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  สถานะ :
                  <select
                    className="px-1 py-1 "
                    onChange={(e) => handleChangeStatus(p._id, e.target.value)}
                  >
                    <option value={p.status}> {p.status} </option>
                    {stausData.map((item, index) => (
                      <option key={index} value={item}>
                        <div className="text-xl text-red-500">{item}</div>
                      </option>
                    ))}
                  </select>
                </td>
              </table>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
