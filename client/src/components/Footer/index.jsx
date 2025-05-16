import { useContext } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import Account from "../Account";

const Footer = () => {
  const { currUser, selectedImage } = useContext(MyContext);
  return (
    <footer>
      <div className="footer-box d-flex justify-content-between align-items-center">
        <Link to={"/"}>
          <GrHomeRounded />
        </Link>
        <Link to={"/search"}>
          <IoSearch />
        </Link>
        <Link to={"/reels"}>
          <BiSolidVideos />
        </Link>
        <Link to={"/chats"}>
          <RiSendPlaneFill />
        </Link>
        <Link to={`/profile/${currUser}`}>
          <div className="currProfileImg">
            <Account img={selectedImage} />
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
