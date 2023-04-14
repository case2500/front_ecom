//rafce
import React, { useEffect, useState } from "react";
import MenubarAdmin from "../MenubarAdmin";
//function
import { ReadCategory, EditCategory } from "../../functions/category";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  // const { user } = useSelector((state) => ({ ...state }));

  const navigate = useNavigate();
  const param = useParams();

  const textuser = localStorage.getItem("user");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;

  // console.log(param.id)
  const [name, setName] = useState("");
  useEffect(() => {
    //
    loadData(authtoken, param.id);
  }, []);

  const loadData = (authtoken, id) => {
    ReadCategory(authtoken, id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    EditCategory(authtoken, param.id, { name })
      .then((res) => {
        navigate("/admin/create-category");
        toast.success("Update " + res.data.name + " Success!!");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="">
      <div className="flex flex-row ">
        <div className="mx-20 my-10">
          <MenubarAdmin />
        </div>

        <div className="mx-20 my-10 ">
          <div className="my-5 ">แก้ไขหมวดหมู่สินค้า</div>
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="mb-20">
              <label>Update Category</label>
              <input
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                value={name}
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
              <button className="px-10 py-2 my-2 border border-red-200">
                เพิ่ม
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
