import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import dayjs from "dayjs";

import CustomBtn from "../../util/CustomBtn";
import LikeButton from "./LikeButton";
import Comments from "./Comments";

// REDUX
import { connect, useSelector } from "react-redux";
import { getMurmur } from "../../redux/actions/dataActions";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme) => ({
  profileImg: {
    maxWidth: 170,
    height: 170,
    borderRadius: "50%",
    objectFit: "cover",
  },
  closeBtn: {
    position: "absolute",
    top: "0.1rem",
    right: "0.1rem",
    zIndex: "5",
  },
  dialogContent: {
    padding: 20,
  },
  progress: {
    position: "relative",
    left: "45%",
    marginTop: 50,
    marginBottom: 50,
  },
  seperator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  commentBtn: {
    marginLeft: "20px",
  },
  murmurInfo: {
    marginTop: "10px",
    position: "relative",
  },
  socialContainer: {
    position: "absolute",
    bottom: "0px",
    left: "-4px",
  },
  createdAt: {
    marginBottom: "13px",
  },
  noComments: {
    margin: "0 auto 10px auto",
  },
}));

// RENDER
const MurmurDialog = (props) => {
  // State
  const [open, setOpen] = useState(false);

  // Redux
  const loading = useSelector((state) => state.UI.loading);
  const {
    murmur: {
      murmurId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      username,
      comments,
    },
  } = props;

  // Material
  const classes = useStyles();

  // Handlers
  const handleOpen = () => {
    setOpen(true);
    props.getMurmur(props.murmurId);
  };
  const handleClose = () => setOpen(false);

  // Markup
  const dialogMarkup = loading ? (
    <CircularProgress className={classes.progress} size={60} />
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={4}>
        <img
          src={userImage}
          alt={`${username}'s profile picture`}
          className={classes.profileImg}
        />
      </Grid>
      <Grid item sm={8} className={classes.murmurInfo}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${username}`}
        >
          @{username}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom="true"
          color="textSecondary"
          className={classes.createdAt}
        >
          {dayjs(createdAt).format("h:mma, DD MMM YYYY")}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <div className={classes.socialContainer}>
          <LikeButton murmurId={murmurId} />
          <span>{likeCount}</span>
          <CustomBtn tip="Comments" btnClassName={classes.commentBtn}>
            <ChatIcon color="primary" />
          </CustomBtn>
          <span>{commentCount}</span>
        </div>
      </Grid>
      <hr className={classes.seperator} />
      {commentCount === 0 ? (
        <Typography variant="body2" className={classes.noComments}>
          No comments to display. Be the first to comment!
        </Typography>
      ) : (
        <Comments comments={comments} />
      )}
    </Grid>
  );

  // Render
  return (
    <>
      <CustomBtn
        onClick={handleOpen}
        tip="Expand murmur"
        tipClassName={classes.expandBtn}
      >
        <MoreHorizIcon color="primary" />
      </CustomBtn>
      <Dialog
        className={classes.newMurmur}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <CustomBtn
          tip="Close"
          onClick={handleClose}
          btnClassName={classes.closeBtn}
        >
          <CloseIcon />
        </CustomBtn>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

MurmurDialog.propTypes = {
  getMurmur: PropTypes.func.isRequired,
  murmurId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  murmur: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  murmur: state.data.murmur,
  UI: state.UI,
});

const mapActionsToProps = {
  getMurmur,
};

export default connect(mapStateToProps, mapActionsToProps)(MurmurDialog);
