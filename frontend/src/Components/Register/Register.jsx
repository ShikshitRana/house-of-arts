import "./Register.css";
import logo from "../../Assets/logo.png";
import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

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

    if (password.length < 6) {
      alert.error("Password must be at least 6 characters long.");
      return;
    }

    dispatch(registerUser(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);

  return (
    <div className="register">
      <div className="form_and_avatar">

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "20vmax", width: "20vmax" }}
        />

        <form className="registerForm" onSubmit={submitHandler}>
        <div className="logo_reg">
          <img className="logo_img_reg" src={logo} alt="" />
        </div>

          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
          />

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

          <input
            type="password"
            className="registerInputs"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/">
            <Typography>Already Signed Up? Login Now</Typography>
          </Link>

          <Button disabled={loading} type="submit">
            Sign Up
          </Button>
        </form>

      </div>
    </div>
  );
};

export default Register;
