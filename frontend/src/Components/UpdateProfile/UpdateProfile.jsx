import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProfile.css";
import { loadUser, updateProfile } from "../../Actions/User";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);

        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, alert, updateError, message]);
  return loading ? (
    <Loader />
  ) : (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <div className="h_txt">Update Profile?</div>{" "}
        <div className="h_login">
          Update your name, email address and profile picture.
        </div>
        <div className="file_div">
          <div className="profile_pic">
            <img
              className="upload_img_btn"
              src="/images/uploadimg.png"
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
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="sbt_btn" disabled={updateLoading} type="submit">
          Update
        </button>
      </form>

      <div className="end_div_np">
        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{
            height: "10vmax",
            width: "10vmax",
            boxShadow: 3,
            border: "1px solid lightgray",
            "@media (max-width: 600px)": {
              height: "19vmax",
              width: "19vmax",
              margin: "10vmax auto",
            },
          }}
        />
      </div>
    </div>
  );
};

export default UpdateProfile;
