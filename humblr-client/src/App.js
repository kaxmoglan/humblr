import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// COMPONENTS
import NavBar from "./components/NavBar";

// PAGES
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home}></Route>
            <Route exact path="/login" component={login}></Route>
            <Route exact path="/signup" component={signup}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
