import React, { useState, useEffect } from "react";
import { useContext } from 'react'
import {AuthContext} from "./Context"
import "./Authentication.css";
import { Link } from "react-router-dom";
import axios from "./axios";
import { useHistory } from "react-router";
function Authentication() {
  const {isLogged,setIslogged}=useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const login = (e) => {
    e.preventDefault();
    const obj = {
      email: email,
      password: password,
    };
    axios
      .post("/user/login", { obj })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else if (!res.data.error) {
          console.log(res.data)
          console.log(res.data.auth_token);
          localStorage.setItem("accessToken",res.data.auth_token)
          setIslogged({
             name:res.data.username,
             id:res.data._id,
             loginstatus:true
          })
          history.push("/")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
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
  );
}

export default Authentication;
