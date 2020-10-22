import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import CustomBtn from "../../util/CustomBtn";
import PostMurmur from "..//murmur/PostMurmur";
import Notifications from "./Notifications";
import Info from "./Info";

import logo from "../../images/Icon.png";

// REDUX
import { connect } from "react-redux";

// MATERIAL UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  navBarSVG: {
    color: theme.palette.primary.main,
    outline: "none",
  },
  link: {
    outline: "none",
  },
  navBar: {
    width: "100%",
    margin: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingLeft: 0,
  },
  logo: {
    width: 40,
    maxHeight: "100%",
    position: "absolute",
    left: "1rem",
  },
}));

// NAVBAR
const NavBar = (props) => {
  const { authenticated } = props;
  const classes = useStyles();

  return (
    <AppBar color="#fff">
      <Toolbar className={classes.navBar}>
        {authenticated ? (
          <>
            <img src={logo} className={classes.logo} />
            <Link to="/" className={classes.link}>
              <CustomBtn tip="Home" btnClassName={classes.navBarSVG}>
                <HomeIcon />
              </CustomBtn>
            </Link>
            <PostMurmur />
            <Notifications />
            <Info />
          </>
        ) : (
          <>
            <img src={logo} className={classes.logo} />
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
            <Info />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(NavBar);
