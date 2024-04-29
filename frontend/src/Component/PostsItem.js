import "../assets/CSS/postsItem/postItem.css";
import { useNavigate } from "react-router-dom";
export default function PostsItem(props) {
  const navigate = useNavigate()
  const getComments = async () => {
    props.setId(props.id)
    navigate('/comments')
  };
  return (
    <>
      <div className="card post">
        <img
          src={props.url}
          className="card-img-top"
          alt="thumbnail"
          style={{ width: "24.99vw", height: "20vh" }}
        />
        <div className="card-body">
          <p>id:{props.id}</p>
          <p>title: {props.title}</p>
          <p>Description: {props.description}</p>
          <p>Posted on: {props.publishedAt.slice(0, 10)}</p>
          <button className="bttn" onClick={getComments}>
            comments
          </button>
        </div>
      </div>
    </>
  );
}
