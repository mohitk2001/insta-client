import React, { useState, useEffect } from "react";
import { AuthContext } from "./Context.js";
import { useContext } from "react";
import "./Profile.css";
import axios from "./axios";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import { $ } from "jquery";
function Profile() {
  const { isLogged, setIslogged } = useContext(AuthContext);
  const [user_details, setUser_details] = useState({});
  const history = useHistory();
  useEffect(() => {
     axios
      .get("/user/getDetailsbyId", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        if (!res.data.error) setUser_details(res.data);
        else if (res.data.error) {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

   
  }, []);
  return (
    <div className="profile">
      <div className="profile_header">
        <Avatar
          className="profile_avatar"
          alt={user_details?.name}
          src={user_details?.desktop_profile}
        />
        <div className="profile_header_deatils">
          <h2>{user_details?.username}</h2>
          <h3>{user_details?.name}</h3>
        </div>
        <button className="profile_edit" onClick={() => history.push("/edit")}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
