import React, { useState, useEffect, useRef } from "react";
import "./Allcomments.css";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import axios from "./axios";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import IconButton from "@material-ui/core/IconButton";
import { AuthContext } from "./Context.js";
import { useContext } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import EditSlider from "./EditSlider";
import $ from "jquery";
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
function Allcomments() {
  const { id } = useParams();
  const [post_details, setpost_Details] = useState({});
  const [comment, setcomment] = useState("");
  const { isLogged } = useContext(AuthContext);
  const [countComment, setcountComment] = useState("");
  const similar = useSelector((state) => state.redux_data);

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  useEffect(() => {
    axios
      .get(`/post/postById/${id}`)
      .then((res) => {
        if (!res.data.error) {
          setpost_Details(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [countComment]);
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
          setcountComment((countComment) => countComment + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!localStorage.getItem("accessToken")) {
      alert("You need a valid account to comment on  someone posts !! SORRY");
    }
    setcomment("");
  };
  const handleEdit = () => {
   
    $(".allcomments").attr("id","backBlur");
    $(".editSlider").toggleClass("active")
  };
  return (
    <div>
      <div className="allcomments">
      <div className="users_details">
        <div className="users_details_top">
          <Avatar
            className="post_avatar"
            alt={post_details?.username}
            src={post_details?.avatar_post}
          />
          <h2>{post_details?.username}</h2>
        </div>
        {post_details?.caption && <span>{post_details?.caption}</span>}
      </div>
      <div className="allcomments_image">
        <img src={post_details?.imgUrl} alt="image" className="post_image" />
      </div>
      <center>
        <div className="allcomments_react">
          <IconButton>
            <FavoriteBorderIcon fontSize="large" className="onSmallsc"/>
          </IconButton>

          <IconButton onClick={executeScroll}>
            <ChatBubbleOutlineRoundedIcon fontSize="large"  className="onSmallsc"/>
          </IconButton>
          {similar?._id === post_details?.person_id_who_post && (
            <IconButton onClick={handleEdit}>
              <EditIcon className="onSmallsc" />
            </IconButton>
          )}
        </div>
      </center>
      <div className="comments_bottom">
        <i>All the comments..... 👇</i>
        {post_details?.comments?.map((comment, index) => {
          return (
            <div key={comment._id}>
              <p>
                <strong> {comment.userWhocomment_name}</strong> ~ {comment.text}
              </p>
            </div>
          );
        })}
      </div>
      <div className="comment_input" ref={myRef}>
        <input
          type="text"
          placeholder="Add your comment"
          onChange={(e) => setcomment(e.target.value)}
          value={comment}
        />
        <button onClick={postCommt}>Post</button>
      </div>
      
    </div>
    <EditSlider id={id}/>
    </div>
  );
}

export default Allcomments;
