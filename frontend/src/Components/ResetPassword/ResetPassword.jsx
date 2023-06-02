import logo from "../../Assets/logo2.png";
import logo2 from "../../Assets/logo.png";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/User";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert.error("Password must be atleast 6 characters long.");
      return;
    }
    dispatch(resetPassword(params.token, newPassword));
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
  }, [alert, error, dispatch, message]);

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

  return (
    <div className="register">
      <div className="left_div_signup">
        <a className="logo_img_a" href="/">
          <img className="logo_img_reg" src={logo} alt="" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/shikshit-rana"
        >
          <LinkedInIcon style={{ color: "black" }} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/ShikshitRana"
        >
          <GitHubIcon style={{ color: "black" }} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/shikshit_rana"
        >
          <InstagramIcon style={{ color: "black" }} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/shikshit_rana"
        >
          <TwitterIcon style={{ color: "black" }} />
        </a>
      </div>

      <form className="registerForm" onSubmit={submitHandler}>
        <div className="h_txt">Reset Password?</div>
        <div className="h_login">
          Don't want to reset password?
          <Link to="/">
            <p> Login Now</p>
          </Link>
        </div>

        <div className="pwdDiv">
          <input
            className="input_pwd"
            type={txt}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="on"
            required
          />

          <div className="show">
            <img onClick={showpwd} src={eyeIcon} alt="show password" />
          </div>
        </div>

        <button className="sbt_btn" disabled={loading} type="submit">
          Reset Password
        </button>
        <div className="h_login">
          <p>Token Expired or Invalid?</p>
          <Link to="/forgot/password">
            <p> Request Another Token</p>
          </Link>
        </div>
      </form>

      <div className="end_div_fp"></div>

      <div className="sm_div">
        <a className="sm_logo" href="/">
          <img className="sm_logo_img" src={logo2} alt="" />
        </a>
        <p className="sm_text">
          ©2023-2025 All Rights Reserved. HouseofArts® is a registered
          trademark.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
