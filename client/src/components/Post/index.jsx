import { Link } from "react-router-dom";
import Account from "../Account";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AnimatedList from "../../../Reactbits/AnimatedList/AnimatedList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import {
  faHeart as outlinedHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import axiosInstance from "../../axiosConfig";

import { getShortInstabuzTime } from "../../utils/TimeUtils";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Post = ({
  id,
  url,
  img,
  postAuthor,
  createdAt,
  caption,
  likes,
  post,
}) => {
  const {
    currUser,
    postAllLikes = [],
    currUserImage,
    setSelectedPost,
  } = useContext(MyContext);

  const isLiked = likes?.some((like) => like.likeAuthor === currUser) ?? false;

  const items =
    likes?.map((like) => ({
      likeAuthor: like.likeAuthor,
      authorImg: like.authorImg,
    })) ?? [];

  const [open, setOpen] = useState(false);

  const handleLikeAuthor = async () => {
    const Data = {
      username: postAuthor,
      likeAuthor: currUser,
      authorImg: currUserImage,
    };

    try {
      if (!isLiked) {
        await axiosInstance.post(`/${postAuthor}/${id}/addLike`, Data);
      } else {
        await axiosInstance.post(`/${postAuthor}/${id}/removeLike`, Data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpen = () => {
    if (postAllLikes?.length > 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="post pb-2">
      <div className="accountWithCreationTime d-flex align-items-center">
        <Link to={`/profile/${"swapnilpawar96k"}`}>
          <div className="fullPost-username d-flex align-items-center">
            <Account img={img} />
            &nbsp;&nbsp;
            <b className="nameCommentMargin">{postAuthor}</b>
          </div>
        </Link>

        {getShortInstabuzTime(new Date(createdAt))}
      </div>

      <img className="post-img-home" src={url} alt="post" />
      <div className="fullPost-likes-info-container d-flex flex-column align-items-center pt-2 heightadjust ">
        <div className="fullPost-likes-info d-flex align-items-center">
          <div onClick={handleLikeAuthor}>
            {isLiked ? (
              <FontAwesomeIcon
                icon={faHeart}
                className="fullPost-like"
                style={{ color: "#ff0000" }}
              />
            ) : (
              <FontAwesomeIcon icon={outlinedHeart} className="fullPost-like" />
            )}
          </div>

          <label htmlFor="add-comment">
            <FontAwesomeIcon icon={faComment} className="fullPost-like" />
          </label>
        </div>
        <div className="likedBy w-100 pl-3">
          <button
            className="likedByBtn cursor"
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={handleClickOpen}
            tabIndex="-1"
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
                  onItemSelect={(item, index) => console.log(item, index)}
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
      </div>
      <div className="fullPost-caption d-flex align-items-center heightAuto">
        <div className="">
          <b className="nameCommentMargin">
            <Link to={`/profile/${postAuthor}`}>{postAuthor}</Link>
          </b>
          <span className="captionAll"> {caption}</span>
        </div>
      </div>
      <div className="pl-3 mt-2">
        <button
          className="btn btn-link p-0"
          style={{ color: "#000" }}
          onClick={() => setSelectedPost(post)}
        >
          <Link to={`/profile/${postAuthor}/${id}`} state={{ from: "home" }}>
            View all 43 comments
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Post;
