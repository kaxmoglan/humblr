import React from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

import EditProfile from "./EditProfile";
import CustomBtn from "../../util/CustomBtn";
import ProfileSkeleton from "../../util/ProfileSkeleton";

// REDUX
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// Icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 10,
    boxShadow: "none",
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
  websiteLink: {
    wordWrap: "break-word",

    transition: "all 250ms ease",
    position: "relative",
    left: "-4px",
    padding: "6px 6px 6px 2px",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
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
    marginBottom: 30,
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
    formData.append("image", image, image.name);
    props.uploadImage(formData);
  };

  const handleEditPicture = () => {
    const imageUpload = document.querySelector("#image-upload");
    imageUpload.click();
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  // Render
  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="Profile" className="profile-image" />
            <input
              type="file"
              name="image-upload"
              id="image-upload"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <CustomBtn
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <AddAPhotoIcon color="primary" />
            </CustomBtn>
          </div>
          <hr />
          <div className="profile-details">
            <Typography
              component={Link}
              to={`/users/${username}`}
              color="primary"
              variant="h5"
              className={classes.username}
            >
              @{username}
            </Typography>
            <hr />
            {bio && (
              <Typography
                style={{ marginBottom: 20, marginTop: 20 }}
                variant="body1"
              >
                {bio}
              </Typography>
            )}
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
          <CustomBtn tip="Log Out" onClick={handleLogout}>
            <KeyboardReturnIcon color="primary" />
          </CustomBtn>
          <EditProfile />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center">
          Welcome to Humblr.
        </Typography>
        <div className={classes.buttons}>
          <Button
            // variant="contained"
            color="primary"
            component={Link}
            to="/login"
            style={{ boxShadow: "none" }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
            style={{ boxShadow: "none" }}
          >
            Sign Up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );

  return profileMarkup;
};

const mapActionsToProps = { logoutUser, uploadImage };

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(Profile);
