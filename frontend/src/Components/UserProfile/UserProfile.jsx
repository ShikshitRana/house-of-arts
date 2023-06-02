import React, { useEffect, useState } from "react";

import { Avatar, Button, Dialog} from "@mui/material";
import { useAlert } from "react-alert";
import { useParams, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/User";

import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);

  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const params = useParams();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, followError, userError, dispatch]);

  if (myProfile) {
    return loading === true || userLoading === true ? (
      <Loader />
    ) : (
      <Navigate to="/account" replace />
    );
  }

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
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
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <>
            <p className="h_txt">No posts yet</p>
            <p className="h_login">
              When this user posts something, it will appear here.
            </p>
          </>
        )}
      </div>

      <div className="account_right">
        {user && (
          <>
            <div className="profile_personal">
              <Avatar
                src={user.avatar.url}
                sx={{
                  height: "10vmax",
                  width: "10vmax",
                  border: "2px solid lightgray",
                }}
              />

              <p className="userName">
                {user.name}
                <span className="h_des">
                  {following ? "following" : "\u3000"}
                </span>
              </p>
            </div>{" "}
            <div className="profile_details">
              <div className="profile_fl">
                <button onClick={() => setFollowersToggle(!followersToggle)}>
                  <p>Followers</p>
                </button>
                <p>{user.followers.length}</p>
              </div>

              <div className="profile_fl">
                <button onClick={() => setFollowingToggle(!followingToggle)}>
                  <p>Following</p>
                </button>
                <p>{user.following.length}</p>
              </div>

              <div className="profile_pos profile_fl">
                <button>Posts</button>
                <p>{user.posts.length}</p>
              </div>
            </div>
            <Button
              variant="contained"
              style={{
                color: following ? "red" : "green",
                backgroundColor: "white",
                boxShadow: "none",
                width: "fit-content",
                margin: "5vmax 0",
                "@media (maxWidth: 600px)": {
                  margin: "5vmax 0 5vmax 15vmax",
                },
              }}
              onClick={followHandler}
              disabled={followLoading}
            >
              {following ? (
                <p className="fl_ufl_btn">Unfollow</p>
              ) : (
                <p className="fl_ufl_btn">Follow</p>
              )}
            </Button>
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
          </>
        )}
      </div>

      <Dialog
        open={followersToggle}
        onClose={() => setFollowersToggle(!followersToggle)}
      >
        <div className="LikeDialogBox">
          <div className="h_txt">Followers</div>
          <div className="h_login">These people follow this user.</div>

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
            <p className="h_des">This user doesn't have any followers yet.</p>
          )}
        </div>
      </Dialog>

      <Dialog
        open={followingToggle}
        onClose={() => setFollowingToggle(!followingToggle)}
      >
        <div className="LikeDialogBox">
          <div className="h_txt">Following</div>
          <div className="h_login">See who this user is following.</div>

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
            <p className="h_des">This user isn't following anyone yet.</p>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default UserProfile;
