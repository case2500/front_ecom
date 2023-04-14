import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  SET_LOGIN,
  SET_USER,
  login,
  reset,
} from "./../../../features/auth/authSlice.js";

import { loginUser, validateEmail } from "../../services/authService.js";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //check token
  const textuser = localStorage.getItem("user");
  const objuser = JSON.parse(textuser);
  const authtoken = objuser && objuser.token;

  //check redirect to  navigate("/");
  // const { user, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth.user
  // );

  //check redirect to  navigate("/");
  // const { users, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );
  // const {users} =  JSON.stringify(objuser)
  useEffect(() => {
    if (objuser && authtoken) {
      navigate("/");
    }

    // dispatch(reset());
  }, [dispatch, textuser]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // alert(e)
    const userData = {
      email,
      password,
    };
    try {
      // const data = await loginUser(userData);
      const data =  await dispatch(login(userData));
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      // alert(JSON.stringify(data))
      // if (data) {
      //   localStorage.setItem("user", JSON.stringify(data));
      // }
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center py-10 overflow-hidden">
      <div className="w-full p-1 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <section className="heading">
          <h1 className="text-3xl font-semibold text-center text-green-700 underline">
            <FaSignInAlt /> Login
          </h1>
        </section>

        <section className="form">
          <form className="mt-2" onSubmit={onSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                email
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="">
              <label className="block text-sm font-semibold text-gray-800">
                password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>

            <div className="">
              <button
                type="submit"
                className="w-full px-4 py-2 mt-5 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?
          <div className="font-medium text-red-600 hover:underline">
            <Link to="/register">Register</Link>
          </div>
        </p>
      </div>
      {/* {JSON.stringify(data)} */}
    </div>
  );
}

export default Login;
