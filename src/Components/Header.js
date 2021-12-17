import React, { useEffect } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context";
import {add_details} from "../Redux/Action/index"
import { useDispatch } from "react-redux";

import axios from "./axios.js";
function Header() {
  const { isLogged, setIslogged } = useContext(AuthContext);
  const dispatch=useDispatch()
  
  
  const history = useHistory();
  if (localStorage.getItem("accessToken") === null) {
    history.push("/login");
  }
  useEffect(() => {
    axios
      .get("/user/checkin", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.error) {
          setIslogged({ ...isLogged, loginstatus: false });
        } else if (!res.data.error) {
          setIslogged({
            name: res.data.username,
            id: res.data._id,
            loginstatus: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
      if(localStorage.getItem("accessToken")){
        console.log(isLogged)
        dispatch(add_details(isLogged))
      }
  }, [isLogged.loginstatus]);
 
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIslogged({
      name: null,
      id: null,
      loginstatus: false,
    });
    history.push("/login");
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo"
        />
      </Link>
      <div className="header_account_handle">
        {isLogged.loginstatus ? (
          <>
            <h4 onClick={() => history.push("/profile")}>{isLogged.name}</h4>
            <h4 className="logout_button" onClick={logout}>
              Log out
            </h4>
          </>
        ) : (
          <>
            <h4 onClick={() => history.push("/login")}>Sign In </h4>
            <h4 onClick={() => history.push("/signup")}>Sign Up</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
