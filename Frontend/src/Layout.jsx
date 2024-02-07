import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import {Navbar, UrlShortener} from "./components";

function Layout() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      {location.pathname === "/register" || location.pathname === "/login" ? null : <UrlShortener />}
      <Outlet />
    </>
  );
}

export default Layout;
