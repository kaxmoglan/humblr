import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import CustomBtn from "../../util/CustomBtn";
import PostMurmur from "..//murmur/PostMurmur";

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
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles((theme) => ({
  navBarSVG: {
    color: theme.palette.primary.contrastText,
    outline: "none",
  },
  link: {
    outline: "none",
  },
}));

// NAVBAR
const NavBar = (props) => {
  const { authenticated } = props;
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <Link to="/" className={classes.link}>
              <CustomBtn tip="Home" btnClassName={classes.navBarSVG}>
                <HomeIcon />
              </CustomBtn>
            </Link>
            <PostMurmur />
            <CustomBtn tip="Notifications" btnClassName={classes.navBarSVG}>
              <NotificationsIcon />
            </CustomBtn>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
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
