import { useContext } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { FiPlusSquare } from "react-icons/fi";
import Dock from "../../../Reactbits/Dock/Dock";
import { IoPerson } from "react-icons/io5";

const Footer = () => {
  const { currUser, currUserImage } = useContext(MyContext);
  const navigate = useNavigate();
  const items = [
    {
      icon: <GrHomeRounded size={20} />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      icon: <IoSearch size={20} />,
      label: "Search",
      onClick: () => navigate("/search"),
    },
    {
      icon: <FiPlusSquare size={22} />,
      label: "Create",
      onClick: () => navigate(`/${currUser}/create`),
    },
    {
      icon: <RiSendPlaneFill size={20} />,
      label: "Chats",
      onClick: () => navigate("/chats"),
    },
    {
      icon: <IoPerson size={20} />,
      label: "Profile",
      onClick: () => (window.location.href = `/profile/${currUser}`),
    },
  ];
  return (
    <footer style={{ position: "relative", zIndex: 100 }}>
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        className="footerDock"
      />
    </footer>
  );
};

export default Footer;
