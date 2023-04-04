import React, { useState, useEffect } from "react";
import MenubarAdmin from "../MenubarAdmin";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
// functions
// import { createProduct } from "../../functions/product";
import { listCategory } from "../../functions/category";
import { getProducts,createProduct } from "./../../../features/product/productSlice";

import FileUpload from "./FileUpload";


const initialstate = {
  name: "Notebook",
  description: "DES",
  categories: [],
  category: "",
  price: "100",
  quantity: "5",
  brand:"",
  images: [],
};

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false);
  const textuser = localStorage.getItem("user");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;

  useEffect(() => {
    loadData(authtoken);
  }, []);

  // dispatch(getProducts());


  const loadData = (authtoken) => {
    // alert(authtoken);
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("values", values);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //  alert(JSON.stringify(values))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(authtoken);
    dispatch(createProduct(authtoken, values))
      .then((res) => {
        console.log(res);
        toast.success("Insert " + res.data.title + " Success!!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data);
      });
  };

  return (
    <div className="">
    <div className="flex flex-row ">
      <div className="mx-20 my-10">
        <MenubarAdmin />
      </div>
      authtoken:
      <div className="">
        {loading ? <h1>Loading...</h1> : <h1>Product Create </h1>}
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
                  type="text"
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
                    className="form-control"
                    name="category"
                    onChange={handleChange}
                    required
                  >
                    <option>Please Select</option>
                    {values.categories.length > 0 &&
                      values.categories.map((item) => (
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

export default Home;
