import React, { useState } from "react";
import AppLogo from "../images/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";

// Material
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  form: {
    textAlign: "center",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  image: {
    width: 75,
    margin: "20px auto 20px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
  signUp: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      email: email,
      password: password,
    };
    axios
      .post("/login", userData)
      .then((res) => {
        setLoading(false);
        props.history.push("/");
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response.data.general) {
          setErrors(err.response.data);
        }
        setLoading(false);
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

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

export default Login;
