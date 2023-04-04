import React, { useState, useEffect } from "react";

import MenubarAdmin from "../MenubarAdmin";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";
// functions
import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
} from "../../functions/users";

const ManageAdmin = () => {
  // const { user } = useSelector((state) => ({ ...state }));

  const textuser = localStorage.getItem("token");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;

  // ข้อมูลในตารางต้นฉบับ
  const [data, setData] = useState([]);
  // ข้อมูลที่เลือก
  const [selectData, setSelectData] = useState([]);
  // ข้อมูลที่ใช้ Loop ใน dropdown
  const [drop, setDrop] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const showModal = (id, username) => {
    // alert(id)
    setIsModalVisible(true);
    setValues({ ...values, id: id, username: username });
  };
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    resetPassword(authtoken, values.id, { values })
      .then((res) => {
        console.log(res);
        loadData(authtoken);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log("data", data);
  useEffect(() => {
    //code
    loadData(authtoken);
  }, []);

  const loadData = (authtoken) => {
    //code
    listUser(authtoken)
      .then((res) => {
        //code
        setData(res.data);
        setSelectData(res.data);
        // [...new Set(array)]
        const dataDrop = [...new Set(res.data.map((item) => item.role))];
        setDrop(dataDrop);
      })
      .catch((err) => {
        //err
        console.log(err.response.data);
      });
  };

  const handleOnchange = (e, id) => {};

  const handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e.target.value,
    };
    // alert(JSON.stringify(values));
    changeRole(authtoken, values)
      .then((res) => {
        // alert("res");
        loadData(authtoken);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      removeUser(authtoken, id)
        .then((res) => {
          console.log(res);
          loadData(authtoken);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const roleData = ["admin", "user"];

  const handleSelectRole = (e) => {
    const value = e.target.value;
    if (value == "all") {
      //
      setSelectData(data);
    } else {
      //
      const filterData = data.filter((item, index) => {
        return item.role == value;
      });

      setSelectData(filterData);
    }
  };

  return (
    <div>
      <div className="flex flex-row ">
        <div className="mx-20 my-10">
          <MenubarAdmin />
        </div>

        <div>
          <div className="mx-20 my-5 ">
            <h1> จัดการผู้ใช้งาน</h1>

            <table className="border border-slate-300  ">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    staus
                  </th>
                  <th scope="col" className="px-6 py-4"></th>
                  <th scope="col" className="px-6 py-4">
                    วันที่
                  </th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {/* {JSON.stringify(roleData)}
              select:{" "} */}
                {selectData.map((item, index) => (
                  <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    {/* <th className="">{item.username}</th> */}
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}.
                    </td>
                    {item.role === "admin" ? (
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        <b>{item.username} </b>
                      </td>
                    ) : (
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item.username}{" "}
                      </td>
                    )}
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {/* {item.role === 'admin'? <h1 >{item.role}</h1>: <div> {item.role} </div>} */}

                      <select onChange={(e) => handleChangeRole(e, item._id)}>
                        <option value={item.role}> {item.role} </option>
                        {roleData.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      <input
                        checked={item.enabled}
                        onChange={(e) => handleOnchange(e, item._id)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {moment(item.createdAt).locale("th").format("ll")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      <button
                        className="px-4 my-2 bg-red-400"
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      <button
                        className="px-4 my-2 bg-green-400"
                        onClick={() => showModal(item._id, item.username)}
                      >
                        showModal
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isModalVisible ? (
              <>
                <div className="fixed inset-0 z-50 flex  justify-center mt-44 ">
                  <div className="relative  mx-auto my-6">
                    <div
                      className="inline-block overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl align-center sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="modal-headline"
                    >
                      <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                        <label>{values.username}</label>
                        <br></br>
                        <label>new password</label>
                        <input
                          type="text"
                          className="w-full p-2 mt-2 mb-3 bg-gray-100"
                          onChange={handleChangePassword}
                          name="password"
                        />
                      </div>
                      <div className="px-4 py-3 text-right bg-gray-200">
                        <button
                          type="button"
                          className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                          onClick={() => setIsModalVisible(false)}
                        >
                          <i className="fas fa-times" /> Cancel
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                          <i className="fas fa-plus" /> Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
