import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export default function ScorePopUp(props) {
  
  const [data, setData] = useState(null);
  const [chartSrc, setChartSrc] = useState("");
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
      .get("http://localhost:5000/profile/analyseSentiments", {
        withCredentials: true,
        params: {
          comments: commentsArray,
        },
      })
      .then((res) => {
        setData(res.data.sentimentsData);
        setChartSrc(`data:image/png;base64,${res.data.chart}`);
          console.log(data)
      });
  };
  useEffect(() => {
    fetchScore();
  }, []);
  return (
    <>
<button type="button" className="bttn" data-bs-toggle="modal" data-bs-target="#analyseComment">
  Analyse Comments
</button>

<div className="modal fade" id="analyseComment" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content" style={{ backgroundColor: "#2e2d2c" }}>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Comments Analysis</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ backgroundColor: "white" }}></button>
      </div>
      <div className="modal-body">
        <div className="container">
        <div className="col-6">
        <img src={chartSrc} alt="" style={{backgroundColor:"white"}}/>
        </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="bttn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
