import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { Link, redirect, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate()

  const [userData, setuserData] = useState({username: "",email: "", password: ""});

  const { user, setUser } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/v1/user/register", userData)
      .then((res) => {
        setUser(res?.data?.data)
        navigate("/")
      })
      .catch((err) => console.log(err?.response?.data));
  }

  return (
    <div className="flex justify-center items-center h-[calc(100svh-55px)]">
      <div className="flex flex-col w-[300px] gap-2">
        <input
          className="input-primary"
          type="text"
          name="username"
          autoComplete="off"
          value={userData.username}
          placeholder="Username"
          onChange={(e) =>
            setuserData({ ...userData, username: e.target.value })
          }
        />
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
        <button type="submit" onClick={handleSubmit} className="bg-blue-500 p-2 rounded-lg text-white font-semibold hover:bg-blue-600">Register</button>
        <p className="text-center">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
