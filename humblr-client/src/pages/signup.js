import React, { useState } from "react";
import AppLogo from "../images/logo.png";
import { Link } from "react-router-dom";
import FormStyles from "../util/FormStyles";

// REDUX
import { connect, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(FormStyles);

// COMPONENT
const Signup = (props) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  // Redux
  const loading = useSelector((state) => state.UI.loading);
  let errors = useSelector((state) => state.UI.errors);
  if (errors.errors) {
    errors = errors.errors;
  }

  // Material
  const classes = useStyles();

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = { email, password, confirmPassword, username };
    props.signupUser(newUserData, props.history);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  // Return
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppLogo} alt="Humblr Icon" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            error={errors.email ? true : false}
            helperText={errors.email}
            value={email}
            onChange={handleEmail}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            error={errors.password ? true : false}
            helperText={errors.password}
            value={password}
            onChange={handlePassword}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword}
            value={confirmPassword}
            onChange={handleConfirmPassword}
            fullWidth
          />
          <TextField
            id="username"
            name="username"
            type="text"
            label="Username"
            className={classes.textField}
            error={errors.username ? true : false}
            helperText={errors.username}
            value={username}
            onChange={handleUsername}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Sign Up
            {loading && (
              <CircularProgress
                size={30}
                className={classes.progress}
                color="secondary"
              />
            )}
          </Button>
          <br />
          <Typography variant="caption">
            Already have an account?{" "}
            <Link className={classes.signUp} to="/login">
              Login here!
            </Link>
          </Typography>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(Signup);
