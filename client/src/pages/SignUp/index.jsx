import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const SignUp = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    try {
      const response = await axiosInstance.post(`/signup`, formData);
      const data = response.data;

      console.log("Signup successful:", data);

      localStorage.setItem("token", data.token);

      context.setCurrUser(data.user.username);
      context.setGender(data.user.gender);
      context.setUserFullName(data.user.name);
      context.setBio(data.user.bio);
      context.setCurrUserImage(data.user.profileImg);
      context.setSelectedImage(data.user.profileImg);
      context.setIsLoggedIn(true);
      context.setFlashMessage(data.message);

      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    context.setShowNavbar(false);
    context.setDisplayLogo(false);
  }, [context.showNavbar]);

  return (
    <div className="row mt-5 signup-color">
      <h1 className="col-6 offset-3">Signup on InstaBuzz</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please choose a username</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please enter your email</div>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please choose your Name</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Nice password!</div>
            <div className="invalid-feedback">Please Enter the password</div>
          </div>
          <div className="mb-3">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <button type="submit" className="btn bttn btn-primary">
            SignUp
          </button>
        </form>
      </div>
      <div className="col-12 mt-5 d-flex flex-column align-items-center">
        <p>Already have an account?</p>
        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
          <button className="btn bttn btn-primary">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
