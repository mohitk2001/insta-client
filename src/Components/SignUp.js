import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "./axios";
import { useHistory } from "react-router";
function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history=useHistory();

  const register = async (e) => {
    e.preventDefault();
    const obj = {
      name: name,
      email: email,
      username: username,
      password: password,
    };

    await axios
      .post("/user/signUp", { obj })
      .then((res) => {
        history.push("/login")
      })
      .catch((err) => {
        console.log(err);
      });
    setName("")
    setEmail("")
    setPassword("")
    setUsername("")
  };
  return (
    <div className="signUp">
      <form>
        <center>
          <Link to="/">
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="logo"
              className="logo"
            />
          </Link>
        </center>
        <input
          type="text"
          placeholder="full name..."
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="username..."
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="submit" onClick={register}>Sign Up </button>
      </form>
    </div>
  );
}

export default SignUp;
