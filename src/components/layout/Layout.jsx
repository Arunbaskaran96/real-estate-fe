import React from "react";
import Topbar from "../topbar/Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
}
