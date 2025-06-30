import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MyContext } from "../../App";
import { useContext, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let context = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const response = await axiosInstance.post(`/logout`);
      const data = response.data;
      console.log("Logout data:", data);
      setTimeout(() => {
        context.setIsLoggedIn(false);
        context.setCurrUser(null);
        context.setFlashMessage("You are logged out successfully!");
      }, 100);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      const errorMessage = error.response?.data?.message || "Logout failed";
      context.setFlashMessage({ success: false, message: errorMessage });
    }
  };

  return (
    <AppBar position="sticky" className="w-100">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            InstaBuzz
          </Link>
        </Typography>
        {/* {context.isLoggedIn && ( */}
        <Button className="logoutBtn" color="inherit" onClick={handleLogout}>
          Logout
        </Button>
        {/* )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
