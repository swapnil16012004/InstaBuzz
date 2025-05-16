import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import {
  faHeart as outlinedHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Account from "../../components/Account";

const FullPost = () => {
  const { currUser, setShowNavbar, posts, selectedPost, selectedImage } =
    useContext(MyContext);
  console.log(selectedPost);
  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]);

  if (!selectedPost) {
    return <div>Loading...</div>;
  }
  return (
    <div className="full-post-section d-flex flex-column justify-content-center align-items-center">
      <Link to={`/profile/${selectedPost.author.username}`}>
        <IoClose className="closeicon" />
      </Link>
      <div className="full-post-container d-flex">
        <div className="fullPost-img-container">
          <img
            src={selectedPost.imageUrl}
            alt="Post"
            className="fullPost-img"
          />
        </div>
        <div className="fullPost-info-container d-flex flex-column">
          <div className="fullPost-username d-flex align-items-center">
            <Account img={selectedPost.author.profileImg} />
            <b className="nameCommentMargin">{selectedPost.author.username}</b>
          </div>
          <hr />
          <div className="fullPost-info d-flex flex-column">
            <div className="fullPost-caption d-flex align-items-center">
              <Account img={selectedPost.author.profileImg} />
              <b className="nameCommentMargin">
                {selectedPost.author.username}
              </b>
              {selectedPost.caption}
            </div>
            <div className="fullPost-comment-container">
              <div className="fullPost-comment">good pic</div>
              <div className="fullPost-comment">good pic</div>
              <div className="fullPost-comment">good pic</div>
              <div className="fullPost-comment">good pic</div>
              <div className="fullPost-comment">good pic</div>
            </div>
            <hr />
            <div className="fullPost-likes-info-container d-flex flex-column align-items-center ">
              <div className="fullPost-likes-info d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fullPost-like"
                  style={{ color: "#ff0000" }}
                />
                <FontAwesomeIcon
                  icon={outlinedHeart}
                  className="fullPost-like"
                />
                <label htmlFor="add-comment">
                  <FontAwesomeIcon icon={faComment} className="fullPost-like" />
                </label>
              </div>
              <div className="fullPost-createdAt d-flex align-items-center">
                {format(
                  new Date(selectedPost.createdAt),
                  "dd MMM yyyy, hh:mm a"
                )}
              </div>
            </div>
            <hr />
            <div className="fullPost-add-comment d-flex justify-content-center align-items-center mb-3 gap-3">
              <input
                id="add-comment"
                type="text"
                placeholder="Add a comment..."
                className="fullPost-comment-input"
              />
              <button className="btn btn-primary">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
