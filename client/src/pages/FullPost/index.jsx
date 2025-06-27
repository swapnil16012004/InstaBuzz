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
import { Link, useLocation, useNavigate } from "react-router-dom";
import Account from "../../components/Account";
import axiosInstance from "../../axiosConfig";
import { Alert } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import defaultProfileImg from "../../assets/profile1.jpg";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AnimatedList from "../../../Reactbits/AnimatedList/AnimatedList";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const FullPost = () => {
  const [loading, setLoading] = useState(true);
  const {
    currUser,
    setShowNavbar,
    selectedPost,
    flashMessage,
    postAllComments,
    setPostAllComments,
    postAllLikes = [],
    setPostAllLikes,
    setFlashMessage,
    currUserImage,
    setDisplayLogo,
  } = useContext(MyContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    const from = location.state?.from;
    if (from === "home") {
      navigate("/");
    } else if (from === "profile") {
      navigate(`/profile/${selectedPost.author.username}`);
    } else {
      navigate(-1);
    }
  };

  const isLiked =
    postAllLikes?.some((like) => like.likeAuthor === currUser) ?? false;

  const items =
    postAllLikes?.map((like) => ({
      likeAuthor: like.likeAuthor,
      authorImg: like.authorImg,
    })) ?? [];

  const [open, setOpen] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      username: selectedPost.author.username,
      authorImg: currUserImage,
      commentAuthor: currUser,
      comment: form.comment.value,
    };

    try {
      const response = await axiosInstance.post(
        `/${selectedPost.author.username}/${selectedPost._id}/addComment`,
        formData
      );
      const data = response.data;
      setPostAllComments(data.comments);
      setFlashMessage(data.message);
      form.comment.value = "";
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeAuthor = async (e) => {
    const Data = {
      username: selectedPost.author.username,
      likeAuthor: currUser,
      authorImg: currUserImage,
    };

    try {
      if (!isLiked) {
        const response = await axiosInstance.post(
          `/${selectedPost.author.username}/${selectedPost._id}/addLike`,
          Data
        );
        console.log(response.data);
        setPostAllLikes(response.data.likes);
      } else {
        const response = await axiosInstance.post(
          `/${selectedPost.author.username}/${selectedPost._id}/removeLike`,
          Data
        );
        console.log("unliked");
        setPostAllLikes(response.data.likes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axiosInstance.get(
        `/${selectedPost.author.username}/${selectedPost._id}/getposts`
      );
      const data = response.data;
      console.log("Post data:", data);
      setPostAllComments(data.Comments);
      setPostAllLikes(data.likes);
      setLoading(false);
    };
    fetchPost();
  }, [setPostAllComments, setPostAllLikes]);

  const handleClickOpen = () => {
    console.log("Likes when opening the dialog:", items);
    if (postAllLikes && postAllLikes.length > 0) {
      setOpen(true);
    } else {
      setFlashMessage("No likes found.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (flashMessage) {
      setTimeout(() => {
        setFlashMessage(null);
      }, 4000);
    }
  }, [flashMessage, setFlashMessage]);

  useEffect(() => {
    setShowNavbar(false);
    setDisplayLogo(false);
  }, [setShowNavbar, postAllComments, postAllLikes, isLiked]);

  if (!selectedPost) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="full-post-section d-flex flex-column justify-content-center align-items-center">
        <div className="flex-container d-flex justify-content-center">
          {flashMessage && (
            <Alert
              severity="success"
              style={{ width: "1050px", fontSize: "medium" }}
            >
              {flashMessage}
            </Alert>
          )}
        </div>
        <button className="btn btn-link p-0" onClick={handleGoBack}>
          <IoClose className="closeicon" />
        </button>
        <div className="full-post-container d-flex">
          <div className="fullPost-img-container">
            <img
              src={selectedPost.imageUrl}
              alt="Post"
              className="fullPost-img"
            />
          </div>
          <div className="fullPost-info-container d-flex flex-column">
            <Link to={`/profile/${selectedPost.author.username}`}>
              <div className="fullPost-username d-flex align-items-center">
                <Account
                  img={selectedPost.author.profileImg || defaultProfileImg}
                />
                &nbsp;&nbsp;
                <b className="nameCommentMargin">
                  {selectedPost.author.username}
                </b>
              </div>
            </Link>
            <div
              className="mt-1 mb-1"
              style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
            ></div>
            <div className="fullPost-info d-flex flex-column">
              <div className="fullPost-caption d-flex align-items-center">
                <Link to={`/profile/${selectedPost.author.username}`}>
                  <div className="d-flex align-items-center">
                    <Account
                      img={selectedPost.author.profileImg || defaultProfileImg}
                    />
                    &nbsp;&nbsp;
                    <b className="nameCommentMargin">
                      {selectedPost.author.username}
                    </b>
                  </div>
                </Link>
                {selectedPost.caption}&nbsp;
                {formatDistanceToNow(new Date(selectedPost.createdAt), {
                  addSuffix: true,
                })}
              </div>
              <div className="fullPost-comment-container">
                {postAllComments &&
                  postAllComments.map((singleComment, index) => (
                    <div
                      key={index}
                      className="fullPost-comment d-flex align-items-center"
                    >
                      <Link to={`/profile/${singleComment.commentAuthor}`}>
                        <div className="d-flex align-items-center">
                          <Account
                            img={singleComment.authorImg || defaultProfileImg}
                          />
                          &nbsp;&nbsp;
                          <b className="nameCommentMargin">
                            {singleComment.commentAuthor}
                          </b>
                        </div>
                      </Link>
                      {singleComment.comment}&nbsp;
                      {formatDistanceToNow(new Date(singleComment.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  ))}
              </div>
              <div
                className="mt-1 mb-1"
                style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
              ></div>
              <div className="fullPost-likes-info-container d-flex flex-column align-items-center ">
                <div className="fullPost-likes-info d-flex align-items-center">
                  <div onClick={handleLikeAuthor}>
                    {isLiked ? (
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="fullPost-like"
                        style={{ color: "#ff0000" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={outlinedHeart}
                        className="fullPost-like"
                      />
                    )}
                  </div>

                  <label htmlFor="add-comment">
                    <FontAwesomeIcon
                      icon={faComment}
                      className="fullPost-like"
                    />
                  </label>
                </div>
                <div className="likedBy w-100 pl-3">
                  <button
                    className="likedByBtn cursor"
                    style={{ border: "none", backgroundColor: "transparent" }}
                    onClick={handleClickOpen}
                    tabIndex={"-1"}
                  >
                    <b>Liked By</b>
                  </button>
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                      className="text-center"
                    >
                      Likes
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={(theme) => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                      })}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                      {postAllLikes.length > 0 ? (
                        <AnimatedList
                          items={items}
                          onItemSelect={(item, index) =>
                            console.log(item, index)
                          }
                          showGradients={false}
                          enableArrowNavigation={true}
                          displayScrollbar={false}
                        />
                      ) : (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                          No likes available
                        </div>
                      )}
                    </DialogContent>
                  </BootstrapDialog>
                </div>
                <div className="fullPost-createdAt d-flex align-items-center">
                  {format(
                    new Date(selectedPost.createdAt),
                    "dd MMM yyyy, hh:mm a"
                  )}
                </div>
              </div>
              <div
                className="mt-1 mb-1"
                style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
              ></div>
              <div className="fullPost-add-comment d-flex justify-content-center align-items-center gap-3">
                <form
                  onSubmit={handleCommentSubmit}
                  className="w-100 d-flex justify-content-center align-items-center gap-3"
                >
                  <input
                    id="addComment"
                    type="text"
                    name="comment"
                    placeholder="Add a comment..."
                    className="fullPost-comment-input"
                  />
                  <button id="addCommentBtn" className="btn btn-primary">
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPost;
