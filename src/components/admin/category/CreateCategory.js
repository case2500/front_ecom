//rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../MenubarAdmin";

//functions
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../functions/category";

import { Link } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateCategory = () => {
  // const { user } = useSelector((state) => ({ ...state }));


  const [values, setValues] = useState({
    name: "",
  });
  const [category, setCategory] = useState([]);

  const textuser = localStorage.getItem("token");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;


  useEffect(() => {
    loadData(authtoken);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    deleteCategory(authtoken, id)
      .then((res) => {
        console.log(res);
        toast.success("Remove Data " + res.data.name + " Success!!!");
        loadData(authtoken);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error!!! Insert Data");
      });
  };

  console.log("data", category);

  const handleChangeCategory = (e) => {
    console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(e)
    createCategory(authtoken, values)
      .then((res) => {
        console.log(res);
        loadData(authtoken);
        toast.success("Insert Data " + res.data.name + " Success!!!");
        
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error!!! Insert Data");
      });
  };
  return (
    <div className="">
      <div className="flex flex-row ">
        <div className="mx-20 my-10">
          <MenubarAdmin />
        </div>

        <div className="mx-20 my-10 ">
          <div className="my-5 ">เพิ่มหมวดหมู่สินค้า</div>

          <form onSubmit={handleSubmit} className="mb-10">
            <div className="mb-20">
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChangeCategory}
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              />
              <button className="px-10 py-2 my-2 border border-red-200">
                เพิ่ม
              </button>
            </div>
          </form>
        </div>
        <div className="mt-10">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            {category.map((item, index) => (
              <>
                {/* {p._id} */}
                <tr className="text-lg ">
                  <td className="w-64 text-lg border-t-2 text-start">
                    {index + 1} . {item.name}
                  </td>

                  <td className="px-5 text-center border-t-2 w-62">
                    <button
                      className="px-5 py-1 my-2 font-bold text-white bg-red-500 rounded shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none"
                      onClick={() => handleRemove(item._id)}
                    >
                      x
                    </button>
                    <button className="px-5 py-1 font-bold text-white bg-green-500 rounded shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none">
                      <Link to={"/admin/update-category/" + item._id}>
                        {/* <a href="" ></a> */}
                        Edit
                      </Link>
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </table>
          <hr></hr>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
