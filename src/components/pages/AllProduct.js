import React from "react";
import { Link } from "react-router-dom";
const AllProduct = ({ currentItems }) => {
  return (
    <>
      <div className="flex justify-center ">
        {/* <h1>สินค้า</h1> */}
      </div>
      <hr></hr>
      <div className="grid grid-cols-2 gap-3 mb-8 sm:grid-cols-2 md:grid-cols-6 ">
        {currentItems &&
          currentItems.map((product, index) => (
            <div
              key={index}
              className="p-1 bg-white cursor-pointer hover:scale-105 hover:shadow-md hover:shadow-gray-300"
            >
              <Link to={`/productdetail/${product._id}`}>
                <div className="mx-auto ">
                  <img
                    src={
                      product.images && product.images.length
                        ? product.images[0].url
                        : ""
                    }
                    // src={product.image && product.image.filePath}
                    className="object-cover h-32 mx-auto "
                  />
                </div>

                <div className="mt-1 text-left h-30">
                  <p className="text-sm italic text-left h-14">
                    {product.name} {product.description.slice(0, 45)}...
                  </p>
                  <p className="font-bold text-left text-red-500 text-md ">
                    {product.price} ฿
                  </p>
                </div>
       
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllProduct;
