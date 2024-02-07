import React, { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Register, Login } from "./components";
import Layout from "./Layout";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/test")
      .then((res) => {
        setUser(res?.data?.data);
      })
      .catch((err) => console.log(err?.response?.data));
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
