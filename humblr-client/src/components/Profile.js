import React from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

// REDUX
import { connect } from "react-redux";
import { logoutUser, uploadImage } from '../redux/actions/userActions';

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import { IconButton, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
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
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
}));

const Profile = (props) => {
  // Material
  const classes = useStyles();

  // Redux
  const {
    user: {
      credentials: { username, createdAt, imageUrl, bio, website, location },
      loading,
      authenticated,
    },
  } = props;

  // Handlers
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    // send to server
    const formData = new FormData();
    formData.append('image', image, image.name);
    props.uploadImage(formData);
  }

  const handleEditPicture = () => {
    const imageUpload = document.querySelector('#image-upload');
    imageUpload.click();
  }

  // Render
  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img
              src={imageUrl}
              alt="Profile Picture"
              className="profile-image"
            />
            <input type="file" name="image-upload" id="image-upload" hidden="hidden" onChange={handleImageChange}/>
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton onClick={handleEditPicture} className="button">
                <EditIcon color="primary"/>
              </IconButton>
            </Tooltip>
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
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOnIcon color="primary" /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {"  "}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarTodayIcon color="primary" />
            {"  "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  );

  return profileMarkup;
};

const mapActionsToProps = {logoutUser, uploadImage};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(Profile);
