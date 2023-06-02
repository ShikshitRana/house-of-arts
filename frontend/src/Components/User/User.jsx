import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <Avatar
        src={avatar}
        sx={{
          height: "5vmax",
          width: "5vmax",
          border: "1px solid lightgray",
        }}
      />

      <p className="homeUser_name">{name}</p>
    </Link>
  );
};

export default User;
