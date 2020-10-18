import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import dayjs from "dayjs";

import CustomBtn from "../util/CustomBtn";

// REDUX
import { connect, useSelector } from "react-redux";
import { getMurmur } from "../redux/actions/dataActions";

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

const useStyles = makeStyles((theme) => ({
  seperator: {
    border: "none",
    margin: 4,
  },
  profileImg: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  closeBtn: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
  },
  dialogContent: {
    padding: 20,
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
    <CircularProgress size={100} />
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img
          src={userImage}
          alt={`${username}'s profile picture`}
          className={classes.profileImg}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${username}`}
        >
          @{username}
        </Typography>
        <hr className={classes.seperator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.seperator} />
        <Typography variant="body1">{body}</Typography>
      </Grid>
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
