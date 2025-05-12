import { useContext } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
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
        <Link to={"/profile"}>
          <FaUser />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
