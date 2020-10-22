import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import CustomBtn from "../../util/CustomBtn";

// REDUX
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import FormStyles from "../../util/FormStyles";

const useStyles = makeStyles(FormStyles);

// COMPONENT
const EditProfile = (props) => {
  // State
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { credentials } = props;
    mapUserDetailsToState(credentials);
  }, []);

  // Material
  const classes = useStyles();

  // Handlers
  const handleOpen = () => {
    mapUserDetailsToState(props.credentials);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "bio":
        setBio(e.target.value);
        break;
      case "website":
        setWebsite(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = () => {
    const userDetails = { bio, website, location };
    props.editUserDetails(userDetails);
    handleClose();
  };

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : "");
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
  };

  // Render
  return (
    <>
      <CustomBtn
        tip="Edit Profile"
        onClick={handleOpen}
        btnClassName={classes.editBioButton}
      >
        <EditIcon color="primary" />
      </CustomBtn>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Your Profile</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="1"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={handleChange}
              fullWidth
              color="secondary"
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Share a link to your corner of the web!"
              className={classes.textField}
              value={website}
              onChange={handleChange}
              fullWidth
              color="secondary"
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where do you call home?"
              className={classes.textField}
              value={location}
              onChange={handleChange}
              fullWidth
              color="secondary"
            />
          </form>
        </DialogContent>
        <DialogActions style={{ padding: "0 25px 25px 0" }}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditProfile.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(EditProfile);
