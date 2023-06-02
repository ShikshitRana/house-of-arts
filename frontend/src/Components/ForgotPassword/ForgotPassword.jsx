import logo from "../../Assets/logo2.png";
import logo2 from "../../Assets/logo.png";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import "./ForgotPassword.css";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
        <div className="h_txt">Forgot Password?</div>
        <div className="h_login">
          Enter your registered email address below and we'll send you a link to
          reset your password on your email address.
        </div>

        <input
          type="email"
          placeholder="Email"
          required
          className="registerInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="sbt_btn" disabled={loading} type="submit">
          Send Token
        </button>
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

export default ForgotPassword;
