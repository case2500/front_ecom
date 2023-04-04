import React, { useState } from "react";
// import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logout, reset } from "../redux/features/auth/authSlice";
import { BiChevronDown } from "react-icons/bi";
// import { CLEAR_CART } from "./../redux/features/cart/cartSlice.js";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => ({ ...state }));
  // alert(JSON.stringify(user));
  // const { user } = useSelector((state) => state.auth);
  // const logout = async () => {
  //   // await logoutUser();
  //   await dispatch(SET_LOGIN(false));
  //   await dispatch(SET_LOG_OUT());
  //   navigate("/");
  // };

  const localStorageuser = localStorage.getItem("user");
  const objuser = JSON.parse(localStorageuser);
  const authtoken = objuser && objuser.token;
  const username = objuser && objuser.username;

  const handleNav = () => {
    setNav(!nav);
  };
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/productsearch/${keyword}`);
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    // px ขยับ navbar
    <div className="sticky top-0 z-10 flex items-center justify-between w-full px-1 mx-auto my-1 text-white bg-red-500 shadow-lg shadow-black-500/50 sm:px-24 h-14 xl:top-0">
      <span className=" md:w-96 md:mx-2 text-md md:text-md lg:text-4xl">
        <Link>Case Shop</Link>
      </span>

      <div className="bg-white  md:max-w-[650px] sm:w-[200px] lg:w-[900px]">
        <form className="mt-0" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="p-1 text-black bg-white focus:outline-none"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
      </div>
      <div className="pr-5 text-white">
        <Link>
          <h2>
            <AiOutlineSearch size={25} />
          </h2>
        </Link>
      </div>
      <Link to={`/payment`}>
        <button className="items-center hidden px-4 py-2 text-white bg-red-800 rounded-md sm:flex">
          <BsFillCartFill size={20} className="mr-2" />
          {cart.cart.reduce((sum, item) => sum + item.quantity, 0)}
        </button>
      </Link>

      <ul className="hidden md:flex">
        <li className="p-8">
          <Link to="/">Home</Link>
        </li>
 
        <div className="box-content flex items-center justify-between h-16 py-1 mx-auto max-w-7xl">
     {objuser && objuser.role === `admin` ? <>(admin)</> : null}   
     <div className="flex items-center p-4 space-x-2">
            <nav className="absolute top-0 items-center hidden w-full pb-3 mt-16 text-sm font-medium text-gray-500 translate-y-2 bg-white md:relative md:mt-0 md:flex md:w-auto md:translate-y-0 md:space-x-2 md:bg-transparent md:pb-0">
           
              <span className="relative inline-block group">
                {objuser && objuser.token ? (
                  <div className="pt-8 text-white rounded-md marker:text-sm group-hover:block">
                   
                    <div>
                      {objuser.username}
                      <div className="px-8 pt-0 ">
                        <BiChevronDown className="text-2xl " />
                      </div>
                    </div>

                    <ul className="absolute hidden text-gray-700 bg-red-300 rounded-md group-hover:block w-44">
                      <li onClick={onLogout}>
                        <button className="flex justify-start px-2 py-1 bg-red-100 text-md hover:bg-gray-100 w-44">
                          ลงชื่ออก
                        </button>
                        <hr></hr>
                      </li>
                      <li>
                        <Link to={`/myorder/`+objuser._id} >
                        {/* <Link>/myorder/:id */}
                          <button className="flex justify-start px-2 py-1 bg-red-100 text-md hover:bg-gray-100 w-44 ">
                            รายการสั่งซื้อ
                          </button>
                          <hr></hr>
                        </Link>
                      </li>
                      <li>
                        {/* <Link to={`/productdetail/${product._id}`}> */}
                        {objuser && objuser.role === `admin` ? (
                          <Link to={`/admin/index`}>
                            <button className="flex justify-start px-2 py-1 bg-red-100 text-md hover:bg-gray-100 w-44 ">
                              Dashboard
                            </button>
                          </Link>
                        ) : null}
                      </li>

       
                      {/* {objuser.role} */}
                      {/* {objuser && objuser.role === `admin` ? (
                        <li>
                          <Link to={`/admin/index`}>
                            <button className="flex justify-start px-2 py-1 bg-red-100 text-md hover:bg-gray-100 w-44 ">
                              admin
                            </button>
                          </Link>
                        </li>
                      ) : null} */}
                    </ul>
                  </div>
                ) : (
                  <button className="inline-flex items-center px-4 py-1 mt-5 font-semibold bg-red-400 rounded rounded-md">
                    <Link to="/login">SignIn</Link>
                  </button>
                )}
                
              </span>
            </nav>
          </div>
        </div>
      </ul>

    </div>
  );
};

export default Navbar;
