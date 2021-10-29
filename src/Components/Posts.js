import React, { useState, useEffect } from "react";
import "./Posts.css";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import axios from "./axios.js";
import { AuthContext } from "./Context.js";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery"
import IconButton from "@material-ui/core/IconButton";
function Posts({ imgUrl, username, caption, comments, id, avatar_url }) {
  const [count, setCount] = useState(0);
  const history = useHistory();
  const [comment, setcomment] = useState("");
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {}, [count]);
  const handleLike=(id)=>{
   
    $(id).toggleClass("likeStyle");
  }
  const postCommt = () => {
    const obj = {
      text: comment,
      post_id: id,
      userWhocomment_name: isLogged.name,
      userWhocomment_id: isLogged.id,
    };
    if (localStorage.getItem("accessToken")) {
      axios
        .patch(`/post/commentOnPost/${id}`, obj, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          //console.log(res);
          setCount((count) => {
            return count + 1;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!localStorage.getItem("accessToken")) {
      alert("You need a valid account to comment on  someone posts !! SORRY");
    }
    setcomment("");
  };
  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt={username} src={avatar_url} />
        <h3 className="post_header_usernamee">{username}</h3>
      </div>

      <img
        src={imgUrl}
        alt="image"
        className="specific_post"
        onClick={() => history.push(`/specific_post/${id}`)}
      />

      <div className="post_bottom_section">
        <div className="post_react">
          <IconButton  onClick={()=>handleLike(id)}>
            <FavoriteBorderIcon className={id}/>
          </IconButton>
          <IconButton onClick={() => history.push(`/specific_post/${id}`)}>
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
        </div>
        {caption !== "" && (
          <p>
            <strong>{username}: </strong>
            <span>{caption}</span>
          </p>
        )}
        <div className="post_comments">
          {comments?.map((commnt, index) => {
            if (index < 3)
              return (
                <p key={commnt?._id}>
                  <strong> {commnt?.userWhocomment_name}</strong> :{" "}
                  {commnt?.text}
                </p>
              );
          })}
          {comments?.length > 3 ? (
            <i
              className="viewOthercommnt"
              onClick={() => history.push(`/specific_post/${id}`)}
            >
              View other comments
            </i>
          ) : (
            ""
          )}
        </div>
        <div className="post_commentBox">
          <input
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => setcomment(e.target.value)}
            value={comment}
          />
          <button onClick={postCommt}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default Posts;
