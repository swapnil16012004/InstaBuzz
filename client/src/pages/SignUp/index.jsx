import { useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      console.log("Signup successful:", response.data);
      alert("signup successful");
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };
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
          <button type="submit" className="btn bttn btn-primary">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
