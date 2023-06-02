import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Avatar } from "@mui/material";
import logo from "../../Assets/logo2.png";
import logo2 from "../../Assets/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
} from "@mui/icons-material";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className="header">
      <a className="logo_head" href="/">
        <img className="logo_img_head" src={logo} alt="" />
      </a>

      <a className="logo_head2" href="/">
        <img className="logo_img_head2" src={logo2} alt="" />
      </a>

      <div className="header_link">
        <Link to="/" onClick={() => setTab("/")}>
          {tab === "/" ? (
            <>
              <Home
                style={{ color: "black"}}
              />
              <span className="head_txt_sel">Home</span>
            </>
          ) : (
            <>
              <HomeOutlined
                style={{ color: "black"}}
              />
              <span className="head_txt_ns">Home</span>
            </>
          )}
        </Link>
      </div>

      <div className="header_link">
        <Link to="/newpost" onClick={() => setTab("/newpost")}>
          {tab === "/newpost" ? (
            <>
              <Add
                style={{ color: "black" }}
              />
              <span className="head_txt_sel">New Post</span>
            </>
          ) : (
            <>
              <AddOutlined
                style={{ color: "black" }}
              />
              <span className="head_txt_ns">New Post</span>
            </>
          )}
        </Link>
      </div>

      <div className="header_link">
        {" "}
        <Link to="/search" onClick={() => setTab("/search")}>
          {tab === "/search" ? (
            <>
              <Search
                style={{ color: "black" }}
              />{" "}
              <span className="head_txt_sel">Search</span>
            </>
          ) : (
            <>
              <SearchOutlined
                style={{ color: "black" }}
              />{" "}
              <span className="head_txt_ns">Search</span>
            </>
          )}
        </Link>
      </div>

      <div className="header_link">
        {" "}
        <Link to="/account" onClick={() => setTab("/account")}>
          {tab === "/account" ? (
            <>
              <Avatar
                src={user.avatar.url}
                sx={{
                  height: "1.8vmax",
                  width: "1.8vmax",
                  margin: "0.1vmax",
                  border: "3px solid lightgray",
                  "@media (max-width: 600px)": {
                    height: "3vmax",
                    width: "3vmax",
                  },
                }}
              />
              <span className="head_txt_sel">Profile</span>
            </>
          ) : (
            <>
              <Avatar
                src={user.avatar.url}
                sx={{
                  height: "1.8vmax",
                  width: "1.8vmax",
                  margin: "0.1vmax",
                  border: "1px solid lightgray",
                  "@media (max-width: 600px)": {
                    height: "3vmax",
                    width: "3vmax",
                  },
                }}
              />
              <span className="head_txt_ns">Profile</span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
