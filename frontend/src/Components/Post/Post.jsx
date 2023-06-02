import "./Post.css";
import React, { useEffect, useState } from "react";

import { Avatar, Dialog } from "@mui/material";
import RelativeTime from "@yaireo/relative-time";
import { useAlert } from "react-alert";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import {
  getFollowingPosts,
  getMyPosts,
  loadUser,
  getUserPosts,
} from "../../Actions/User";

import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  createdAt,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const alert = useAlert();

  const dispatch = useDispatch();
  const relativeTime = new RelativeTime();
  const { user } = useSelector((state) => state.user);

  const handleLike = async () => {
    setLiked(!liked);

    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
      dispatch(getUserPosts(ownerId));
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
      dispatch(getUserPosts(ownerId));
    }
  };

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    alert.show("Please wait, we are deleting your post.");
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
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
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <img className="post_img" src={postImage} alt="Post" />

      <div className="post_details">
        <div className="postHeader">
          <Link to={`/user/${ownerId}`}>
            <Avatar
              src={ownerImage}
              alt="User"
              sx={{
                height: "3vmax",
                width: "3vmax",
                border: "0.5px solid lightgray",
              }}
            />

            <div className="post_owner">
              <p className="post_owner_name">{ownerName}</p>
              <p className="post_time">
                {relativeTime.from(new Date(createdAt))}
              </p>
            </div>
          </Link>
        </div>

        <p className="post_caption">{caption}</p>

        <div className="postFooter">
          <div className="like_btn">
            <input type="checkbox" id="checkbox" checked={liked} readOnly />
            <label onClick={handleLike} htmlFor="checkbox">
              <svg
                id="heart-svg"
                viewBox="467 392 58 57"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Group"
                  fill="none"
                  fillRule="evenodd"
                  transform="translate(467 392)"
                >
                  <path
                    d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                    id="heart"
                    fill="#AAB8C2"
                  />
                  <circle
                    id="main-circ"
                    fill="#E2264D"
                    opacity="0"
                    cx="29.5"
                    cy="29.5"
                    r="1.5"
                  />

                  <g id="grp7" opacity="0" transform="translate(7 6)">
                    <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                    <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                  </g>

                  <g id="grp6" opacity="0" transform="translate(0 28)">
                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                    <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                  </g>

                  <g id="grp3" opacity="0" transform="translate(52 28)">
                    <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                    <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                  </g>

                  <g id="grp2" opacity="0" transform="translate(44 6)">
                    <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp5" opacity="0" transform="translate(14 50)">
                    <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                    <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp4" opacity="0" transform="translate(35 50)">
                    <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                    <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp1" opacity="0" transform="translate(24)">
                    <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                    <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                  </g>
                </g>
              </svg>
            </label>
          </div>

          <button
            className="post_likes"
            onClick={() => setLikesUser(!likesUser)}
            disabled={likes.length === 0 ? true : false}
          >
            {formatnumber(likes.length)}{" "}
            {likes.length < 100
              ? likes.length === 1
                ? " like"
                : " likes"
              : null}
          </button>

          <button
            className="comments_btn"
            onClick={() => setCommentToggle(!commentToggle)}
          >
            <img
              className="comments_icon"
              src="/images/comments.png"
              alt="comments"
            />
          </button>

          <button
            className="post_comments"
            onClick={() => setCommentToggle(!commentToggle)}
          >
            {formatnumber(comments.length)}
            {comments.length < 100
              ? comments.length === 1
                ? " comment"
                : " comments"
              : null}
          </button>
        </div>

        {isAccount ? (
          <div className="edit_post">
            <button
              className="edit_btn"
              onClick={() => setCaptionToggle(!captionToggle)}
            >
              edit
            </button>
            <button
              onClick={() => setDeleteToggle(!deleteToggle)}
              className="dlt_btn"
            >
              delete
            </button>
          </div>
        ) : null}
      </div>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="LikeDialogBox">
          <div className="h_txt">Liked By</div>{" "}
          <div className="h_login">
            This post is liked by the following users.
          </div>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <div className="h_txt">Comments</div>
          <div className="h_login">
            Type below to add your comment. If you have commented before, your
            previous comment will be updated with the latest comment.
          </div>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              placeholder="Comment Here"
              className="registerInputs"
              onChange={(e) => setCommentValue(e.target.value)}
              required
            />
            <button className="sbt_btn" type="submit">
              Add Comment
            </button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <p className="h_login">No comments Yet</p>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <div className="h_txt">Update Caption</div>
          <div className="h_login">Type below to update your caption.</div>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here"
              className="registerInputs"
              autoFocus={true}
              required
            />

            <button className="sbt_btn" type="submit">
              Update
            </button>
          </form>
        </div>
      </Dialog>

      <Dialog
        open={deleteToggle}
        onClose={() => setDeleteToggle(!deleteToggle)}
      >
        <div className="DialogBox">
          <div className="h_txt">Delete Post</div>
          <div className="h_login">Do you want to delete this post?</div>

          <div className="choice_div">
            <button
              onClick={deletePostHandler}
              className="yes_btn"
              type="submit"
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteToggle(!deleteToggle)}
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

export default Post;
