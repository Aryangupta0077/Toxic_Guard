import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../assets/CSS/AnalyseComments.js/analyseComments.css";
import Alert from "./Alert";
export default function ScorePopUp(props) {
  const [sentimentData, setData] = useState({ data: null });
  const [chartSrc, setChartSrc] = useState("");
  const [mostPositive, setMostPositive] = useState({ data: null });
  const [mostNegative, setMostNegative] = useState({ data: null });
  const [neutral, setNeutral] = useState({ data: null });
  const [alertVal, setAlert]=useState(null)

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
        showAlert("Oops an error occured...", "danger");
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

  const getHighest = () => {
    const data = sentimentData.data;
    let mostPos = {};
    let mostNeg = {};
    let neu = {};
    let negScore = 0;
    let posScore = 0;
    let neuScore = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].sentiment === "NEGATIVE") {
        if (data[i].sentimentScore.Negative > negScore) {
          negScore = data[i].sentimentScore.Negative;
          mostNeg = {
            comment: data[i].comment,
            author: data[i].author,
            id: data[i].id,
          };
        }
      } else if (data[i].sentiment === "POSITIVE") {
        if (data[i].sentimentScore.Positive > posScore) {
          posScore = data[i].sentimentScore.Positive;
          mostPos = {
            comment: data[i].comment,
            author: data[i].author,
            id: data[i].id,
          };
        }
      }else if (data[i].sentiment === "NEUTRAL") {
        if (data[i].sentimentScore.Neutral > neuScore) {
          posScore = data[i].sentimentScore.Neutral;
          neu = {
            comment: data[i].comment,
            author: data[i].author,
            id: data[i].id,
          };
        }
      }
    }
    setMostPositive({ data: mostPos });
    setMostNegative({ data: mostNeg });
    setNeutral({data:neu})
  };
  const fetchScore = async () => {
    const commentsArray = getComments();
    await axios
      .get("http://localhost:5000/profile/analyseSentiments", {
        withCredentials: true,
        params: {
          comments: commentsArray,
        },
      })
      .then((res) => {
        setData({ data: res.data.sentimentsData });
        setChartSrc(`data:image/png;base64,${res.data.chart}`);
      });
  };
  useEffect(() => {
    fetchScore();
  }, []);
  useEffect(() => {
    if (sentimentData.data) {
      getHighest();
    }
  }, [sentimentData]);
  return (
    <>
      <button
        type="button"
        className="bttn"
        data-bs-toggle="modal"
        data-bs-target="#analyseComment"
      >
        Analyse Comments
      </button>

      <div
        className="modal fade"
        id="analyseComment"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{ backgroundColor: "#2e2d2c" }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Comments Analysis
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
              {mostPositive.data ? (
                <div className="container analyticSection">
                  <div className="col-6">
                    <img
                      src={chartSrc}
                      alt=""
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                  <div className="col-6 table-responsive">
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th scope="col" style={{color:"#17ffee"}}>Sentiment</th>
                          <th scope="col" style={{color:"#17ffee"}}>Comments</th>
                          <th scope="col" style={{color:"#17ffee"}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {mostNegative.data.comment?<tr>
                          <td style={{color:"red"}}>Most Negative</td>
                          <td style={{color:"red"}}>{mostNegative.data.comment}</td>
                          <td>
                              <button className="bttn dropdown-toggle" data-bs-toggle="dropdown" style={{margin:"0px", padding:"5px"}}>Take action</button>
                              <ul className="dropdown-menu dropdown-menu-dark">
                                <li className="dropdown-item" onClick={()=>{handleDelete(mostNegative.data.id)}}>Delete comment</li>
                                <li className="dropdown-item" onClick={()=>{handleReport(mostNegative.data.id)}}>Report User</li>
                              </ul>
                            </td>
                        </tr>:""}
                        {mostPositive.data.comment?<tr>
                          <td style={{color:"#0BDA51"}}>Most Positive</td>
                          <td style={{color:"#0BDA51"}}>{mostPositive.data.comment}</td>
                          <td>
                              <button className="bttn dropdown-toggle" data-bs-toggle="dropdown" style={{margin:"0px", padding:"5px"}}>Take action</button>
                              <ul className="dropdown-menu dropdown-menu-dark">
                                <li className="dropdown-item" onClick={()=>{handleDelete(mostPositive.data.id)}}>Delete comment</li>
                                <li className="dropdown-item" onClick={()=>{handleReport(mostPositive.data.id)}}>Report User</li>
                              </ul>
                            </td>
                        </tr>:""}
                        {neutral.data.comment?<tr>
                          <td style={{color:"yellow"}}>Neutral</td>
                          <td style={{color:"yellow"}}>{neutral.data.comment}</td>
                          <td>
                              <button className="bttn dropdown-toggle" data-bs-toggle="dropdown" style={{margin:"0px", padding:"5px"}}>Take action</button>
                              <ul className="dropdown-menu dropdown-menu-dark">
                                <li className="dropdown-item" onClick={()=>{handleDelete(neutral.data.id)}}>Delete comment</li>
                                <li className="dropdown-item" onClick={()=>{handleReport(neutral.data.id)}}>Report User</li>
                              </ul>
                            </td>
                        </tr>:""}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="bttn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
