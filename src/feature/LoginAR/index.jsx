import React, { useState } from "react";
import axiosFuntion from "../../axios";
import Loading from "../../component/Loading";
import Notical from "../../component/Notical";
import "./style.scss";

export default function Index() {
  const $ = document.querySelector.bind(document);
  const [check, setCheck] = useState(true);
  const [status, setStatus] = useState("d-none");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState("d-none");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log($("#name").value.length);
    if ($("#name").value.length < 5) {
      setStatus("bg-danger");
      setMessage("username phải lớn hơn 5 ký tự");
    } else if ($("#pass").value.length < 5) {
      setStatus("bg-danger");
      setMessage("password phải lớn hơn 5 ký tự");
    } else if (!check && $("#pass").value !== $("#repass").value) {
      setStatus("bg-danger");
      setMessage("password và repassword không trùng nhau");
    } else {
      const data = {
        username: $("#name").value,
        password: $("#pass").value,
      };

      setLoad("");
      axiosFuntion(data, check ? "/login" : "/register").then((data) => {
        setLoad("d-none");
        console.log(data);
        if (data.data.status === "failure") {
          setStatus("bg-danger");
          setMessage(data.data.message);
        } else {
          setStatus("bg-success");
          setMessage(data.data.message);
        }
        if (check && data.data.status === "success") {
          function setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
          }
          setCookie("tokenLogin", data.data.token);
          window.location = "/";
        }
      });
    }
  };
  return (
    <>
      <Loading status={load} />
      <Notical
        status={status}
        message={message}
        handleFuntion={() => {
          setStatus("d-none");
        }}
      />
      <div className="login">
        <form className="loginAR" onSubmit={handleSubmit}>
          <h1 className="title my-5 mx-3">Welcome to blogbook</h1>
          <div className="d-flex justify-content-around my-2 fs-5">
            <div className="click">
              <div
                className={check ? " boder" : ""}
                onClick={() => {
                  setCheck(true);
                }}
              >
                Đăng nhập
              </div>
            </div>
            <div className="click">
              <div
                className={!check ? " boder" : " "}
                onClick={() => {
                  setCheck(false);
                }}
              >
                Đăng ký
              </div>
            </div>
          </div>
          <div className="my-5">
            <div className="username d-flex  form">
              <i className="far fa-user"></i>
              <input type="text" placeholder="username..." id="name" required />
            </div>
            <div className="password d-flex  form">
              <i className="fas fa-key"></i>
              <input
                type="password"
                id="pass"
                placeholder="password..."
                required
              />
            </div>
            {!check && (
              <div className="repassword d-flex  form">
                <i className="fas fa-lock-open"></i>
                <input
                  type="password"
                  id="repass"
                  placeholder="repeat password..."
                  required
                />
              </div>
            )}
          </div>
          <input
            type="submit"
            className="mb-5 mx-5 click submit"
            value={check ? "Đăng nhập" : "Đăng ký"}
          />
        </form>
      </div>
    </>
  );
}
