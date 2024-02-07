import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { user } = useContext(UserContext);

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  return (
    <nav className="flex justify-between items-center px-4 py-2 max-h-[55px] border-[1px]">
      <div className="text-2xl font-bold">SHORTIFY</div>
      {user ? (
        <div className="flex gap-3 items-center">
          <p className="capitalize text-lg font-medium bg-slate-100 rounded-full px-4 py-2">
            {user.username}
          </p>
          <i
            className="fa-solid fa-ellipsis text-xl cursor-pointer"
            onClick={() => setOpenDropDownMenu(!openDropDownMenu)}
          ></i>
          {openDropDownMenu && <DropDownMenu />}
        </div>
      ) : (
        <div className="flex gap-2.5">
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-blue-600"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-black px-4 py-2 rounded-full text-white font-semibold hover:bg-transparent hover:text-black border-black border-2 "
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

function DropDownMenu() {
  const { setUser } = useContext(UserContext);

  function handleLogout() {
    axios.get("/api/v1/user/logout").then((res) => {
      setUser(res?.data?.data)
    });
  }

  return (
    <div className="flex flex-col gap-2 absolute top-[55px] right-4 bg-slate-100 rounded-sm">
      <ul>
        <li className="px-7 py-3 font-medium hover:bg-slate-200 cursor-pointer">
          <Link to="/profile" className="w-full">
            <i className="fa-regular fa-user mr-2"> </i>Profile
          </Link>
        </li>
        <li className="px-7 py-3 font-medium hover:bg-slate-200 cursor-pointer">
          <Link className="w-full" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket mr-2"> </i>Log
            out
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
