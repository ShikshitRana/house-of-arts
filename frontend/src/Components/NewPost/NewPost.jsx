import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../Actions/Post";
import { loadUser } from "../../Actions/User";
import "./NewPost.css";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    alert.info("Please wait, your post is being created.");
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
    setImage(null);
    setCaption("");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <div className="h_txt">New Post</div>{" "}
        <div className="h_login">
          Select an image and write a caption to post.
        </div>
        <div className="file_div">
          <div className="profile_pic">
            <img
              className="upload_img_btn"
              src="images/uploadimg.png"
              alt="upload"
            />
            <input
              className="upload_btn"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
        </div>
        <input
          type="text"
          value={caption}
          placeholder="Caption"
          className="registerInputs"
          onChange={(e) => setCaption(e.target.value)}
        />
        <button className="sbt_btn" disabled={loading} type="submit">
          Post
        </button>
      </form>

      <div className="end_div_np">
        {!image && (
          <img className="newpost_img" src="/images/postimg.png" alt="post" />
        )}
        {image && <img className="newpost_img" src={image} alt="post" />}
      </div>
    </div>
  );
};

export default NewPost;
