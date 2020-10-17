import React, { useState } from "react";
import PropTypes from "prop-types";

import CustomBtn from "../util/CustomBtn";

import { connect } from "react-redux";
import { deleteMurmur } from "../redux/actions/dataActions";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// Icons
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles({
  deleteBtn: {
    position: "absolute",
    right: "1rem",
  },
});

const DeleteMurmur = (props) => {
  // State
  const [open, setOpen] = useState(false);

  // Material
  const classes = useStyles();

  // Handlers
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    props.deleteMurmur(props.murmurId);
    setOpen(false);
  };

  return (
    <>
      <CustomBtn
        tip="Delete Murmur"
        onClick={handleOpen}
        btnClassName={classes.deleteBtn}
      >
        <DeleteOutlineIcon color="secondary" />
      </CustomBtn>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this Murmur?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete Murmur
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteMurmur.propTypes = {
  deleteMurmur: PropTypes.func.isRequired,
  murmurId: PropTypes.string.isRequired,
};

export default connect(null, { deleteMurmur })(DeleteMurmur);
