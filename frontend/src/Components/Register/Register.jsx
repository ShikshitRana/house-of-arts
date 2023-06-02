import "./Register.css";
import logo from "../../Assets/logo2.png";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const [txt, setTxt] = useState("password");
  const [eyeIcon, setIcon] = useState("images/show.png");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file.size > 3 * 1024 * 1024) {
      alert.error("Image size cannot exceed more than 3 MB");
      return;
    }

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setName(name.trim());

    if (name.trim().length === 0) {
      alert.error("Name cannot be empty.");
      return;
    }

    if (name.trim().includes(" ")) {
      alert.error("Name cannot be empty or contain spaces.");
      return;
    }

    if (!avatar) {
      alert.error(
        "Please upload your profile picture by clicking on the avatar icon above."
      );
      return;
    }

    if (password.length < 6) {
      alert.error("Password must be at least 6 characters long.");
      return;
    }

    dispatch(registerUser(name.trim(), email, password, avatar));

    alert.info("We are creating your account. Please wait.");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);

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
        <div className="h_txt">Create an account</div>
        <div className="h_des">
          Make an account and share your art with people around the world.
        </div>
        <div className="h_login">
          Already registered?
          <Link to="/">
            <p> Login Now</p>
          </Link>
        </div>

        <div className="file_div">
          <div className="profile_pic">
            {" "}
            <Avatar
              elevation={2}
              src={avatar}
              alt="User"
              sx={{
                height: "5vmax",
                width: "5vmax",
                backgroundColor: "black",
                boxShadow: 3,
                "@media (max-width: 600px)": {
                  height: "8vmax",
                  width: "8vmax",
                },
              }}
            />
            <input
              className="upload_btn"
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange}
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

        <div className="check_div">
          <input className="tick" type="checkbox" required />
          <label className="label_chk">
            By continuing, you agree to our{" "}
            <a
              rel="noreferrer"
              target="_blank"
              className="re"
              href="https://www.freeprivacypolicy.com/live/26fff222-d4cb-404a-9e87-959062a480c4"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              rel="noreferrer"
              target="_blank"
              className="re"
              href="https://www.termsandconditionsgenerator.com/live.php?token=5vnDsUgDSaBNRZJvUNzy3eUTANtdK1Bd"
            >
              Terms and Conditions.
            </a>
          </label>
        </div>

        <button className="sbt_btn" disabled={loading} type="submit">
          Sign Up
        </button>
      </form>

      <div className="end_div">
        <div className="scroll_container">
          <img className="scroll_img" src="images/p2.jpg" alt="" />
          <img className="scroll_img" src="images/d1.jpg" alt="" />
          <img className="scroll_img" src="images/p3.jpg" alt="" />
          <img className="scroll_img" src="images/d2.jpg" alt="" />
          <img className="scroll_img" src="images/d3.jpg" alt="" />
          <img className="scroll_img" src="images/p1.jpg" alt="" />
          <img className="scroll_img" src="images/p2.jpg" alt="" />
          <img className="scroll_img" src="images/d4.jpg" alt="" />
          <img className="scroll_img" src="images/d5.jpg" alt="" />
          <img className="scroll_img" src="images/d6.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
