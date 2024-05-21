import "../assets/CSS/postsItem/postItem.css";
import { useNavigate } from "react-router-dom";
export default function PostsItem(props) {
  const navigate = useNavigate()
  const getComments = async () => {
    props.setVideoOverview({data:{
      url:props.url,
      title:props.title,
      id:props.id,
      description:props.description,
      publishedAt:props.publishedAt
    }})
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
        />
        <div className="card-body">
          <p className="dotted-description">id: {props.id}</p>
          <p className="dotted-description">title: {props.title}</p>
          <p className="dotted-description">Description: {props.description}</p>
          <p className="dotted-description">Posted on: {props.publishedAt.slice(0, 10)}</p>
          <button className="bttn" onClick={getComments}>
            comments
          </button>
        </div>
      </div>
    </>
  );
}
