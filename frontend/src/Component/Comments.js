import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/CSS/comments/comments.css";
import ScorePopUp from "./ScorePopUp";
import Spinner from "./Spinner";
import AnalyseComments from "./AnalyseComments"
export default function Comments(props) {
  const [commentsVal, setCommentsVal] = useState({ data: null });
  const [spinnerState, setSpinnerState] = useState(false);
  const [data, setData] = useState(null);
  const [chartSrc, setChartSrc] = useState("");

  const fetchComments = async () => {
    if (!props.videoId) return;
    setSpinnerState(true);
    const params = {
      videoId: props.videoId,
    };
    try {
      const response = await axios.get(
        "http://localhost:5000/profile/comments",
        {
          withCredentials: true,
          params: params,
        }
      );
      setCommentsVal({ data: response.data });
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setSpinnerState(false);
    }
  };
  useEffect(() => {
    console.log(props.videoOverview)
    fetchComments();
  }, []);

  return (
    <>
      <div className="commentsPage">
        {commentsVal.data && commentsVal.data.length === 0 ? (
          <div className="yourComments">
            <h1 style={{ color: "#0BDA51" }}>Comments not found</h1>
          </div>
        ) : (
          <div>
            <div className="yourComments container">
              {props.videoOverview.data?<div className="col-lg-6 col-sm-12 container videoBox">
                <div className="col-lg-6">
                  <img src={props.videoOverview.data.url} alt="Video thumbnail" className="thumbnail"/>
                </div>
                <div className="col-lg-6 data">
                  <p>title: {props.videoOverview.data.title}</p>
                  <p>Video ID: {props.videoOverview.data.id}</p>
                  <p>Description: {props.videoOverview.data.description}</p>
                </div>
              </div>:""}
            <div className=" col-lg-6 commentsTitle col-sm-12" >
              <h1 style={{color: "#0BDA51"}}>Comments on this video</h1>
              <img src={chartSrc} alt=""  style={{backgroundColor:"white"}}/>
            </div>
            </div>
            <div >
              {spinnerState ? (
                <Spinner />
              ) : (
                <div>
                  {commentsVal.data ? (
                    <>
                    <ScorePopUp commentsVal={commentsVal} />
                    <AnalyseComments commentsVal={commentsVal} />
                    </>
                  ) : (
                    ""
                  )}
                  <div className="tableData">

                  <table className="table commentsTable table-dark table-hover">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Comment text</th>
                        <th scope="col">date Published</th>
                        <th scope="col">Comment id</th>
                        <th scope="col">Author</th>
                        <th scope="col">Author's Channel link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commentsVal.data &&
                        Array.isArray(commentsVal.data) &&
                        commentsVal.data.map((ele, index) => (
                          <tr key={ele.commentId}>
                            <th scope="row" className="dotted-description">
                              {index + 1}
                            </th>
                            <td className="dotted-description">
                              {ele.commentText}
                            </td>
                            <td className="dotted-description">
                              {ele.datePublished.slice(0, 10)}
                            </td>
                            <td className="dotted-description">
                              {ele.commentId}
                            </td>
                            <td className="dotted-description">{ele.author}</td>
                            <td>
                              <a
                                href={ele.authorChannelLink}
                                className="dotted-description"
                                >
                                {ele.authorChannelLink}
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
              </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
