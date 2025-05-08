import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import axiosInstance from "../../axiosConfig";

const Login = () => {
  let context = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

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
      context.setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 100);
      alert("Login successful");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (context.currUser) {
      console.log("Current user:", context.currUser);
    }
  }, [context.currUser]);

  return (
    <div className="row mt-5 login-color">
      <h1 className="col-6 offset-3">Login</h1>
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
          </div>
          <button className="btn bttn btn-outlined">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
