
import React from "react";
import { Link } from "react-router-dom";

const MenubarAdmin = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/index">* แดชบอร์ด</Link>
        </li>
        <hr className="py-2"></hr>
        <li className="nav-item">
          <Link to="/admin/manage-admin"> * จัดการผู้ใช้งาน</Link>
        </li>
        <hr className="py-2"></hr>
        <li className="nav-item">
          <Link to="/admin/create-category"> * เพิ่มหมวดหมู่</Link>
        </li>
        <hr className="py-2"></hr>
        <li className="nav-item">
          <Link to="/admin/create-product"> * เพิ่มสินค้า</Link>
        </li>
        <hr className="py-2"></hr>
        <li className="nav-item">
          <Link to="/admin/order"> * จัดการ order</Link>
        </li>
        <hr className="py-2"></hr>
      </ul>
    </nav>
  );
};

export default MenubarAdmin;
