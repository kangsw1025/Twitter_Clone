import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "../routes/Navigation";
import Profile from "../routes/Profile";

export default ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route>
              <Auth exact path="/" />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};
