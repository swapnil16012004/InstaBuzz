import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    context.setShowNavbar(true);
  }, [context.showNavbar]);

  useEffect(() => {
    if (context.currUser === null) {
      navigate("/login");
    }
  }, [context.currUser]);

  return (
    <div>
      <h1>Search</h1>
      <p>Search page content goes here.</p>
    </div>
  );
};
export default Search;
