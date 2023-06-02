import "./UpdatePassword.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";
import { useAlert } from "react-alert";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    if (oldPassword === newPassword) {
      alert.error("Both passwords cannot be same.");
      return;
    }

    if(newPassword.length < 6){
      alert.error("Password must be atleast 6 characters long.");
      return;
    }

    dispatch(updatePassword(oldPassword, newPassword));
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
  }, [dispatch, error, alert, message]);

  const [txt, setTxt] = useState("password");
  const [eyeIcon, setIcon] = useState("/images/show.png");

  const showpwd = () => {
    if (txt === "password") {
      setTxt("text");
      setIcon("/images/hide.png");
    } else {
      setTxt("password");
      setIcon("/images/show.png");
    }
  };


  const [txt1, setTxt1] = useState("password");
  const [eyeIcon1, setIcon1] = useState("/images/show.png");
  const showpwdn = () => {
    if (txt1 === "password") {
      setTxt1("text");
      setIcon1("/images/hide.png");
    } else {
      setTxt1("password");
      setIcon1("/images/show.png");
    }
  };

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <div className="h_txt">Update Password?</div>
        <div className="password_label">Old Password</div>

        <div className="pwdDiv">
          <input
            className="input_pwd"
            type={txt}
            placeholder=""
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="on"
            required
          />

          <div className="show">
            <img onClick={showpwd} src={eyeIcon} alt="show password" />
          </div>
        </div>

        <div className="password_label">New Password</div>

        <div className="pwdDiv">
          <input
            className="input_pwd"
            type={txt1}
            placeholder=""
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="on"
            required
          />

          <div className="show">
            <img onClick={showpwdn} src={eyeIcon1} alt="show password" />
          </div>
        </div>

        <button className="sbt_btn" disabled={loading} type="submit">
          Update
        </button>
      </form>
      <div className="end_div_np"></div>
    </div>
  );
};

export default UpdatePassword;
