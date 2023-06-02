import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Post";
import {
  getFollowingPosts,
  getMyPosts,
  getUserPosts,
} from "../../Actions/User";
import { Avatar } from "@mui/material";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
      dispatch(getUserPosts(userId));
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <Avatar
          src={avatar}
          sx={{
            height: "3vmax",
            width: "3vmax",
            border: "1px solid lightgray",
          }}
        />
        <p className="user_name">{name}</p>
      </Link>
      <p className="comment_txt">{comment}</p>

      {isAccount ? (
        <button className="comment_dlt_btn" onClick={deleteCommentHandle}>
          <img src="/images/delete.png" alt="delete" />
        </button>
      ) : userId === user._id ? (
        <button className="comment_dlt_btn" onClick={deleteCommentHandle}>
          <img src="/images/delete.png" alt="delete" />
        </button>
      ) : null}
    </div>
  );
};

export default CommentCard;
