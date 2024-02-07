import axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/v1/user/login", userData)
      .then((res) => {
        setUser(res?.data?.data);
        navigate("/");
      })
      .catch((err) => console.log(err?.response?.data));
  }
  return (
    <div className="flex justify-center items-center h-[calc(100svh-55px)]">
      <div className="flex flex-col w-[300px] gap-2">
        <input
          className="input-primary"
          type="email"
          name="email"
          autoComplete="on"
          value={userData.email}
          placeholder="Email"
          onChange={(e) => setuserData({ ...userData, email: e.target.value })}
        />
        <input
          className="input-primary"
          type="password"
          name="password"
          autoComplete="off"
          value={userData.password}
          placeholder="Password"
          onChange={(e) =>
            setuserData({ ...userData, password: e.target.value })
          }
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 p-2 rounded-lg text-white font-semibold hover:bg-blue-600"
        >
          Register
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
