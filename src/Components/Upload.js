import React,{useState,useEffect} from "react";
import Axios from "axios";
import axios from "./axios";
import { AuthContext } from "./Context.js";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery"
import {Add_for_Post} from "../Redux/Action/index"
import { useDispatch } from "react-redux";
import "./Upload.css"
function Upload() {
    const [progressBar, setProgressBar] = useState(0);
    const { isLogged } = useContext(AuthContext);
    const [user_details, setUser_details] = useState({});
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const history=new useHistory()
    const dispatch=new useDispatch()
    useEffect(() => {
      axios
        .get("/user/getDetailsbyId", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          if (!res.data.error) setUser_details(res.data);
          else if(res.data.error){
            console.log(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
   
    const handleChange = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };
       const handlePost = () => {
        
        const file=$("#files")[0];
        if(file.files.length===0){
          alert("Please select the files/picture")
        }
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
                    //console.log(response)
                    dispatch(Add_for_Post(1))
                    setImage("");
                    setCaption("");
                    history.push("/")
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
    <div className="profile_post_upload">
      <h2>Want to upload post 👇</h2>
      <input
        type="text"
        placeholder="Enter caption"
        className="post_caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} id="files"/>
      <progress
        value={progressBar}
        max="100"
        className="image_upload_progress"
      ></progress>
      <button onClick={handlePost}>Upload</button>
    </div>
  );
}

export default Upload;
