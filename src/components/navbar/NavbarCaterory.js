import React, { useEffect, useState } from "react";
// function
import { listCategory } from "../functions/category";
import { Link } from "react-router-dom";

const NavbarCaterory = () => {
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  useEffect(() => {
    listCategory().then((res) => setCategory(res.data));
  }, []);

  return (

      <div className="flex flex-row flex-wrap justify-center gap-5 py-2 mx-auto bg-red-100/50 ">
        <Link to={`/`}>
          <div>รายการทั้งหมด</div>
        </Link>
        {category.map((item, index) => (
          <div key={index} className="flex flex-row justify-start ">
            <Link to={`/categorytDetail/${item._id}/${item.name}`}>
              <div className="flex flex-row text-gray-600 text-md hover:text-red">
                {item.name}
              </div>
            </Link>
          </div>
        ))}
        <hr></hr>
      </div>
    
  );
};

export default NavbarCaterory;
