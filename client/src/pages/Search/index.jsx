import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { data, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import Account from "../../components/Account";
import { IoClose } from "react-icons/io5";
import { Alert } from "@mui/material";
import BlurText from "../../../Reactbits/BlurText/BlurText";
import SplitText from "../../../Reactbits/SplitText/SplitText";

const Search = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const closeSearch = () => {
    context.setSearchedUser(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      username: form.username.value,
    };
    console.log(formData);

    try {
      const response = await axiosInstance.post(
        `/${context.currUser}/getuser`,
        formData
      );
      const data = response.data.user;
      context.setSearchedUser(data);
      context.setFlashMessage(response.data.message);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (context.flashMessage) {
      setTimeout(() => {
        context.setFlashMessage(null);
      }, 4000);
    }
  }, [context.flashMessage, context.setSearchedUser]);

  useEffect(() => {
    context.setShowNavbar(true);
    console.log(context.searchedUser);
  }, [context.showNavbar, context.searchedUser]);

  useEffect(() => {
    if (context.currUser === null) {
      navigate("/login");
    }
  }, [context.currUser]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex-container d-flex justify-content-center mt-3 mb-3">
        {context.flashMessage && (
          <Alert
            severity="success"
            style={{ width: "70%", fontSize: "medium" }}
          >
            {context.flashMessage}
          </Alert>
        )}
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <div className="searchUserInput d-flex align-items-center">
            <input type="text" name="username" className="form-control" />
            <button className="btn btn-info" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
      {context.searchedUser ? (
        <div className="searchedUser d-flex align-items-center justify-content-between">
          <Link to={`/profile/${context.searchedUser.username}`}>
            <div className="searchedUserInfo d-flex align-items-center">
              <Account img={context.searchedUser.profileImg} />
              {context.searchedUser.username}
            </div>
          </Link>
          <button
            className="closeSearchBtn d-flex cursor"
            onClick={closeSearch}
          >
            <IoClose className="closeSearch" />
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="mt-5">
            <BlurText
              text="Search for a user"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />
          </h1>
          <p className="text-center">
            <SplitText
              text="Search for a user to view their profile and posts."
              className="text-2xl font-semibold text-center"
              delay={50}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            />
          </p>
        </div>
      )}
    </>
  );
};
export default Search;
