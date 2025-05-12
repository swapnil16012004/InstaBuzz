import { useContext, useEffect, useRef } from "react";
import { MyContext } from "../../App";
import profileImg from "../../assets/profile1.jpg";
import axiosInstance from "../../axiosConfig";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { Link } from "react-router-dom";
const postcount = 3;

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
  } = useContext(MyContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
          `/${currUser}/upload`,
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
    setShowNavbar(true);
  }, [showNavbar, selectedImage]);

  useEffect(() => {
    if (currUser === null) {
      navigate("/login");
    }
  }, [currUser]);

  return (
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
            <h2>{currUser}</h2>
            <Link to={`/${currUser}/edit`}>
              <button className="edit-profile-btn btn btn-primary">
                Edit Profile
              </button>
            </Link>
          </div>
          <div className="post-count">
            <p>
              <b>{postcount}</b> Posts
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
      <div className="posts-section">
        <div className="posts-title mb-2 d-flex align-items-center justify-content-center gap-2">
          <BsFillGrid3X3GapFill /> POSTS
        </div>
        <div className="posts-container d-flex flex-wrap justify-content-center">
          {[...Array(postcount)].map((_, index) => (
            <Card key={index} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="410"
                width={"310"}
                image={profileImg}
                alt="post"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
