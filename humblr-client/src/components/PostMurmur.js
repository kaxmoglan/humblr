import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import CustomBtn from "../util/CustomBtn";

// REDUX
import { connect, useSelector } from "react-redux";
import { postMurmur, clearErrors } from "../redux/actions/dataActions";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
  },
  submitBtn: {
    position: "relative",
  },
  progressSpinner: {
    position: "absolute",
  },
  newMurmur: {
    position: "relative",
  },
  navBarSVG: {
    color: theme.palette.primary.contrastText,
    outline: false,
  },
  textField: {
    marginBottom: "1rem",
  },
  submitBtn: {
    marginBottom: "1rem",
    position: "relative",
    float: "right",
  },
}));

// COMPONENT
const PostMurmur = (props) => {
  // State
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  // Redux
  const loading = useSelector((state) => state.UI.loading);
  let errors = useSelector((state) => state.UI.errors);

  // Material
  const classes = useStyles();

  // Handlers
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setContent("");
    props.clearErrors();
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.postMurmur({ body: content });
  };

  // Close post murmur window on successful post
  useEffect(() => {
    if (!loading && !errors.error) {
      handleClose();
    }
  }, [loading]);

  // RENDER
  return (
    <>
      <CustomBtn
        onClick={handleOpen}
        tip="New Murmur"
        btnClassName={classes.navBarSVG}
      >
        <AddIcon />
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
        <DialogTitle>Post a new Murmur</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="body"
              type="text"
              label="Share something interesting..."
              multiline
              rows="2"
              error={errors.error ? true : false}
              helperText={errors.error}
              className={classes.textField}
              onChange={handleChange}
              value={content}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              disabled={loading}
              onClick={handleSubmit}
            >
              Post
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

PostMurmur.propTypes = {
  postMurmur: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postMurmur, clearErrors })(
  PostMurmur
);
