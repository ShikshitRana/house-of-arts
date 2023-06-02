import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";
import "./Search.css";

const Search = () => {
  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <div className="h_txt">Search Users</div>{" "}
        <div className="h_login">
          Type the name of the user below to search.
        </div>
        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="sbt_btn" disabled={loading} type="submit">
          Search
        </button>
      </form>
      <div className="end_div_np">
        <div className="searchResults">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
