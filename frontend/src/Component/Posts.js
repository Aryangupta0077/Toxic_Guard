import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import PostsItem from "./PostsItem";
import "../assets/CSS/Posts/posts.css";
export default function Posts(props) {
  const [spinnerState, setSpinnerState] = useState(false);
  const [videoData, setVideoData] = useState({ data: null });
  const fetchData = async () => {
    setSpinnerState(true);
    await axios
      .get("http://localhost:5000/profile/videos", { withCredentials: true })
      .then((res) => {
        setVideoData({ data: res.data });
        setSpinnerState(false);
      });
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {}
  }, []);
  return (
    <div className="postsPage">
      <div className="postPageHeader">
        <h1>Welcome {props.userData.displayName}</h1>
      </div>
      {spinnerState ? (
        <Spinner />
      ) : (
        <div className="videos">
          {videoData.data &&
            videoData.data.map((ele) => {
              return (
                <div key={ele.id}>
                  <PostsItem
                    url={ele.url}
                    title={ele.title}
                    id={ele.id}
                    description={ele.description}
                    publishedAt={ele.publishedAt}
                    setId={props.setId}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
