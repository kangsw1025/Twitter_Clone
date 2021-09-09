import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "../routes/Navigation";
import Profile from "../routes/Profile";
import NickName from "../routes/NickName";

export default ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && userObj.displayName && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          userObj.displayName ? (
            <>
              <Route path="/" exact>
                <Home userObj={userObj} />
              </Route>
              <Route path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
            </>
          ) : (
            <Route path="/">
              <NickName userObj={userObj} refreshUser={refreshUser} />
            </Route>
          )
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
