import React from "react";
import { useContext, useEffect, useRef } from "react";
import { MyContext } from "../../App";
import profileImg from "../../assets/profile1.jpg";
import axiosInstance from "../../axiosConfig";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { data, useNavigate } from "react-router-dom";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";

const Profile = () => {
  const {
    currUser,
    showNavbar,
    setShowNavbar,
    gender,
    userFullName,
    bio,
    selectedImage,
    setSelectedImage,
    setFlashMessage,
    posts,
    setPosts,
    flashMessage,
    setSelectedPost,
    setGender,
    setUserFullName,
    setBio,
    selectedUser,
    setSelectedUser,
  } = useContext(MyContext);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { username } = useParams();
  console.log(username);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImg", file);

      try {
        const response = await axiosInstance.put(
          `/${selectedUser}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image upload response:", response.data);

        setSelectedImage(response.data.user.profileImg);
        setFlashMessage(response.data.message);
        navigate("/");
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/${username}/getuser`);
        const data = response.data.user;
        setPosts(data.posts);
        setGender(data.gender);
        setUserFullName(data.name);
        setBio(data.bio);
        setSelectedImage(data.profileImg);
        setSelectedUser(data.username);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserInfo();
  }, [
    setPosts,
    setGender,
    setUserFullName,
    setBio,
    setSelectedImage,
    setSelectedUser,
  ]);

  useEffect(() => {
    setShowNavbar(true);
  }, [showNavbar, selectedImage]);

  useEffect(() => {
    if (flashMessage) {
      setTimeout(() => {
        setFlashMessage(null);
      }, 4000);
    }
  }, [flashMessage]);

  useEffect(() => {
    if (currUser === null) {
      navigate("/login");
    }
  }, [currUser]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex-container d-flex justify-content-center mt-3 mb-3">
        {flashMessage && (
          <Alert
            severity="success"
            style={{ width: "1050px", fontSize: "medium" }}
          >
            {flashMessage}
          </Alert>
        )}
      </div>
      <div className="profile-container d-flex flex-column align-items-center pb-5 mb-5 mt-5">
        <div className="profile-section d-flex justify-content-center align-items-center">
          <div className="img-container cursor" onClick={handleImageClick}>
            <img
              src={selectedImage || profileImg}
              alt="Profile"
              className="profile-img"
            />
            <input
              type="file"
              name="profileImg"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="profile-info ">
            <div className="edit-profile d-flex align-items-center">
              <h2>{selectedUser}</h2>
              {currUser === selectedUser && (
                <Link to={`/${selectedUser}/edit`}>
                  <button className="edit-profile-btn btn btn-primary">
                    Edit Profile
                  </button>
                </Link>
              )}
            </div>
            <div className="post-count">
              <p>
                <b>{posts.length}</b> Posts
              </p>
            </div>
            <div className="username">
              <div className="d-flex align-items-center gap-1">
                <b>{userFullName}</b>
                {gender === "male" ? (
                  <IoMdMale className="gender" />
                ) : (
                  <IoMdFemale className="gender" />
                )}
              </div>
            </div>
            <div className="bio">
              <p>
                {bio ||
                  "Add a bio to your profile. This is a great place to tell people about yourself."}
              </p>
            </div>
          </div>
        </div>
        <hr className="hr" />
        <div className="posts-section d-flex flex-column align-items-center">
          <div className="posts-title mb-2 d-flex align-items-center justify-content-center gap-2">
            <BsFillGrid3X3GapFill /> POSTS
            {currUser === selectedUser && (
              <Link to={`/${selectedUser}/create`}>
                <button className="btn btn-primary"> Create</button>
              </Link>
            )}
          </div>
          <div className="posts-container d-flex flex-wrap">
            {posts.map((post) => (
              <button
                onClick={() => setSelectedPost(post)}
                key={post._id}
                className="btn1"
              >
                <Link
                  to={`/profile/${post.author.username}/${post._id}`}
                  key={post._id}
                >
                  <Card className="post-image-card">
                    <CardMedia
                      component="img"
                      height="410"
                      width={"310"}
                      image={post.imageUrl}
                      alt="post"
                    />
                    <div className="overlay"></div>
                    <div className="overlay-info d-flex justify-content-center align-items-center">
                      <div className="likes d-flex align-items-center gap-1">
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "#ffffff" }}
                        ></i>
                        {post.likes.length}
                      </div>
                      <div className="comments d-flex align-items-center gap-1">
                        <i
                          className="fa-solid fa-comment"
                          style={{ color: "#ffffff" }}
                        ></i>
                        {post.comments.length}
                      </div>
                    </div>
                  </Card>
                </Link>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
