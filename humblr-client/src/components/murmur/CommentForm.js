import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect, useSelector } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {},
  lowerForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
    marginBottom: "20px",
  },
  charCountSection: {
    display: "flex",
  },
  charCount: {
    width: "35px",
    textAlign: "left",
  },
}));

const CommentForm = (props) => {
  // State
  const [body, setBody] = useState("");
  const [bodyCount, setBodyCount] = useState(0);

  useEffect(() => {
    setBodyCount(body.length);
  }, [body]);

  // Redux
  const { authenticated, murmurId } = props;
  let errors = useSelector((state) => state.UI.errors);

  // Material
  const classes = useStyles();

  // Handlers
  const handleChange = (e) => setBody(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitComment(murmurId, { body });
    setBody("");
  };

  // Render
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on murmur"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <div className={classes.lowerForm}>
          <div className={classes.charCountSection}>
            <Typography
              variant="body1"
              color={bodyCount > 100 ? "error" : "textPrimary"}
              className={classes.charCount}
            >
              {bodyCount > 0 ? bodyCount : ""}
            </Typography>
            <CircularProgress
              variant="static"
              value={bodyCount > 100 ? 100 : bodyCount}
              size={20}
              color={bodyCount > 100 ? "secondary" : "primary"}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={bodyCount > 100 ? true : false}
          >
            Comment
          </Button>
        </div>
      </form>
    </Grid>
  ) : null;

  return commentFormMarkup;
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  murmurId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { submitComment })(CommentForm);
