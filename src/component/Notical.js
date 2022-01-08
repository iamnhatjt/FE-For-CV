import React from "react";
import "./style.scss";
export default function Notical({ status, message, handleFuntion }) {
  return (
    <div className={"notical d-flex justify-content-around p-2  " + status}>
      <div>{message}</div>
      <i className="fas fa-times click fs-5 " onClick={handleFuntion}></i>
    </div>
  );
}
