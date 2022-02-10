import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";
export default function HomePageMain() {
  const state = useSelector((state) => state.reducer.books);
  const [displayCount, setDisplayCount] = useState(9);
  console.log(state);
  function time(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${day} - ${month} - ${year} `;
  }
  return (
    <div className="main-page">
      <div className="container-fluid">
        <div className="row">
          {state.map((book, index) => {
            if (index > displayCount - 1) {
              return;
            }
            return (
              <Link
                className="col-12 col-md-6 col-xl-4 mb-5 Link "
                to={"book/" + book._id}
                key={book._id}
              >
                <div className="d-flex">
                  <img src={book.image} alt="" className="text-center" />
                  <div className="ps-5  ">
                    <div className="my-2">Tên sách: {book.title} </div>
                    <div className="my-2">Tác giả: {book.author}</div>
                    <div className="my-2">Thể loại: {book.category}</div>
                    <div className="my-2">Review : {book.from}</div>
                    <div className="my-2">Đăng từ: {time(book.createAt)}</div>
                    <div className="my-2 ">
                      <i className="fas fa-eye me-3 "></i> {book.view}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {displayCount < state.length && (
          <div className="text-center">
            <div
              className="click p-2 d-inline-block add"
              onClick={() => {
                setDisplayCount((pre) => pre + 6);
              }}
            >
              Hiện thị thêm
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
