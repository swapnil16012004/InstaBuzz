import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const EditProfile = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const formData = {
      username: form.username.value,
      name: form.name.value,
      gender: form.gender.value,
      bio: form.bio.value,
    };
    console.log("Form data:", formData);
    try {
      const response = await axiosInstance.put(
        `/${context.currUser}/edit`,
        formData
      );
      const data = response.data;
      console.log("Profile update data:", data);
      context.setGender(data.user.gender);
      context.setUserFullName(data.user.name);
      context.setBio(data.user.bio);

      context.setFlashMessage(data.message);
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    context.setShowNavbar(true);
    context.setDisplayLogo(false);
  }, [context.showNavbar]);

  useEffect(() => {
    if (context.currUser === null) {
      navigate("/login");
    }
  }, [context.currUser]);
  return (
    <div className="row mt-5 editProfile">
      <h1 className="col-6 offset-3">Edit Your Profile</h1>
      <div className="col-6 offset-3">
        <form
          method="post"
          noValidate
          className="needs-validation"
          onSubmit={handleEditProfile}
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
              defaultValue={context.currUser}
              readOnly
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please choose a username</div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label"
              style={{ color: "rgba(0, 0, 0, 0.6)" }}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              defaultValue={context.userFullName}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please choose your name</div>
          </div>
          <div className="mb-3">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={context.gender}
                name="gender"
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

          <div className="mb-3">
            <TextField
              id="bio"
              label="Bio"
              name="bio"
              variant="outlined"
              defaultValue={context.bio}
              style={{ width: 600, opacity: "0.8" }}
            />
          </div>
          <button className="btn bttn btn-primary">Edit</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
