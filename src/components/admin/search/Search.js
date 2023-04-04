import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
 
      <div className={"mb-5"}>
        <input
          className={"mx-10 mt-1 border w-64 py-2"}
          type="text"
          placeholder="Search "
          value={value}
          onChange={onChange}
        />
        <button className={" mt-5 border border-red-500   w-16 py-2"}>ค้น</button>
      </div>

  );
};

export default Search;
