import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import dayjs from "dayjs";

// MATERIAL
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// Icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  websiteLink: {
    wordWrap: "break-word",
  },
}));

const StaticProfile = (props) => {
  const {
    profile: { username, createdAt, imageUrl, bio, website, location },
  } = props;

  // Material
  const classes = useStyles();

  // Render
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="Profile Picture" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${username}`}
            color="primary"
            variant="h5"
          >
            @{username}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body1">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOnIcon color="primary" />{" "}
              <Typography variant="caption">{location}</Typography>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a
                className={classes.websiteLink}
                href={website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {"  "}
                <Typography variant="caption">{website}</Typography>
              </a>
              <hr />
            </>
          )}
          <CalendarTodayIcon color="primary" />
          {"  "}
          <Typography variant="caption">
            Joined {dayjs(createdAt).format("MMM YYYY")}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default StaticProfile;
