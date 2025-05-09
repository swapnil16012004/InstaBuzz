import { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axiosConfig";
import { MyContext } from "../../App";
import Alert from "@mui/material/Alert";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  let context = useContext(MyContext);
  useEffect(() => {
    axiosInstance
      .get("/pages")
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setFeatures(response.data.features);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  useEffect(() => {
    if (context.flashMessage) {
      setTimeout(() => {
        context.setFlashMessage(null);
      }, 4000);
    }
  }, [context.flashMessage]);

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
