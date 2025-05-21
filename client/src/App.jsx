import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chats from "./pages/Chats";
import Search from "./pages/Search";
import EditProfile from "./pages/EditProfile";
import profileImg from "./assets/profile1.jpg";
import CreatePost from "./pages/CreatePost";
import FullPost from "./pages/FullPost";
import ClickSpark from "../Reactbits/ClickSpark/ClickSpark";

let MyContext = createContext();

function App() {
  const [currUser, setCurrUser] = useState(() => {
    return localStorage.getItem("currUser") || null;
  });
  const [gender, setGender] = useState(() => {
    return localStorage.getItem("gender") || null;
  });
  const [userFullName, setUserFullName] = useState(() => {
    return localStorage.getItem("userFullName") || null;
  });
  const [bio, setBio] = useState(() => {
    return localStorage.getItem("bio") || null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [showNavbar, setShowNavbar] = useState(true);
  const [flashMessage, setFlashMessage] = useState(() => {
    return localStorage.getItem("flashMessage") || null;
  });

  const [selectedImage, setSelectedImage] = useState(() => {
    return localStorage.getItem("selectedImage") || profileImg;
  });

  const [currUserImage, setCurrUserImage] = useState(() => {
    return localStorage.getItem("currUserImage") || profileImg;
  });

  const [posts, setPosts] = useState(() => {
    const data = localStorage.getItem("posts");
    return data ? JSON.parse(data) : [];
  });

  const [selectedPost, setSelectedPost] = useState(() => {
    const data = localStorage.getItem("selectedPost");
    return data ? JSON.parse(data) : [];
  });

  const [selectedUser, setSelectedUser] = useState(() => {
    return localStorage.getItem("selectedUser") || null;
  });

  const [searchedUser, setSearchedUser] = useState(() => {
    const data = localStorage.getItem("searchedUser");
    return data ? JSON.parse(data) : [];
  });

  const [postAllComments, setPostAllComments] = useState(() => {
    const data = localStorage.getItem("postAllComments");
    return data ? JSON.parse(data) : [];
  });

  const [postAllLikes, setPostAllLikes] = useState(() => {
    try {
      const data = localStorage.getItem("postAllLikes");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      localStorage.removeItem("postAllLikes");
      return [];
    }
  });

  const values = {
    currUser,
    setCurrUser,
    isLoggedIn,
    setIsLoggedIn,
    flashMessage,
    setFlashMessage,
    showNavbar,
    setShowNavbar,
    gender,
    setGender,
    userFullName,
    setUserFullName,
    bio,
    setBio,
    selectedImage,
    setSelectedImage,
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    selectedUser,
    setSelectedUser,
    currUserImage,
    setCurrUserImage,
    searchedUser,
    setSearchedUser,
    postAllComments,
    setPostAllComments,
    postAllLikes,
    setPostAllLikes,
  };

  useEffect(() => {
    if (currUser) {
      localStorage.setItem("currUser", currUser);
      localStorage.setItem("gender", gender);
      localStorage.setItem("userFullName", userFullName);
      localStorage.setItem("bio", bio);
      localStorage.setItem("selectedImage", selectedImage);
      localStorage.setItem("posts", JSON.stringify(posts));
      localStorage.setItem("selectedPost", JSON.stringify(selectedPost));
      localStorage.setItem("selectedUser", selectedUser);
      localStorage.setItem("currUserImage", currUserImage);
      localStorage.setItem("searchedUser", JSON.stringify(searchedUser));
      localStorage.setItem("postAllComments", JSON.stringify(postAllComments));
      localStorage.setItem("postAllLikes", JSON.stringify(postAllLikes));
    } else {
      localStorage.removeItem("currUser");
      localStorage.removeItem("gender");
      localStorage.removeItem("userFullName");
      localStorage.removeItem("bio");
      localStorage.removeItem("selectedImage");
      localStorage.removeItem("posts");
      localStorage.removeItem("selectedPost");
      localStorage.removeItem("selectedUser");
      localStorage.removeItem("currUserImage");
      localStorage.removeItem("searchedUser");
      localStorage.removeItem("postAllComments");
      localStorage.removeItem("postAllLikes");
    }
  }, [
    currUser,
    isLoggedIn,
    gender,
    userFullName,
    bio,
    selectedImage,
    posts,
    selectedPost,
    selectedUser,
    currUserImage,
    postAllComments,
    postAllLikes,
  ]);

  return (
    <>
      <ClickSpark
        sparkColor="#000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Router>
          <MyContext.Provider value={values}>
            {showNavbar && <Navbar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/:username/edit" element={<EditProfile />} />
              <Route path="/:username/create" element={<CreatePost />} />
              <Route path="/profile/:username/:id" element={<FullPost />} />
            </Routes>
            {showNavbar && <Footer />}
          </MyContext.Provider>
        </Router>
      </ClickSpark>
    </>
  );
}

export default App;
export { MyContext };
