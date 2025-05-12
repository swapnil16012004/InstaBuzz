import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import axiosInstance from "../../axiosConfig";
import { Link } from "react-router-dom";

const Login = () => {
  let context = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const formData = {
      username: form.username.value,
      password: form.password.value,
    };
    try {
      const response = await axiosInstance.post(
        "/login",
        new URLSearchParams(formData).toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const data = response.data;
      console.log("Login data:", data);
      context.setCurrUser(data.user.username);
      context.setGender(data.user.gender);
      context.setUserFullName(data.user.name);
      context.setBio(data.user.bio);
      context.setSelectedImage(data.user.profileImg);
      context.setIsLoggedIn(true);
      context.setFlashMessage(data.message);
      setTimeout(() => {
        navigate("/");
      }, 100);
      console.log(context.gender);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (context.currUser) {
      console.log("Current user:", context.currUser);
    }
    context.setShowNavbar(false);
  }, [context.currUser, context.showNavbar]);

  return (
    <div className="row mt-5 login-color">
      <h1 className="col-6 offset-3">Login to InstaBuzz</h1>
      <div className="col-6 offset-3">
        <form
          action={`/login`}
          method="post"
          noValidate
          className="needs-validation"
          onSubmit={handleLogin}
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please choose a username</div>
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
              required
            />
            <div className="valid-feedback">Nice password!</div>
            <div className="invalid-feedback">Please Enter the password</div>
          </div>
          <button className="btn bttn btn-primary">Login</button>
        </form>
      </div>
      <div className="col-12 mt-5 d-flex flex-column align-items-center">
        <p>Don't have an account?</p>
        <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
          <button className="btn bttn btn-primary">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
