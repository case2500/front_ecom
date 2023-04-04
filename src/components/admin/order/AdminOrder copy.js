import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { URL } from "./../../../configurl.js";
import { getOrders, updateOrder,FILTER_BY_SEARCH } from "./../../../features/order/orderSlice";
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
  const filterPro = useSelector((state) => state.order.filterPro);

  // const myorder = useSelector((state) => state.order);
  const [search, setSearch] = useState("1034");
  const [tmap, setTmap] = useState([]);
  const strAscending = [...(selectOrder.orders)].sort((a, b) =>
  a.date > b.date ? 1 : -1,
);



  const cancleorder = async (id) => {
    if (window.confirm("ยืนยันการยกเลิกสินค้า ?")) {
      const data = await axios.put(URL + `order/` + id);
      setList(!list);
    }
  };

  const handleChangeStatus = (orderId, orderstatus) => {
    const formData = {
      _id: orderId,
      newstatus: orderstatus,
    };
    // alert(JSON.stringify(formData));
    setList(!list);
    dispatch(updateOrder(formData));
  };

  const stausData = ["Cancelled", "Pay", "Deliver", "Completed"];

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, list, id, user]);


  useEffect(() => {
    // alert(search)
    dispatch(FILTER_BY_SEARCH({selectOrder, search }));
  }, [selectOrder, search, dispatch]);

  return (
    <div>
      <div className="flex flex-row ">
        <div className="mx-20 my-10">
          <MenubarAdmin />
        </div>
        {JSON.stringify()}
{/* {(filterPro).map(p=>(
  <>
 { p.user}
  </>
))} */}
        <div className="max-w-[1000px]  mx-auto h-full mt-5">
          {/* {[(filterPro)].map(p =>(
            <>
            {p}
            </>
          ))} */}
       {/* bill:   {JSON.stringify(selectOrder.orders.map(p=>(p.user.name+","+p.status)))} */}
          <Search/>
          <div className="flex">
            <div className="flex-none w-14 h-14">NO.</div>
            <div className="flex-initial w-64 ...">วันที่</div>
            <div className="flex-initial w-32 ...">ชื่อลูกค้า</div>
            <div className="flex-initial w-32 ...">03</div>
          </div>

          {strAscending.map((p, indexpro) => (
            <>
           {p.status === "Cancelled" ? (<>
            <div className="flex bg-slate-200">
                <div className="flex-initial w-32 ...">NO.{p.autobill}</div>
                <div className="flex-initial w-32 ...">
                  {moment(p.dateOrdered)
                    .locale("th")
                    .add(543, "years")
                    .format("D MMM YYYY")}
                </div>
                <div className="flex-initial w-64 ...">
                  ชื่อลูกค้า: {p.user.name}
                </div>
                <div className="flex-initial w-max ...">
                  ที่อยู่ : {p.user.address}
                </div>
              </div>
           </>):null}
              <div className="flex bg-slate-200">
                <div className="flex-initial w-32 ...">NO.{p.autobill}</div>
                <div className="flex-initial w-32 ...">
                  {moment(p.dateOrdered)
                    .locale("th")
                    .add(543, "years")
                    .format("D MMM YYYY")}
                </div>
                <div className="flex-initial w-64 ...">
                  ชื่อลูกค้า: {p.user.name}
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
                      {index + 1} . {pq.product && pq.product.name}
                    </div>
                    <div className="flex-initial w-64 ...">
                      {pq.quantity}X{pq.product && pq.product.price}
                    </div>
                  </div>
                ))}

                {/* <select onChange={(e) => handleChangeRole(e, item._id)}>
                        <option value={item.role}> {item.role} </option>
                        {roleData.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select> */}

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
                            <b className=""> {p.totalPrice}</b>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                {/* status: {p.status} */}

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
              <br></br>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
