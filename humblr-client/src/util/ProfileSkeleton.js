import React from "react";
import PropTypes from "prop-types";

import profilePic from "../images/default_profile.png";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

// Icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,0.2)",
      marginBottom: 10,
    },
  },
  fullLine: {
    height: 22,
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.3)",
    margin: "0px auto 5px auto",
  },
  username: {
    height: 30,
    width: "30%",
    backgroundColor: theme.palette.primary.main,
    margin: "0 auto 12px auto",
  },
  iconArea: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  seperator: {
    border: "none",
    marginBottom: 30,
  },
}));

const ProfileSkeleton = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <div className="profile-image" />
        </div>

        <div className="profile-details">
          <div className={classes.username} />

          <div className={classes.fullLine} />

          <div className={classes.iconArea}>
            <LocationOnIcon color="primary" className={classes.icon} />
            <Typography variant="caption">Location</Typography>
          </div>

          <div className={classes.iconArea}>
            <LinkIcon color="primary" className={classes.icon} />
            <Typography variant="caption">www.mywebsite.com</Typography>
          </div>
          <div className={classes.iconArea}>
            <>
              <CalendarTodayIcon color="primary" className={classes.icon} />
              <Typography variant="caption">Joined yesterday</Typography>
            </>
          </div>
          <hr className={classes.seperator} />
        </div>
      </div>
    </Paper>
  );
};

export default ProfileSkeleton;
