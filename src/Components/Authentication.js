import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./Context";
import "./Authentication.css";
import { Link } from "react-router-dom";
import axios from "./axios";
import { useHistory } from "react-router";
import Loader from "./Loader";
import "./Edit.css";
import $ from "jquery";
function Authentication() {
  const { setIslogged } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const login = (e) => {
    e.preventDefault();
    const obj = {
      email: email,
      password: password,
    };
    $(".loader").addClass("activeLoader");
    $(".auth").attr("id", "whenlodingbackBlur");
    axios
      .post("/user/login", { obj })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else if (!res.data.error) {
          localStorage.setItem("accessToken", res.data.auth_token);
          setIslogged({
            name: res.data.username,
            id: res.data._id,
            loginstatus: true,
          });
          $(".loader").removeClass("activeLoader");
          $(".auth").removeAttr("id", "whenlodingbackBlur");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="auth">
        <div className="authentication">
          <form>
            <center>
              <Link to="/">
                <img
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="logo"
                  className="logo_form"
                />
              </Link>
            </center>
            <input
              type="email"
              placeholder="email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password..."
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={login}>
              Log in
            </button>
          </form>
          <p>
            Don't have an account ?{" "}
            <Link to="/signup">
              <strong> Sign Up </strong>
            </Link>
          </p>
        </div>
      </div>
      <Loader />
    </>
  );
}

export default Authentication;
