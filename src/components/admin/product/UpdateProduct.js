// rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../MenubarAdmin";
import { useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "./FileUpload";
// function
import { readProduct, updateProduct } from "../../functions/product";
import { listCategory } from "../../functions/category";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  brand:"",
  images: [],
};

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialstate);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const textuser = localStorage.getItem("token");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;

  useEffect(() => {
    // code
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        //code
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    listCategory(authtoken)
      .then((res) => {
        //code
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(values);
  console.log(category);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    updateProduct(authtoken, values._id, values)
      .then((res) => {
        setLoading(false);
        navigate("/admin/index");
      })
      .catch((err) => {
        toast.error("Update Error");
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="">
      <div className="flex flex-row ">
        <div className="mx-20 my-10">
          <MenubarAdmin />
        </div>

        <div className="">
          {loading ? <h1>Loading...</h1> : <h1>Product Update </h1>}
          {/* {JSON.stringify(values)} */}

          <div className="mx-20 my-10 ">
            <form onSubmit={handleSubmit}>
              <div className="mb-6 md:flex md:items-start">
                <div className="w-20">
                  <label>name</label>
                </div>
                <input
                  className="px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none w-96 focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>

       

              <div className="mb-6 md:flex md:items-start">
                <div className="w-20">
                  <label>price</label>
                </div>
                <div className="md:w-32 md:items-start">
                  <input
                    className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6 md:flex md:items-start">
                <div className="w-20">
                  <label>quantity</label>
                </div>
                <div className="md:w-32 md:items-start">
                  <input
                    className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    type="number"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6 md:flex md:items-start">
              <div className="w-20">
                <label>Brand</label>
              </div>
              <div className="md:w-32 md:items-start">
                <input
                  className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                  type="textr"
                  name="brand"
                  value={values.brand}
                  onChange={handleChange}
                />
              </div>
            </div>

              <div className="mb-6 md:flex md:items-start">
                <div className="w-20">
                  <label>Category</label>
                </div>
                <div className="md:w-1/3 md:items-start">
                  <select
                    className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    name="category"
                    onChange={handleChange}
                    value={values.category._id}
                    required
                  >
                    <option>Please Select</option>
                    {category.length > 0 &&
                      category.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="mb-6 md:flex md:items-start">
                <div className="w-20">
                  <label>Description</label>
                </div>
                <div className="md:w-96 md:items-start">
                  <textarea
                    rows="8"
                    className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <FileUpload
                loading={loading}
                setLoading={setLoading}
                values={values}
                setValues={setValues}
              />

              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
