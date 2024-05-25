import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import Alert from "./Alert";
export default function ScorePopUp(props) {
  const [commentScore, setCommentScore] = useState({ data: null });
  const [alertVal, setAlert]=useState(null)
  const [spinnerState, setSpinnerState] = useState(false);
  const handleDelete = async (id) => {
    await axios
      .get("http://localhost:5000/profile/actions/delete", {
        withCredentials: true,
        params: {
          commentId: id,
        },
      })
      .then((res) => {
        console.log(res);
        showAlert("Comment deleted, please refresh the page", "success");
      })
      .catch((error) => {
        showAlert("Oops an error occured", "danger");
        console.log(error);
      });
  };
  const showAlert = (msg,type)=>{
    setAlert({
      message: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }
  const handleReport = async (id) => {
    await axios
      .get("http://localhost:5000/profile/actions/report", {
        withCredentials: true,
        params: {
          commentId: id,
        },
      })
      .then((res) => {
        console.log(res);
        showAlert("User Reported", "success");
      })
      .catch((error) => {
        showAlert("Oops an error occured", "danger");
        console.log(error);
      });
  };
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
              <div style={{display:"flex",justifyContent:"center",}}>
              <Alert alertVal={alertVal}/>
              </div>
              {spinnerState ? (
                <Spinner />
              ) : commentScore.data && commentScore.data.length === 0 ? (
                <h3>Can't fetch score, please try again later</h3>
              ) : (
                <div className="table-responsive">

                <table className="table table-dark table-hover ">
                  <thead>
                    <tr>
                      <th style={{ color: "#17ffee" }}>Comment</th>
                      <th style={{ color: "#17ffee" }}>T. Score</th>
                      <th style={{ color: "#17ffee" }}>Rating</th>
                      <th style={{ color: "#17ffee" }}>Author</th>
                      <th style={{ color: "#17ffee" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commentScore.data &&
                      commentScore.data.map((ele) => {
                        return (
                          <tr key={ele.commentId}>
                            <td
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
                            </td>
                            <td
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
                            </td>
                            <td scope="row" className="dotted-descrpition">
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
                            </td>
                            <td
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
                            </td>
                            <td>
                              <button
                                className="bttn dropdown-toggle"
                                data-bs-toggle="dropdown"
                                style={{ margin: "0px", padding: "5px" }}
                                >
                                Take action
                              </button>
                              <ul className="dropdown-menu dropdown-menu-dark">
                                <li
                                  className="dropdown-item"
                                  onClick={()=>{handleDelete(ele.commentId)}}
                                >
                                  Delete comment
                                </li>
                                <li
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleReport(ele.commentId);
                                  }}
                                >
                                  Report Comment
                                </li>
                              </ul>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="bttn" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
