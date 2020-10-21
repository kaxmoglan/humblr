import React, { useState } from "react";

import PropTypes from "prop-types";

import CustomBtn from "../../util/CustomBtn";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
  },
  infoBtn: {
    color: theme.palette.primary.contrastText,
    outline: "none",
    position: "absolute",
    right: "3.5rem",
  },
}));

// COMPONENT
const Info = (props) => {
  // State
  const [open, setOpen] = useState(false);

  // Material
  const classes = useStyles();

  // Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // RENDER
  return (
    <>
      <CustomBtn
        onClick={handleOpen}
        tip="About"
        btnClassName={classes.infoBtn}
      >
        <InfoIcon />
      </CustomBtn>
      <Dialog
        className={classes.newMurmur}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <CustomBtn
          tip="Close"
          onClick={handleClose}
          btnClassName={classes.closeBtn}
        >
          <CloseIcon />
        </CustomBtn>
        <DialogContent style={{ padding: 50 }}>
          <Typography variant="h2" style={{ marginBottom: 20 }}>
            About Humblr
          </Typography>
          <Typography variant="body1" style={{ marginBottom: 10 }}>
            Welcome to Humblr, a full stack social media app built with
            React.js, Redux, and Material-UI on the front end and Express.js,
            Firebase and Node.js in the back.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: 10 }}>
            The concept of Humblr is to encourage its users to share interesting
            things and achievements. Examples might include a thought-provoking
            article, a great book you’ve just finished or film you watched, a
            thought-provoking piece of artwork or your dream web-developer job
            acceptance letter.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: 10 }}>
            Examples of discouraged posts include pictures of your dinner and
            club-bathroom selfies.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: 10 }}>
            In a world so full of celebrity and materialism, we hope our users
            will enjoy contributing to the internet murmur by starting great
            conversations, challenging opinions and sharing new discoveries, and
            maybe making social media a Humblr place in the process.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Info;
