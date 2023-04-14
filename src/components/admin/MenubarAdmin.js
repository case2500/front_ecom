import React from "react";
import { Link } from "react-router-dom";

const MenubarAdmin = () => {
  return (
    <div className="flex">
      <div className="flex flex-col p-3 bg-gray-800 shadow h-80 w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
          </div>
          {/* <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center py-4">
              <button
                type="submit"
                className="p-2 focus:outline-none focus:ring"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
            />
          </div> */}
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm text-xl">
              <li className="rounded-sm">
                <Link to="/admin/index" className="w-6 h-6 text-gray-100">
                {" "}
                  * แดชบอร์ด
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/admin/create-category"
                  className="w-6 h-6 text-gray-100"
                >
                  {" "}
                  * เพิ่มหมวดหมู่
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/admin/manage-admin"
                  className="w-6 h-6 text-gray-100"
                >
                  {" "}
                  * จัดการผู้ใช้งาน
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/admin/create-product"
                  className="w-6 h-6 text-gray-100"
                >
                  {" "}
                  * เพิ่มสินค้า
                </Link>
              </li>
              <li className="rounded-sm">
                <Link to="/admin/order" className="w-6 h-6 text-gray-100">
                  * จัดการ order
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    // <nav>
    //   <ul className="nav flex-column">
    //     <li className="nav-item">
    //       <Link to="/admin/index">* แดชบอร์ด</Link>
    //     </li>
    //     <hr className="py-2"></hr>
    //     <li className="nav-item">
    //       <Link to="/admin/manage-admin"> * จัดการผู้ใช้งาน</Link>
    //     </li>
    //     <hr className="py-2"></hr>
    //     <li className="nav-item">
    //       <Link to="/admin/create-category"> * เพิ่มหมวดหมู่</Link>
    //     </li>
    //     <hr className="py-2"></hr>
    //     <li className="nav-item">
    //       <Link to="/admin/create-product"> * เพิ่มสินค้า</Link>
    //     </li>
    //     <hr className="py-2"></hr>
    //     <li className="nav-item">
    //       <Link to="/admin/order"> * จัดการ order</Link>
    //     </li>
    //     <hr className="py-2"></hr>
    //   </ul>
    // </nav>
  );
};

export default MenubarAdmin;
