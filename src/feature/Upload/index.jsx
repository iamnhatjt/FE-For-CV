import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosFuntion from "../../axios";
import Review from "./component/Review";
import "./style.scss";
import Loading from "../../component/Loading";
import Notical from "../../component/Notical";
import { Link } from "react-router-dom";
export default function Upload() {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const [notical, setNotical] = useState("d-none");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("d-none");
  const state = useSelector((state) => state.reducer);
  const [link, setLink] = React.useState("");
  const [count, setCount] = React.useState(1);

  let array = [];
  for (var i = 0; i < count; i++) {
    array.push(<Review key={i} />);
  }

  const handleUpload = () => {
    let reviewData = [];
    for (var i = 0; i < count; i++) {
      reviewData.push({
        title: $$(".data-review-title")[i].value,
        words: $$(".data-review-words")[i].value,
        image: $$(".data-review-image")[i].value,
      });
    }
    const data = {
      title: $(".data-title").value,
      author: $(".data-author").value,
      category: $(".data-category").value,
      image: $(".data-avatar").value,
      from: state.username,
      review: reviewData,
    };
    setStatus("d-block");
    axiosFuntion(data, "/upload").then((data) => {
      setStatus("d-none");
      if (data.data.status === "success") {
        setMessage("Đăng bài thành công.");
        setNotical("bg-success");
        window.location = "/";
      } else {
        setMessage("Đăng bài Thất bại.");
        setNotical("bg-danger");
      }
    });
    console.log(data);
  };

  return (
    <div>
      {!state.login && (
        <Link to="/login" className="text-center fs-3 Link d-block bg-warning">
          Đăng Nhập để sử dụng chức năng này
        </Link>
      )}
      <Loading status={status} />
      <Notical
        status={notical}
        message={message}
        handleFuntion={() => {
          setNotical("d-none");
        }}
      />
      <div className="contener-fluid text-center upload">
        <div className="row">
          <div className="fs-4 my-5">Thông tin sách</div>
          <div className="col-12 col-md-6">
            <div className="fs-5">title</div>
            <input
              type="text"
              placeholder="Nhập tên sách..."
              className="input data-title"
            />
            <div>
              <div className="fs-5">author</div>
              <input
                type="text"
                placeholder="Nhập tên tác giả..."
                className="input data-author"
              />
            </div>
            <div>
              <div className="fs-5">category</div>
              <input
                type="text"
                placeholder="Thể loại sách..."
                className="input data-category"
              />
            </div>
            <div>
              <div className="fs-5">Avatar</div>
              <textarea
                type="text"
                placeholder="Link ảnh..."
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                className="input textarea data-avatar"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img src={link} alt="" className="avatar-img" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className=" text-center fs-1 my-5">Review</div>
      </div>
      <div className="container-fluid">{array}</div>
      <div className="bonus d-flex justify-content-around mt-5">
        <div
          className="click review-click"
          onClick={() => {
            if (count < 2) {
              return;
            }
            setCount((pre) => pre - 1);
          }}
        >
          Xóa Review
          <i className="fas fa-times ps-2"></i>
        </div>
        <div
          className="click review-click bg-success"
          onClick={() => {
            setCount((pre) => pre + 1);
          }}
        >
          Thêm Review
          <i className="fas fa-plus-circle ps-2"></i>
        </div>
      </div>
      <div className="fs-5  d-flex justify-content-center mt-5 pb-5 click">
        <div className="review-click bg-warning" onClick={handleUpload}>
          upload
          <i className="fas fa-upload ps-2"></i>
        </div>
      </div>
    </div>
  );
}
