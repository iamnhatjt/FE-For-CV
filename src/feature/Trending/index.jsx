import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosFuntion from "../../axios";
import "./style.scss";

export default function Trending() {
  const [view, setView] = useState(10);
  const [list, setList] = useState([
    {
      author: "Dale Carnegie",
      category: "",
      createAt: "2022-01-12T23:48:58.948Z",
      from: "nhatjt",
      image: "https://ireviewsach.com/uploads/logo/1616920594.jpg",
      title: "Đắc nhân tâm",
      view: 272,
      _id: "61df6c64cf8990b41a6dcd44",
    },
  ]);

  useEffect(() => {
    axiosFuntion({}, "/booksort", "get").then((data) => {
      setList(data.data);
    });
  }, []);
  console.log(list);

  return (
    <div className="trending">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <h2 className="text-center">
              Những quyển sách được xem nhiều nhất
              <div>
                {list.map((book, index) => {
                  if (index >= view) {
                    return;
                  }
                  return (
                    <div key={book._id} className="my-5">
                      <Link
                        to={"/book/" + book._id}
                        className="Link d-md-flex  item my-5 ms-md-5"
                      >
                        <img
                          src={book.image}
                          alt=""
                          className="image-item me-5"
                        />
                        <div>
                          <div className="title-text">{book.title} </div>
                          <div className="author-text">
                            <span>tác giả: </span> {book.author}{" "}
                          </div>
                          <div className="author-text">
                            <span>from: </span> {book.from}{" "}
                          </div>
                          <div className="author-text">
                            <span>lượt xem: </span> {book.view}{" "}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div>
                <div
                  className={"text-center click bg-warning d-inline px-3 fs-4 "}
                  onClick={(e) => {
                    setView((pre) => pre + 10);
                    if (view > list.length - 10) {
                      e.target.classList.value = "d-none";
                    }
                  }}
                >
                  Tải thêm
                </div>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
