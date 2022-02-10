import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";

export default function HomePage() {
  return (
    <div className="">
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
