import AIChatLogo from "../../assets/AIChatLogo.png";
import { Link } from "react-router-dom";

const AILogo = () => {
  return (
    <div className="ailogocontainer">
      <Link to={"/aichat"}>
        <img src={AIChatLogo} className="ailogobtn" alt="ailogobtn" />
      </Link>
    </div>
  );
};

export default AILogo;
