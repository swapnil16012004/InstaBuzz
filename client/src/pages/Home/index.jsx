import { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axiosConfig";
import { MyContext } from "../../App";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post";
import defaultProfileImg from "../../assets/profile1.jpg";

const Home = () => {
  let context = useContext(MyContext);

  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get("/")
      .then((response) => {
        console.log("Data fetched successfully:", response.data);
        context.setAllPosts(response.data);
        context.setShowNavbar(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [context.showNavbar, context.setAllPosts, context.allPosts]);

  useEffect(() => {
    if (context.flashMessage) {
      setTimeout(() => {
        context.setFlashMessage(null);
      }, 4000);
    }
  }, [context.flashMessage]);

  useEffect(() => {
    if (context.currUser === null) {
      navigate("/login");
    }
    context.setDisplayLogo(false);
  }, [context.currUser]);

  return (
    <div className="home">
      <div className="flex-container d-flex justify-content-center mt-3">
        {context.flashMessage && (
          <Alert
            severity="success"
            style={{ width: "1050px", fontSize: "medium" }}
          >
            {context.flashMessage}
          </Alert>
        )}
      </div>
      <div className="home_container">
        <div className="allPosts d-flex flex-column align-items-center mt-3 pb-2">
          {context.allPosts && context.allPosts.length > 0 ? (
            context.allPosts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                img={post.author.profileImg || defaultProfileImg}
                postAuthor={post.author.username}
                createdAt={post.createdAt}
                url={post.imageUrl}
                caption={post.caption}
                likes={post.likes}
                post={post}
              />
            ))
          ) : (
            <div className="no-posts-message">
              No posts available. Please check back later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
<div
  className="mt-1 mb-1"
  style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
></div>;
export default Home;
