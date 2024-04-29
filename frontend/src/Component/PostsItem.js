import React, { useState } from "react";
import "../assets/CSS/postsItem/postItem.css";
import axios from "axios";
export default function PostsItem(props) {
  const [comments, setCommentsVal] = useState();
  const getComments = async () => {
    const params={
      videoId:props.id
    }
    await axios.get("http://localhost:5000/profile/comments",{withCredentials:true,params:params}).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <div className="card post">
        <img
          src={props.url}
          className="card-img-top"
          alt="Post Photo"
          style={{ width: "24.99vw", height: "20vh" }}
        />
        <div className="card-body">
          <p>id:{props.id}</p>
          <p>title: {props.title}</p>
          <p>Description: {props.description}</p>
          <p>Posted on: {props.publishedAt.slice(0, 10)}</p>
          <button className="bttn" onClick={getComments}>
            Comments
          </button>
        </div>
      </div>
    </>
  );
}
