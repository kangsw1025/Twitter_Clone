import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [userObj]);

  return (
    <>
      {init ? (
        <Router isLoggedIn={userObj} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
