import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Reels = () => {
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
      <h1>Reels</h1>
      <p>This is the Reels page.</p>
    </div>
  );
};
export default Reels;
