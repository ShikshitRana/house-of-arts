import "./Login.css";
import logo from "../../Assets/logo.png";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";

import { useAlert } from "react-alert";

import leftBg from "../../Assets/login.jpg";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [txt, setTxt] = useState("password");
  const [eyeIcon, setIcon] = useState("images/show.png");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);

  const loginHandler = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert.error("Password must be at least 6 characters long.");
      return;
    }

    dispatch(loginUser(email, password));

    alert.info("Logging you in, please wait.");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, error, dispatch]);

  const showpwd = () => {
    if (txt === "password") {
      setTxt("text");
      setIcon("images/hide.png");
    } else {
      setTxt("password");
      setIcon("images/show.png");
    }
  };

  return (
    <div className="login">
      <div className="left_div">
        <img className="left" src={leftBg} alt={"g"} />
      </div>

      <form className="loginForm" onSubmit={loginHandler}>
        <Link to="/register">
          <img className="logo_img" src={logo} alt="" />
        </Link>

        <input
          className="input_email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="pwdDiv">
          <input
            className="input_pwd"
            type={txt}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
            required
          />

          <div className="show">
            <img onClick={showpwd} src={eyeIcon} alt="show password" />
          </div>
        </div>

        <button className="sbt_btn" type="submit">
          Login
        </button>

        <Link to="/forgot/password">
          <p className="link_btn">Forgot Password?</p>
        </Link>

        <Link to="/register">
          <p className="link_btn">SignUp?</p>
        </Link>

        <div className="footer">
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
      </form>
    </div>
  );
};

export default Login;
