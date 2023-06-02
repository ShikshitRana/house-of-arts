import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="newPost">
      <div className="not_found h_login">
        <p>Page Not Found</p>

        <Link to="/">
          <p>Go to Home</p>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
