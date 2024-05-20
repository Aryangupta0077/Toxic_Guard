import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
export default function ScorePopUp(props) {
  const [commentScore, setCommentScore] = useState({ data: null });
  const [spinnerState, setSpinnerState] = useState(false);
  const getComments = () => {
    const commentsArray = props.commentsVal.data.map((comments) => {
      return {
        comments: comments.commentText,
        commentId: comments.commentId,
        author: comments.author,
      };
    });
    return commentsArray;
  };
  const fetchScore = async () => {
    const commentsArray = getComments();
    await axios
      .get("http://localhost:5000/profile/score", {
        withCredentials: true,
        params: {
          comments: commentsArray,
        },
      })
      .then((res) => {
        setCommentScore({ data: res.data });
      });
  };
  useEffect(() => {
    setSpinnerState(true);
    fetchScore();
    setSpinnerState(false);
  }, []);
  return (
    <>
      <button
        type="button"
        className="bttn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        title="Check toxicity score"
      >
        Toxicity
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{ backgroundColor: "#2e2d2c" }}>
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "#009ffd" }}
              >
                Comments Report
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ backgroundColor: "white" }}
              ></button>
            </div>
            <div className="modal-body">
              {spinnerState ? (
                <Spinner />
              ) : commentScore.data&&commentScore.data.length===0?(<h3>Can't fetch score, please try again later</h3>):(
                <table className="table table-dark table-hover ">
                  <thead>
                    <tr>
                      <th style={{ color: "#17ffee" }}>Comment</th>
                      <th style={{ color: "#17ffee" }}>T. Score</th>
                      <th style={{ color: "#17ffee" }}>Rating</th>
                      <th style={{ color: "#17ffee" }}>author</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commentScore.data &&
                      commentScore.data.map((ele) => {
                        return (
                          <tr key={ele.commentId}>
                            <th
                              scope="row"
                              className="dotted-descrpition"
                              style={{
                                color:
                                  ele.score > 0.6
                                    ? "red"
                                    : ele.score > 0.4
                                    ? "yellow"
                                    : ele.score < 0.4
                                    ? "#0BDA51"
                                    : "inherit",
                              }}
                            >
                              {ele.comment}
                            </th>
                            <th
                              scope="row"
                              className="dotted-descrpition"
                              style={{
                                color:
                                  ele.score > 0.6
                                    ? "red"
                                    : ele.score > 0.4
                                    ? "yellow"
                                    : ele.score < 0.4
                                    ? "#0BDA51"
                                    : "inherit",
                              }}
                            >
                              {`${String(ele.score * 100).slice(0, 4)}%`}
                            </th>
                            <th scope="row" className="dotted-descrpition">
                              <h6>
                                <span
                                  className="badge text-bg-secondary"
                                  style={{
                                    color:
                                      ele.score > 0.6
                                        ? "red"
                                        : ele.score > 0.4
                                        ? "yellow"
                                        : ele.score < 0.4
                                        ? "#0BDA51"
                                        : "inherit",
                                  }}
                                >
                                  {ele.score > 0.6
                                    ? "Highly offensive"
                                    : ele.score > 0.4
                                    ? "moderate"
                                    : "inoffensive"}
                                </span>
                              </h6>
                            </th>
                            <th
                              scope="row"
                              className="dotted-descrpition"
                              style={{
                                color:
                                  ele.score > 0.6
                                    ? "red"
                                    : ele.score > 0.4
                                    ? "yellow"
                                    : ele.score < 0.4
                                    ? "#0BDA51"
                                    : "inherit",
                              }}
                            >
                              {ele.author}
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="bttn" data-bs-dismiss="modal">
                Close
              </button>
              {/* <button type="button" className="bttn">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
