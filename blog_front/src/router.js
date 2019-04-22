import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Main from "./components/main";
import Home from "./components/home";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Route path="/" exact component={Main} /> */}
          <Route path="/main"  component={Main} />
          <Route path="/main/home" component={Home} />
          <Route path="/login/" component={Login} />
          <Route path="/register/" component={Register} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;
