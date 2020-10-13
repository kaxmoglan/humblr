import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ThemeFile from "./util/Theme";

// COMPONENTS
import NavBar from "./components/NavBar";

// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// CUSTOM MATERIAL THEME
const theme = createMuiTheme(ThemeFile);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/signup" component={Signup}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
