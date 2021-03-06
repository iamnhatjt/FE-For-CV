import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosFuntion from "../../axios/index";
import Loading from "../../component/Loading";
import "./style.scss";

export default function Detail() {
  const $ = document.querySelector.bind(document);

  const state = useSelector((state) => state.reducer);

  const [checkLoad, setCheckLoad] = useState("d-block");
  const [book, setBook] = useState({
    FiveStart: 0,
    ForStart: 0,
    ThreeStart: 0,
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
  });
  useEffect(() => {
    const id = window.location.pathname.slice(6);
    axiosFuntion({ id: id }, "/getbook").then((data) => {
      if (data.data.status === "success") {
        setCheckLoad("d-none");
        setBook(data.data.data);
      }
    });
  }, []);

  function time(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${day} - ${month} - ${year} `;
  }

  // delete when done
  console.log(book);
  // setting for push

  const functionPostComment = (e) => {
    var rate = document.getElementsByClassName("rate-check");
    var rateStart = 4;
    for (var i = 0; i < rate.length; i++) {
      if (rate[i].checked) {
        rateStart = 5 - i;
      }
    }
    const data = {
      comment: $(".data-comment-textarea").value,
      from: state.username,
      rate: rateStart,
      idBook: window.location.pathname.slice(6),
    };
    console.log(data);
    if ($(".data-comment-textarea").value.length < 1) {
      return;
    }
    setCheckLoad("d-block");
    axiosFuntion(data, "/uploadComment").then((data) => {
      console.log(data);
      setBook(data.data.data);

      setCheckLoad("d-block");
      if (data.data.status === "success") {
        setCheckLoad("d-none");
        $(".data-comment-textarea").value = "";
      }
    });
  };

  return (
    <div className="detail">
      <Loading status={checkLoad} />
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 col-md-6 text-center mb-5">
            <img src={book.image} alt="???nh ?????i di???n cho s??ch" />
          </div>
          <div className="col-12 col-md-6">
            <div className="fs-5 mb-2">T??n s??ch: {book.title}</div>
            <div className="fs-5 mb-2">T??c gi???: {book.author}</div>
            <div className="fs-5 mb-2">Th??? lo???i: {book.category}</div>
            <div className="fs-5 mb-2">reviewer: {book.from}</div>

            <div className="fs-5 mb-2">????ng ng??y: {time(book.createAt)}</div>
            <div className="fs-5 mb-2">
              <i className="fas fa-eye me-3"></i>
              {book.view}
            </div>
          </div>
        </div>
        <div className="fs-3 my-5">L???i b??nh c???a b???n ?????c</div>
        <div className="review px-3">
          {book.review.map((bookChild, index) => {
            return (
              <div key={index}>
                <div className="fs-4 my-3">{bookChild.title}</div>
                <div className="fs-5 px-3">{bookChild.words} </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container-fluid my-4 ">
        <div className="fs-4 d-flex justify-content-center">
          <div className="star">{book.FiveStart}</div>
          <div className="star-rate">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
        <div className="fs-4 d-flex justify-content-center">
          <div className="star">{book.ForStart}</div>
          <div className="star-rate">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
        <div className="fs-4 d-flex justify-content-center">
          <div className="star">{book.ThreeStart}</div>
          <div className="star-rate">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
        <div className="fs-4 d-flex justify-content-center">
          <div className="star">{book.TwoStart}</div>
          <div className="star-rate">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
        <div className="fs-4 d-flex justify-content-center">
          <div className="star">{book.oneStart}</div>
          <div className="star-rate">
            <i className="fas fa-star"></i>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-5">
        <div className="fs-4 mb-5">B??nh lu???n c???a kh??n gi???</div>
        <div className="text-center d-flex justify-content-center my-5">
          <div className="fs-5">????nh gi?? c???a b???n v??? b??i n??y:</div>
          <div className="ps-1 rate-form">
            <input
              type="radio"
              name="rate"
              id="rate-5"
              className="rate-check"
            />
            <label htmlFor="rate-5" className="fas fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rate-4"
              className="rate-check"
            />
            <label htmlFor="rate-4" className="fas fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rate-3"
              className="rate-check"
            />
            <label htmlFor="rate-3" className="fas fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rate-2"
              className="rate-check"
            />
            <label htmlFor="rate-2" className="fas fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rate-1"
              className="rate-check"
            />
            <label htmlFor="rate-1" className="fas fa-star"></label>
          </div>
        </div>
      </div>
      <form>
        <textarea
          name=""
          id=""
          cols="30"
          rows="2"
          placeholder="B??nh lu???n c??ng khai...(n???u kh??ng ????nh gi?? sao th?? b??nh lu???n t??? ?????ng 4*)"
          className="col-12 data-comment-textarea"
          required
        ></textarea>
        <div className="d-flex justify-content-end post">
          <div
            className="click  mt-2 "
            onClick={() => {
              $(".post").classList.add("d-none");
            }}
          >
            h???y
          </div>
          <div className="click mx-5 mt-2 push" onClick={functionPostComment}>
            B??nh lu???n
          </div>
        </div>
      </form>
      <div className="comment-review">
        {book.comment.length <= 0 && (
          <div className="text-center py-5">
            H??y l?? ng?????i b??nh lu???n ?????u ti??n
          </div>
        )}
        {!book.comment.length <= 0 && (
          <div className=" py-5">
            {book.comment.map((book, index) => {
              return (
                <div className="my-3" key={index}>
                  <div className="ps-4 fs-4" style={{ color: "#22e34c" }}>
                    {book.from}
                    <span className="px-3 fs-5">cho {book.rate} sao</span>
                    <span className="fs-5">{time(book.createAt)}</span>
                  </div>
                  <div className="ps-5"> {book.comment} </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
