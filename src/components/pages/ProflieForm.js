import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, reset, updateUser } from "../../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

const ProplieForm = ({ listuser, setIsEditing, isEditing,id }) => {
  const initialState = {

    name: listuser?.name,
    email: listuser?.email,
    phone: listuser?.phone,
    address: listuser?.address,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(initialState);

  //save change
  const saveProfile = async (e) => {
    e.preventDefault();
    const formData = {
      name: profile.name,
      phone: profile.phone,
      address: profile.address,
    };
    await dispatch(updateUser({id,formData}));
    setIsEditing(!isEditing);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div>
      แก้ไข{id}
      <form
        className="max-w-[550px] border border-red-500"
        onSubmit={saveProfile}
      >
        <span className="grid grid-cols-2 p-10 px-5">
          <p className="p-1 mt-2 ">
            <label>Name:</label>
          </p>
          <p>
            <input
              type="text"
              name="name"
              value={profile?.name}
              className="p-1 mt-2 border border-red-500 bg-gray-50"
              onChange={handleInputChange}
            />
          </p>

          <label className="p-1 mt-2">ที่อยู่:</label>
          <p className="p-1 mt-2 ">
            <textarea
              name="address"
              value={profile?.address}
              className="p-1 mt-2 border border-red-500 bg-gray-50"
              onChange={handleInputChange}
              cols="20"
              rows="5"
            ></textarea>
          </p>
          <p className="p-1 mt-2 ">
            <label>Phone:</label>
          </p>
          <p>
            <input
              type="text"
              name="phone"
              value={profile?.phone}
              className="p-1 mt-2 border border-red-500 bg-gray-50"
              onChange={handleInputChange}
            />
          </p>

          <p className="p-1 mt-2 ">
            <label>Email:</label>
          </p>
          <p className="p-1 mt-2 ">
            <input type="text" name="email" value={listuser?.email} disabled />
          </p>
        </span>
        <button
          className="w-20 p-2 mx-5 my-5 text-white bg-red-400"
          onClick={() => saveProfile()}
        >
          Save edit {isEditing}
        </button>
      </form>
    </div>
  );
};

export default ProplieForm;
