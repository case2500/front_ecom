import React, { useState, useEffect } from "react";
import MenubarAdmin from "./MenubarAdmin";
import { useDispatch, useSelector } from "react-redux";
import Search from "./search/Search";
import { listProduct, removeProduct } from "../functions/product";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getProducts,
  selectFilteredProducts,
  FILTER_BY_SEARCH,
} from "../../features/product/productSlice";
import ReactPaginate from "react-paginate";


const HomeAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  // const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const textuser = localStorage.getItem("user");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;
  const [search, setSearch] = useState("");
  // select products
  // const product = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  const { products, isLoggedIn, isError, message } = useSelector(
    (state) => state.product
  );

  const loadData = () => {
    dispatch(getProducts());
  };

  useEffect(() => {
    loadData();
  }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [products, search, dispatch]);

  const handleRemove = (id) => {
    // console.log(id)
    if (window.confirm("Delete ?")) {
      removeProduct(authtoken, id)
        .then((res) => {
          toast.success("Deleted " + res.data.title + " Success!!");
          loadData();
          console.log(res);
        })
        .catch((err) => {
          toast.error("Remove Error");
          console.log(err);
        });
    }
  };

  return (
    <div className="w-max">
      <div className="flex flex-row ">
        <div className="mx-10 my-10">
          <MenubarAdmin />
        </div>

        <div>
          <div>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table>
            {/* {JSON.stringify(products)} */}
            <thead>
              <tr>
                <th>Name</th>
                <th>price</th>
                <th>Quantity</th>
                <th>description</th>
                <th>Action</th>
              </tr>
            </thead>
            {currentItems.map((p, index) => (
              <>
                <tr className="text-lg ">
                  <td className="w-64 text-lg border-t-2 text-start">
                    {index + 1 + itemOffset}
                    {" . "}
                    {p.title}
                    {p.name}
                  </td>
                  <td className="w-32 text-center border-t-2">{p.price}</td>
                  <td className="w-32 text-center border-t-2">{p.quantity}</td>
                  <td className="w-32 text-center border-t-2">{p.brand}</td>
                  <td className="border-t-2 w-96">
                    {p.description.substring(0, 50)}....
                  </td>
                  <td className="w-32 border-t-2">
                    <img
                      src={p.images && p.images.length ? p.images[0].url : ""}
                      className="object-cover w-16 h-16 "
                    />
                  </td>
                  <td className="px-10 text-center border-t-2 w-62">
                    <Link to={"/admin/update-product/" + p._id}>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-4 border border-blue-500 hover:border-transparent rounded">
                        Edit
                      </button>{" "}
                    </Link>
                    <button
                      onClick={() => handleRemove(p._id)}
                      class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-0 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Del
                    </button>{" "}
                  </td>
                </tr>
              </>
            ))}
          </table>
          <hr></hr>
          <ReactPaginate
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="previous"
            pageClassName="page-item px-5 py-1 leading-tight  rounded-md bg-white border border-blue-600    "
            pageLinkClassName="page-link "
            previousClassName="page-item px-3 py-0   rounded-md bg-white border border-blue-600 "
            previousLinkClassName="page-link"
            nextClassName="page-item px-3 py-1  rounded-md bg-white border border-blue-600  "
            nextLinkClassName="page-link  "
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active px-2 py-1 leading-tight text-white rounded-md  bg-blue-600"
            renderOnZeroPageCount={null}
            className="flex flex-row justify-center gap-2 mt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
