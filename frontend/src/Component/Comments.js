import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/CSS/comments/comments.css";
import Spinner from "./Spinner";
export default function Comments(props) {
  const [commentsVal, setCommentsVal] = useState({ data: null });
  const [spinnerState,setSpinnerState]=useState(false)
  let i = 0;
  const fetchComments = async () => {
    setSpinnerState(true)
    const params = {
      videoId: props.videoId,
    };
    await axios
      .get("http://localhost:5000/profile/comments", {
        withCredentials: true,
        params: params,
      })
      .then((res) => {
        setCommentsVal({ data: res.data });
        setSpinnerState(false)
      });
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <>
      <div className="commentsPage">
        <div className="yourComments">
          <h1>Comments on this video</h1>
        </div>
        <div className="tableData">

        {spinnerState?<Spinner/>:<table className="table commentsTable table-striped-columns">
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
          {commentsVal.data &&
            commentsVal.data.map((ele) => {
              i = i + 1;
              return (
                <tbody>
                  <tr>
                    <th scope="row">{i}</th>
                    <th>{ele.commentText}</th>
                    <th>{ele.datePublished.slice(0,10)}</th>
                    <th>{ele.commentId}</th>
                    <th>{ele.author}</th>
                    <th><a href={ele.authorChannelLink}>{ele.authorChannelLink}</a></th>
                    <td></td>
                  </tr>
                </tbody>
              );
            })}
        </table>}
            </div>
      </div>
    </>
  );
}
