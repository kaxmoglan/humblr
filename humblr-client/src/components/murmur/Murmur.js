import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import CustomBtn from "../../util/CustomBtn";
import DeleteMurmur from "./DeleteMurmur";
import MurmurDialog from "./MurmurDialog";
import LikeButton from "./LikeButton";

import { connect } from "react-redux";

// MATERIAL STUFF
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
    alignItems: "center",
  },
  cardContent: {
    padding: 25,
  },
  cardImage: {
    maxWidth: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: "50%",
    marginLeft: "25px",
  },
  commentBtn: {
    marginLeft: "0.5rem",
  },
  likeComment: {
    display: "inline-block",
    marginLeft: "-12px",
  },
});

const Murmur = (props) => {
  // Redux
  const {
    murmur: {
      body,
      createdAt,
      userImage,
      username,
      murmurId,
      likeCount,
      commentCount,
    },
    user: { authenticated, credentials },
  } = props;

  const classes = useStyles();

  // Conditional render components
  const deleteBtn =
    authenticated && credentials.username === username ? (
      <DeleteMurmur murmurId={murmurId} />
    ) : null;

  // DAYJS
  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        image={userImage}
        title="Profile image"
        className={classes.cardImage}
      ></CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${username}`}
          color="primary"
        >
          {username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <div className={classes.likeComment}>
          <LikeButton murmurId={murmurId} />
          <span>{likeCount}</span>
          {/* <CustomBtn tip="Comments" btnClassName={classes.commentBtn}>
            <ChatIcon color="primary" />
          </CustomBtn>
          <span>{commentCount}</span> */}
          <MurmurDialog murmurId={murmurId} username={username} />
          <span>{commentCount}</span>
        </div>
        {deleteBtn}
      </CardContent>
    </Card>
  );
};

Murmur.propTypes = {
  user: PropTypes.object.isRequired,
  murmur: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Murmur);
