import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    axios
      .get("/api/pages")
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setFeatures(response.data.features);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  return (
    <div className="home">
      <div className="home_container">
        <h1> {title} </h1>
        <p> {description} </p>
        {features.length > 0 ? (
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p>No features available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
