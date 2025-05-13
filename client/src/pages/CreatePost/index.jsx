import { useContext } from "react";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";

const CreatePost = () => {
  const { currUser, setFlashMessage, flashMessage } = useContext(MyContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = e.target.postImg.files[0];
    const caption = e.target.caption.value;

    const maxSizeInMB = 10;
    const fileSizeInMB = image.size / (1024 * 1024);

    if (fileSizeInMB > maxSizeInMB) {
      setFlashMessage(
        `File size exceeds the maximum limit of ${maxSizeInMB} MB. Your file is ${fileSizeInMB.toFixed(
          2
        )} MB.`
      );
      return;
    }

    const formData = new FormData();
    formData.append("postImg", image);
    formData.append("caption", caption);

    try {
      const response = await axiosInstance.post(
        `/${currUser}/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created successfully:", response.data);
      setFlashMessage(response.data.message);
      navigate(`/profile`);
    } catch (error) {
      console.error("Failed to create post:", error.message);
    }
  };

  useEffect(() => {
    if (flashMessage) {
      setTimeout(() => {
        setFlashMessage(null);
      }, 4000);
    }
  }, [flashMessage]);

  return (
    <div className="row mt-5 editProfile">
      <div className="flex-container d-flex justify-content-center mt-3 mb-3">
        {flashMessage && (
          <Alert
            severity="success"
            style={{ width: "70%", fontSize: "medium" }}
          >
            {flashMessage}
          </Alert>
        )}
      </div>
      <h1 className="col-6 offset-3">Create New Post</h1>
      <div className="col-6 offset-3">
        <form
          method="post"
          noValidate
          className="needs-validation"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              name="postImg"
              required
            />
            <div className="invalid-feedback">Please choose an img</div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="caption"
              className="form-label"
              style={{ color: "rgba(0, 0, 0, 0.6)" }}
            >
              Caption
            </label>
            <input
              type="text"
              name="caption"
              className="form-control"
              id="caption"
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please Enter the caption</div>
          </div>
          <button className="btn bttn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
