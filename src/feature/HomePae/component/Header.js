import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../style.scss";

export default function Header() {
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <>
      <div className="header-md d-none d-md-block">
        <nav className="header d-flex ">
          <div>
            <i
              className="fas fa-bars px-4 fs-5 click"
              onClick={() => {
                document
                  .querySelector(".header-second")
                  .classList.toggle("active");
              }}
            ></i>
            <Link className="fs-5 Link" to="">
              Myblog book
            </Link>
          </div>
          <div className="input">
            <input type="text" placeholder="Tìm kiếm cuốn sách của bạn" />
            <i className="fas fa-search click"></i>
          </div>
        </nav>
        <nav className="header-second fs-5">
          <Link to="" className="item-header Link d-md-flex py-2 hover">
            <i className="fas fa-home px-4 "></i>
            <div className="item-text">Home</div>
          </Link>
          <Link to="" className="item-header Link d-md-flex py-2 hover">
            <i className="fas fa-home px-4 "></i>
            <div className="item-text">Home</div>
          </Link>
          <Link to="" className="item-header Link d-md-flex py-2 hover">
            <i className="fas fa-home px-4 "></i>
            <div className="item-text">Home</div>
          </Link>
          <Link to="" className="item-header Link d-md-flex py-2 hover">
            <i className="fas fa-home px-4 "></i>
            <div className="item-text">Home</div>
          </Link>

          <div className="end-second ">
            <Link to="" className="Link d-flex">
              <i className="fas fa-sign-in-alt px-4 fs-5"></i>
              <div className="end-text">usernaem</div>
            </Link>
          </div>
        </nav>
      </div>
      <nav className="d-block d-md-none">
        <div className="header-three">
          <Link to="" className="Link text-success fs-5">
            BlogBook
          </Link>
        </div>
      </nav>
    </>
  );
}
