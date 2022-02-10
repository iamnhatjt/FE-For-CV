import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosFuntion from "../../axios";
import "./style.scss";

export default function MyAcount() {
  const state = useSelector((state) => state.reducer);
  console.log(state);
  const [books, setBooks] = useState([
    {
      FiveStart: 1,
      ForStart: 0,
      ThreeStart: 1,
      TwoStart: 0,
      author: "",
      category: "",
      comment: [],
      createAt: "",
      from: "",
      image: "",
      oneStart: 0,
      review: [],
      title: "",
      view: 0,
      __v: 0,
      _id: "",
    },
  ]);
  useEffect(() => {
    axiosFuntion({}, "/myaccount").then((data) => {
      setBooks(data.data);
      console.log(books);
    });
  }, []);

  function functionView() {
    let view = 0;
    for (var a of books) {
      view = view + a.view;
    }
    return view;
  }

  function star(book) {
    let array = [];
    array.push(book.FiveStart);
    array.push(book.ForStart);
    array.push(book.ThreeStart);
    array.push(book.TwoStart);
    array.push(book.oneStart);
    let number = 0;
    for (var a of array) {
      if (a > 0) {
        number += 1;
      }
    }
    if (number > 0) return number;
    return 1;
  }

  return (
    <div className="account">
      {!state.login && (
        <Link to="/login" className="text-center fs-3 Link d-block bg-warning">
          Đăng Nhập để sử dụng chức năng này
        </Link>
      )}

      <div className="d-flex m-2 justify-content-between">
        <div>Số bài đăng của ban: {books.length}</div>
        <div>Số view bạn có: {functionView()}</div>
      </div>
      <div>
        {books.map((book, index) => {
          return (
            <div className="my-5 d-flex justify-content-between">
              <Link to={"/book/" + book._id} className="d-flex Link">
                <img src={book.image} alt="" className="book-image mx-2" />
                <div>
                  <div className="fs-3"> {book.title}</div>
                  <div className="fs-5"> {book.author}</div>
                  <div className="my-3">
                    <div>view: {book.view} </div>
                    <div>
                      start:{" "}
                      {(book.FiveStart * 5 +
                        book.ForStart * 4 +
                        book.ThreeStart * 3 +
                        book.TwoStart * 2 +
                        book.oneStart) /
                        star(book)}{" "}
                    </div>
                  </div>
                </div>
              </Link>
              <i className="fas fa-trash-alt fs-3 trash "></i>
            </div>
          );
        })}
      </div>
    </div>
  );
}
