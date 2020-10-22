import React, { useState } from "react";
import AppLogo from "../images/logo.png";
import { Link } from "react-router-dom";
import FormStyles from "../util/FormStyles";

// REDUX
import { connect, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

// MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(FormStyles);

// COMPONENT
const Login = (props) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const userData = { email, password };
    props.loginUser(userData, props.history);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Return
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppLogo} alt="Humblr Icon" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            color="secondary"
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
            color="secondary"
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <Typography variant="caption">
            Don't have an account?{" "}
            <Link className={classes.signUp} to="/signup">
              Sign up here!
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

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
