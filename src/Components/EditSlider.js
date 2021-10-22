import React from 'react'
import "./EditSlider.css"
import Allcomments from './Allcomments'
import $ from "jquery"
import { useHistory } from 'react-router'
import axios from "./axios"
import { useDispatch } from 'react-redux'
import {Add_for_Post} from "../Redux/Action/index"
function EditSlider({id}) {
    const history=useHistory()
    const dispatch=useDispatch();
    const cancelHandle=()=>{
       $(".allcomments").removeAttr("id");
       $(".editSlider").toggleClass("active")
    }
    const handleDelete=()=>{
        axios.delete(`/post/deletePost/${id}`).then((res)=>{
            if(res.data.success){
                dispatch(Add_for_Post(1))
                history.push("/");
            }
            else{
                alert(res.data.e);
            }
        })
        .catch(e=>console.log(e))
    }
    return (
        <div className="editSlider">
           <p className="editDelete" onClick={handleDelete}>Delete post</p>
           <p onClick={cancelHandle}>Go to post</p>
           <p onClick={cancelHandle}>Cancel</p>
        </div>
    )
}

export default EditSlider
