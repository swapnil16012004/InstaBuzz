import { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axiosConfig";
import { MyContext } from "../../App";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  let context = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get("/pages")
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setFeatures(response.data.features);
        context.setShowNavbar(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [context.showNavbar]);

  useEffect(() => {
    if (context.flashMessage) {
      setTimeout(() => {
        context.setFlashMessage(null);
      }, 4000);
    }
  }, [context.flashMessage]);

  useEffect(() => {
    if (context.currUser === null) {
      navigate("/login");
    }
  }, [context.currUser]);

  if (!features) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <div className="flex-container d-flex justify-content-center mt-3">
        {context.flashMessage && (
          <Alert
            severity="success"
            style={{ width: "70%", fontSize: "medium" }}
          >
            {context.flashMessage}
          </Alert>
        )}
      </div>
      <div className="home_container">
        <h1> {title} </h1>
        <p> {description} </p>

        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
