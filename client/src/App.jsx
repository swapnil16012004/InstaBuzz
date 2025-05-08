import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import { createContext, useEffect, useState } from "react";

let MyContext = createContext();

function App() {
  const [currUser, setCurrUser] = useState(() => {
    return localStorage.getItem("currUser") || null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const values = {
    currUser,
    setCurrUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  useEffect(() => {
    if (currUser) {
      localStorage.setItem("currUser", currUser);
    } else {
      localStorage.removeItem("currUser");
    }

    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [currUser, isLoggedIn]);

  return (
    <>
      <Router>
        <MyContext.Provider value={values}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </MyContext.Provider>
      </Router>
    </>
  );
}

export default App;
export { MyContext };
