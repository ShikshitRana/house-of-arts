import { Avatar, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import "./Account.css";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let navigate = useNavigate();

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [logoutToggle, setLogoutToggle] = useState(false);
  const [dltProfileToggle, setDltProfileToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [settingsToggle, setSettingsToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  const deleteProfileHandler = async () => {
    alert.info("Deleting your profile. Please do not close the window.");
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  const updatePwdHandler = () => {
    navigate("/update/password");
  };

  const editProHandler = () => {
    navigate("/update/profile");
  };

  const unitlist = ["", "K", "M", "G"];
  function formatnumber(number) {
    let sign = Math.sign(number);
    let unit = 0;

    while (Math.abs(number) > 1000) {
      unit = unit + 1;
      number = Math.floor(Math.abs(number) / 100) / 10;
    }
    return sign * Math.abs(number) + unitlist[unit];
  }

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      {" "}
      <div className="account_left">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <>
            <p className="h_txt">No posts yet</p>
            <p className="h_login">Your posts will appear here.</p>
          </>
        )}
      </div>
      <div className="account_right">
        <div className="profile_personal">
          {" "}
          <Avatar
            src={user.avatar.url}
            sx={{
              height: "10vmax",
              width: "10vmax",
              border: "2px solid lightgray",
            }}
          />
          <p className="userName">{user.name}</p>
        </div>

        <div className="profile_details">
          {" "}
          <div className="profile_fl">
            <button onClick={() => setFollowersToggle(!followersToggle)}>
              <p>Followers</p>
            </button>
            <p>{formatnumber(user.followers.length)}</p>
          </div>
          <div className="profile_fl">
            <button onClick={() => setFollowingToggle(!followingToggle)}>
              <p>Following</p>
            </button>
            <p>{formatnumber(user.following.length)}</p>
          </div>
          <div className="profile_pos profile_fl">
            <button>Posts</button>
            <p>{formatnumber(user.posts.length)}</p>
          </div>
        </div>

        <button
          className="settings_btn"
          onClick={() => setSettingsToggle(!settingsToggle)}
        >
          <img
            className="settings_icon"
            src="/images/settings.png"
            alt="settings"
          />
        </button>

        <p className="account_footer_txt">
          ©2023-2025 All Rights Reserved. HouseofArts® is a registered
          trademark.{" "}
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
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
      <Dialog
        open={settingsToggle}
        onClose={() => setSettingsToggle(!settingsToggle)}
      >
        <div className="settingDialogBox">
          <div className="h_txt">Profile Settings</div>
          <div className="h_login">
            Edit, update or delete your profile here.
          </div>

          <button
            className="pro_set_btn pwd_update_btn"
            onClick={updatePwdHandler}
          >
            <img className="pro_set_icon" src="/images/update.png" alt="edit" />
          </button>
          <button className="pro_set_btn pro_edit_btn" onClick={editProHandler}>
            <img className="pro_edit_icon" src="/images/edit.png" alt="edit" />
          </button>

          <button
            className="pro_set_btn logout_btn"
            onClick={() => setLogoutToggle(!logoutToggle)}
          >
            <img className="logout_icon" src="/images/logout.png" alt="edit" />
          </button>

          <button
            className="pro_set_btn pro_delete_btn"
            onClick={() => setDltProfileToggle(!dltProfileToggle)}
          >
            <svg viewBox="0 0 448 512" className="pro_delete_icon">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
          </button>
        </div>
      </Dialog>
      <Dialog
        open={followersToggle}
        onClose={() => setFollowersToggle(!followersToggle)}
      >
        <div className="LikeDialogBox">
          <div className="h_txt">Followers</div>
          <div className="h_login">See who is following you.</div>

          {user && user.followers.length > 0 ? (
            user.followers.map((follower) => (
              <User
                key={follower._id}
                userId={follower._id}
                name={follower.name}
                avatar={follower.avatar.url}
              />
            ))
          ) : (
            <p className="h_des">
              You have no followers. Follow other users to get followers.
            </p>
          )}
        </div>
      </Dialog>
      <Dialog
        open={followingToggle}
        onClose={() => setFollowingToggle(!followingToggle)}
      >
        <div className="LikeDialogBox">
          <div className="h_txt">Following</div>
          <div className="h_login">See who you are following.</div>

          {user && user.following.length > 0 ? (
            user.following.map((follow) => (
              <User
                key={follow._id}
                userId={follow._id}
                name={follow.name}
                avatar={follow.avatar.url}
              />
            ))
          ) : (
            <p className="h_des">
              You are not following anyone. Follow other users to get followers.
            </p>
          )}
        </div>
      </Dialog>
      <Dialog
        open={logoutToggle}
        onClose={() => setLogoutToggle(!logoutToggle)}
      >
        <div className="DialogBox">
          <div className="h_txt">Logout</div>
          <div className="h_login">Do you want to logout?</div>

          <div className="choice_div">
            <button onClick={logoutHandler} className="yes_btn" type="submit">
              Yes
            </button>
            <button
              onClick={() => setLogoutToggle(!logoutToggle)}
              className="no_btn"
              type="submit"
            >
              No
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={dltProfileToggle}
        onClose={() => setDltProfileToggle(!dltProfileToggle)}
      >
        <div className="DialogBox">
          <div className="h_txt">Permanently Delete Profile?</div>
          <div className="h_des">
            Do you really want to delete your profile?
          </div>

          <div className="h_login">This action is irreversible.</div>

          <div className="choice_div">
            <button
              onClick={deleteProfileHandler}
              className="yes_btn"
              type="submit"
              disabled={deleteLoading}
            >
              Yes
            </button>
            <button
              onClick={() => setDltProfileToggle(!dltProfileToggle)}
              className="no_btn"
              type="submit"
            >
              No
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Account;
