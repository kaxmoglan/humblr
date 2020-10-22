import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import DeleteMurmur from "./DeleteMurmur";
import MurmurDialog from "./MurmurDialog";
import LikeButton from "./LikeButton";

import { connect, useSelector } from "react-redux";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 10,
    position: "relative",
    alignItems: "center",
    boxShadow: "none",
    border: "1px solid rgba(0,0,0,0.5)",
    borderRadius: 10,
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
  username: {
    transition: "all 250ms ease",
    position: "relative",
    left: "-6px",
    padding: 6,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
  },
});

const Murmur = (props) => {
  // Props
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

  // Redux State
  const reduxMurmur = useSelector((state) =>
    state.data.murmurs.filter((murmur) => murmur.murmurId === murmurId)
  );

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
          className={classes.username}
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
          <MurmurDialog
            murmurId={murmurId}
            username={username}
            openDialog={props.openDialog}
          />
          <span>{reduxMurmur[0].commentCount}</span>
        </div>
        {deleteBtn}
      </CardContent>
    </Card>
  );
};

Murmur.propTypes = {
  user: PropTypes.object.isRequired,
  murmur: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Murmur);
