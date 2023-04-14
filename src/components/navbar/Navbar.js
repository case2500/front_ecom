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
import { Transition } from "@headlessui/react";

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
  const username = objuser && objuser.email;
  const [isOpen, setIsOpen] = useState(false);
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

    <div>
      <nav>
        <div>
          <div>
            <div className="hidden md:block">
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
                                {objuser && objuser.email}
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
                                  <Link to={`/myorder/` + objuser._id}>
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
            </div>
          </div>
          <div className="flex -mr-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="flex items-center justify-center p-2 text-gray-400 bg-gray-900 rounded-md hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <div className="sticky top-0 z-10 flex items-center justify-between w-full px-1 mx-auto my-1 text-white bg-red-500 shadow-lg shadow-black-500/50 sm:px-24 h-14 xl:top-0">
                  <span className=" md:w-96 md:mx-2 text-md md:text-md lg:text-4xl">
                    <Link>Case Shop</Link>
                  </span>
                  <Link to={`/payment`}>
                    <button className="">
                      <BsFillCartFill size={20} className="mr-2" />
                      {cart.cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </button>
                  </Link>

                  <div>
           
                    {objuser && objuser.token ? (
                      <div className="text-white ">
                        <div>
                          {objuser && objuser.email}
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
                            <Link to={`/myorder/` + objuser._id}>
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
                  </div>

            
                  <ul className="flex ">
                    {/* <li className="p-8">
                      <Link to="/">Home</Link>
                    </li> */}

                    <div className="box-content flex items-center justify-between h-16 py-1 mx-auto max-w-7xl">
                      <div className="flex items-center p-4 space-x-2">
                        <nav className="absolute top-0 items-center hidden w-full pb-3 mt-16 text-sm font-medium text-gray-500 translate-y-2 bg-white md:relative md:mt-0 md:flex md:w-auto md:translate-y-0 md:space-x-2 md:bg-transparent md:pb-0">
                          <span className="relative inline-block group">
                            {objuser && objuser.token ? (
                              <div className="pt-8 text-white rounded-md marker:text-sm group-hover:block">
                                <div>
                                  {objuser && objuser.email}
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
                                    <Link to={`/myorder/` + objuser._id}>
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
              </div>
            </div>
          )}
        </Transition>
      </nav>

    </div>
  );
};

export default Navbar;
