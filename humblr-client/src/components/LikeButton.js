import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import CustomBtn from "../util/CustomBtn";

// REDUX
import { connect } from "react-redux";
import { likeMurmur, unlikeMurmur } from "../redux/actions/dataActions";

// MATERIAL
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const LikeButton = (props) => {
  // Redux
  const {
    user: { authenticated },
  } = props;

  // Handlers
  const likedMurmur = () => {
    if (
      props.user.likes &&
      props.user.likes.find((like) => like.murmurId === props.murmurId)
    ) {
      return true;
    } else return false;
  };
  const likeMurmur = () => {
    props.likeMurmur(props.murmurId);
  };
  const unlikeMurmur = () => {
    props.unlikeMurmur(props.murmurId);
  };

  const likeBtn = !authenticated ? (
    <Link to="/login">
      <CustomBtn tip="Like">
        <FavoriteBorderIcon color="primary" />
      </CustomBtn>
    </Link>
  ) : likedMurmur() ? (
    <CustomBtn tip="Unlike" onClick={unlikeMurmur}>
      <FavoriteIcon color="primary" />
    </CustomBtn>
  ) : (
    <CustomBtn tip="Like" onClick={likeMurmur}>
      <FavoriteBorderIcon color="primary" />
    </CustomBtn>
  );

  return likeBtn;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  murmurId: PropTypes.string.isRequired,
  likeMurmur: PropTypes.func.isRequired,
  unlikeMurmur: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeMurmur,
  unlikeMurmur,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
