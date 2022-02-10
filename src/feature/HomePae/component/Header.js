import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../style.scss";
import Loading from "../../../component/Loading";
import { getData } from "../../../store";

export default function Header() {
  const state = useSelector((state) => state.reducer);
  const [find, setFind] = useState("");
  const handleInputSearch = () => {
    document.querySelector(".findTheBook").classList.remove("d-none");
    document.querySelector(".findTheBook").classList.add("d-block");
  };
  const handleInputout = () => {
    setTimeout(() => {
      document.querySelector(".findTheBook").classList.remove("d-block");
      document.querySelector(".findTheBook").classList.add("d-none");
    }, 200);
  };

  function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str;
  }

  const Dispatch = useDispatch();
  const [status, setStatus] = useState("d-block");

  useEffect(() => {
    Dispatch(getData()).then(() => {
      setStatus("d-none");
    });
  }, []);

  const handleOnMobileSearch = () => {
    document.querySelector(".searchForMobile").classList.remove("d-none");
    document.querySelector(".searchForMobile").classList.add("d-block");
  };

  return (
    <>
      <Loading status={status} />
      <div className="findTheBook d-none ">
        {state.books.map((book, index) => {
          if (
            removeVietnameseTones(book.title)
              .toLowerCase()
              .indexOf(removeVietnameseTones(find).toLowerCase()) !== -1
          ) {
            return (
              <Link
                to={"/book/" + book._id}
                key={index}
                className="d-flex Link"
              >
                <img src={book.image} alt="" className="find-image" />
                <div className="fs-5 my-2">
                  <div> {book.title} </div>
                  <div style={{ fontSize: 12 }}> {book.from} </div>
                </div>
              </Link>
            );
          }
        })}
      </div>

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
            <input
              type="text"
              placeholder="Tìm kiếm cuốn sách của bạn"
              onFocus={handleInputSearch}
              onBlur={handleInputout}
              onChange={(e) => {
                setFind(e.target.value);
              }}
            />
            <i className="fas fa-search click"></i>
          </div>
        </nav>
        <nav className="header-second fs-5 active">
          <Link to="" className="item-header Link d-md-flex py-2 hover">
            <i className="fas fa-home px-4 "></i>
            <div className="item-text">Home</div>
          </Link>
          <Link
            to="/trending"
            className="item-header Link d-md-flex py-2 hover"
          >
            <i className="fas fa-poll px-4"></i>
            <div className="item-text">Trending</div>
          </Link>
          <Link to="/upload" className="item-header Link d-md-flex py-2 hover">
            <i className="fas fa-upload px-4"></i>
            <div className="item-text">Upload</div>
          </Link>
          <Link to="account" className="item-header Link d-md-flex py-2 hover">
            <i className="fas fa-user-circle px-4"></i>
            <div className="item-text">account</div>
          </Link>

          <div className="end-second ">
            {state.login && (
              <Link to="/login" className="Link d-flex">
                <i className="fas fa-sign-in-alt px-4 fs-5"></i>
                <div className="end-text">{state.username}</div>
              </Link>
            )}
            {!state.login && (
              <Link to="/login" className="Link d-flex">
                <i className="fas fa-sign-in-alt px-4 fs-5"></i>
                <div className="end-text">Login</div>
              </Link>
            )}
          </div>
        </nav>
      </div>
      <nav className="d-block d-md-none">
        <div className="header-three">
          <div className="d-flex justify-content-between">
            <Link to="" className="Link text-success fs-5 px-3">
              BlogBook
            </Link>
            <div className="click text-success fs-5 px-3">
              <i className="fas fa-search" onClick={handleOnMobileSearch}></i>
            </div>
          </div>
          <div className="searchForMobile  d-none">
            <div
              className="contain-1 display-item"
              onClick={() => {
                console.log("click ");
              }}
            >
              <div className="my-4">
                <input
                  type="text"
                  placeholder="Tìm kiếm cuốn sách của bạn..."
                  className="w-100 input-mobile"
                  onChange={(e) => {
                    setFind(e.target.value);
                  }}
                />
              </div>
              <nav className="displayItemMobile">
                {state.books.map((book, index) => {
                  if (
                    removeVietnameseTones(book.title)
                      .toLowerCase()
                      .indexOf(removeVietnameseTones(find).toLowerCase()) !== -1
                  ) {
                    return (
                      <Link
                        to={"/book/" + book._id}
                        key={index}
                        className="d-flex Link"
                        onClick={() => {
                          window.location.href = "/book/" + book._id;
                        }}
                      >
                        <img src={book.image} alt="" className="find-image" />
                        <div className="fs-5 my-2">
                          <div> {book.title} </div>
                          <div style={{ fontSize: 12 }}> {book.from} </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </nav>
            </div>
            <div
              className="contain-2"
              style={{ height: "100vh" }}
              onClick={() => {
                document
                  .querySelector(".searchForMobile")
                  .classList.add("d-none");
                document
                  .querySelector(".searchForMobile")
                  .classList.remove("d-block");
              }}
            ></div>
          </div>
          <div className="header-three-second d-flex justify-content-around text-center">
            <Link to="" className="item-header Link d-md-flex py-2 hover">
              <i className="fas fa-home px-4 "></i>
              <div className="item-text">Home</div>
            </Link>
            <Link
              to="/trending"
              className="item-header Link d-md-flex py-2 hover"
            >
              <i className="fas fa-poll px-4"></i>
              <div className="item-text">Trending</div>
            </Link>
            <Link
              to="/upload"
              className="item-header Link d-md-flex py-2 hover"
            >
              <i className="fas fa-upload px-4"></i>
              <div className="item-text">Upload</div>
            </Link>
            <Link
              to="account"
              className="item-header Link d-md-flex py-2 hover"
            >
              <i className="fas fa-user-circle px-4"></i>
              <div className="item-text">account</div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
