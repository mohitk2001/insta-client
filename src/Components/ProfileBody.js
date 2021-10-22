import React, { useState, useEffect } from "react";
import "./ProfileBody.css";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import IconButton from "@material-ui/core/IconButton";
import { useContext } from "react";
import { AuthContext } from "./Context";
import { useHistory } from "react-router";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import axios from "./axios";
function ProfileBody() {
  const { isLogged } = useContext(AuthContext);
  const [postBlock, setpostBlock] = useState([]);
  const history=useHistory()
  useEffect(() => {
    if (isLogged.loginstatus) {
      axios
        .get(`/post/getAllposts/${isLogged.id}`)
        .then((res) => {
          console.log(res.data);
          setpostBlock(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogged.loginstatus]);
 
  return (
    <div className="ProfileBody">
      <div className="profilebodyContainer">
        <div className="profileBheader">
          <IconButton>
            <PermMediaIcon className="post_icon" />
          </IconButton>
          <h3>POSTS</h3>
        </div>
        <div className="postsBody">
          {postBlock?.map((post, index) => {
            return (
              <div key={post?._id} className="imageContainer" onClick={()=>history.push(`/specific_post/${post?._id}`)}>
                <img src={post?.imgUrl} alt="post" className="postImages" />
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="upload_section" onClick={()=>history.push("/upload")}>
        <h3>Do you want to upload new post ?</h3>
        <AddToPhotosIcon fontSize="large" className="uploadIcon" />
      </div>
    </div>
  );
}

export default ProfileBody;
