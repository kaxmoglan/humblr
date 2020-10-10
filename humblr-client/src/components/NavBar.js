import React from "react";
import { Link } from "react-router-dom";

// MATERIAL UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// NAVBAR
const NavBar = () => {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
