import React, { useState, useEffect } from "react";
import { AuthContext } from "./Context.js";
import { useContext } from "react";
import "./Profile.css";
import axios from "./axios";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { useHistory} from "react-router-dom";
function Profile() {
  const { isLogged, setIslogged } = useContext(AuthContext);
  const [user_details, setUser_details] = useState({});
  const [caption, setCaption] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const [image, setImage] = useState(null);
  console.log(isLogged);
  const history=useHistory();
  useEffect(() => {
    axios
      .get("/user/getDetailsbyId", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        if (!res.data.error) setUser_details(res.data);
        else if(res.data.error){
          console.log(res.data.error)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(user_details);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handlePost = () => {
    if(isLogged.loginstatus){
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instagram-mern");
        data.append("cloud_name", "mohit001");
        Axios.post("https://api.cloudinary.com/v1_1/mohit001/image/upload", data)
          .then((res) => {
            const obj_data = {
              username: user_details.username,
              imagelink: res.data.secure_url,
              caption: caption,
              person_id_who_post:isLogged.id
            };
            axios
              .post(
                "/post/imagePost",
                { obj_data },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
              )
              .then((response) => {
                console.log(response);
                setImage(null);
                setCaption("");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    else{
      alert("You need to log in")
    }
  };
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
      </div>
      <button className="profile_edit" onClick={()=>history.push("/edit")}>Edit Your Profile</button>
      <div className="profile_post_upload">
        <h4>Want to upload post 👇</h4>
        <input
          type="text"
          placeholder="Enter caption"
          className="post_caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="file" onChange={handleChange} />
        <progress
          value={progressBar}
          max="100"
          className="image_upload_progress"
        ></progress>
        <button onClick={handlePost}>Upload</button>
      </div>
    </div>
  );
}

export default Profile;
