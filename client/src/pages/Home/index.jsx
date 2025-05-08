import { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axiosConfig";
import { MyContext } from "../../App";

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

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const response = await axiosInstance.post(`/logout`);
      const data = response.data;
      console.log("Logout data:", data);
      setTimeout(() => {
        context.setIsLoggedIn(false);
        context.setCurrUser(null);
      }, 100);
      alert("Logout successful");
    } catch (error) {
      console.error("Error during logout:", error);
      const errorMessage = error.response?.data?.message || "Logout failed";
      context.setFlashMessage({ success: false, message: errorMessage });
    }
  };

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
      <button onClick={handleLogout} className="btn bttn btn-outlined">
        Log out
      </button>
    </div>
  );
};

export default Home;
