import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import NavbarCaterory from "./components/navbar/NavbarCaterory.js";
// Page
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";
import ProductDetail from "./components/pages/ProductDetail.js";

import { Routes, Route } from "react-router-dom";

import AdminRoute from "./components/routes/AdminRoute.js";
import ManageAdmin from "./components/admin/admin/ManageAdmin";
import Payment from "./components/pages/payment.js";
// pages admin
import HomeAdmin from "./components/admin/HomeAdmin";

import CreateProduct from "./components/admin/product/CreateProduct";
import UpdateProduct from "./components/admin/product/UpdateProduct";
import AdminOrder from "./components/admin/order/AdminOrder.js";

import Cart from "./components/pages/Cart.js";
import CreateCategory from "./components/admin/category/CreateCategory";
import UpdateCategory from "./components/admin/category/UpdateCategory";
import CategorytDetail from "./components/pages/CategorytDetail.js";
import ProductSearch from "./components/pages/ProductSearch.js";
import Myorder from "./components/pages/myorder.js";

import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="container mx-auto ">
      <Navbar />
      <NavbarCaterory />
      {/* <h1 className="text-2xl font-bold text-center text-gray-700">CRUD with redux toolkit</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />

        <Route path="/productsearch/:keyword" element={<ProductSearch />} />

        <Route path="/admin/index" element={<HomeAdmin />} />

        <Route path="/myorder/:id" element={<Myorder />} />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/payment"
          element={
            // <Protected isSignedIn={isSignedIn}>
            <Payment />
            // </Protected>
          }
        />

        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/categorytDetail/:categoryfind/:nameCat"
          element={<CategorytDetail />}
        />
        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/update-category/:id"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/order"
          element={
            <AdminRoute>
              <AdminOrder />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
