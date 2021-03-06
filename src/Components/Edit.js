import React, { useState, useEffect } from "react";
import "./Edit.css";
import axios from "./axios";
import Axios from "axios";
import { AuthContext } from "./Context.js";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { Add_for_Post } from "../Redux/Action/index";
function Edit() {
  const { isLogged } = useContext(AuthContext);
  const dispatch = new useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [profilepic, setProfile] = useState(null);
  const uploadProfielPic = () => {
    if (isLogged.loginstatus) {
      if (profilepic) {
        $(".loader").addClass("activeLoader");
        $(".edit").attr("id", "whenlodingbackBlur");
        const data = new FormData();
        data.append("file", profilepic);
        data.append("upload_preset", "instagram-mern");
        data.append("cloud_name", "mohit001");
        Axios.post(
          "https://api.cloudinary.com/v1_1/mohit001/image/upload",
          data
        )
          .then((res) => {
            // console.log(res.data);
            axios
              .patch(
                "/update/profilePic",
                { imgurl: res.data.secure_url, id: isLogged.id },
                {
                  headers: { accessToken: localStorage.getItem("accessToken") },
                }
              )
              .then((response) => {
                // console.log(response)
                if (!response.data.error) {
                  alert(response.data.message);
                  $(".loader").removeClass("activeLoader");
                  $(".edit").removeAttr("id", "whenlodingbackBlur");
                  history.push("/");
                  dispatch(Add_for_Post(1));
                } else if (response.data.error) {
                  alert(response.data.error);
                  $(".loader").removeClass("activeLoader");
                  $(".edit").removeAttr("id", "whenlodingbackBlur");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => console.log(err));
      }
    }
  };
  const update_username = () => {
    $(".loader").addClass("activeLoader");
    $(".edit").attr("id", "whenlodingbackBlur");
    axios
      .patch(
        "/update/username",
        { username: username, id: isLogged.id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        
        setUsername("");
        if (!res.data.error) {
          $(".loader").removeClass("activeLoader");
          $(".edit").removeAttr("id", "whenlodingbackBlur");
          alert(res.data.message);
          history.push("/");
          dispatch(Add_for_Post(1));
        } else if (res.data.error) {
          alert(res.data.error);
          $(".loader").removeClass("activeLoader");
          $(".edit").removeAttr("id", "whenlodingbackBlur");
        }
      })
      .catch((err) => console.log(err));
  };
  const update_name = () => {
    $(".loader").addClass("activeLoader");
    $(".edit").attr("id", "whenlodingbackBlur");
    axios
      .patch(
        "/update/name",
        { name: name, id: isLogged.id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        // console.log(res);
        setName("");
        if (!res.data.error) {
          alert(res.data.message);
          dispatch(Add_for_Post(1));
          $(".loader").removeClass("activeLoader");
          $(".edit").removeAttr("id", "whenlodingbackBlur");
          history.push("/");
        } else if (res.data.error) {
          alert(res.data.error);
          $(".loader").removeClass("activeLoader");
          $(".edit").removeAttr("id", "whenlodingbackBlur");
        }
      })
      .catch((err) => console.log(err));
  };
  const update_email = () => {
    $(".loader").addClass("activeLoader");
    $(".edit").attr("id", "whenlodingbackBlur");
    axios
      .patch(
        "/update/email",
        { email: email, id: isLogged.id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        //console.log(res);
        setEmail("");
        if (!res.data.error) {
          alert(res.data.message);
          localStorage.removeItem("accessToken");
          history.push("/login");
        } else if (res.data.error) {
          alert(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  const update_password = () => {
    axios
      .patch(
        "/update/password",
        { oldpass: oldPass, newpass: newPass, id: isLogged.id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setNewPass("");
          setOldPass("");
          localStorage.removeItem("accessToken");
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="edit">
        <div className="edits_fields">
          <h4>Update Profile Picture</h4>
          <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
          <button onClick={uploadProfielPic}>Update Profile </button>
          <h4>Update Username</h4>
          <input
            type="text"
            placeholder="username... "
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <button onClick={update_username}>Update Username</button>
          <h4>Update name</h4>
          <input
            type="text"
            placeholder="name... "
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button onClick={update_name}>Update Name</button>
          <h4>Update email</h4>
          <input
            type="text"
            placeholder="email..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button onClick={update_email}>Update Email</button>
          <h4>Update password</h4>
          <input
            type="text"
            placeholder="old password..."
            onChange={(e) => setOldPass(e.target.value)}
            value={oldPass}
          />
          <input
            type="text"
            placeholder="new password..."
            onChange={(e) => setNewPass(e.target.value)}
            value={newPass}
          />
          <button onClick={update_password}>Update Password</button>
        </div>
      </div>
      <Loader />
    </>
  );
}

export default Edit;
