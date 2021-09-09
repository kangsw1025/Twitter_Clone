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

  const refreshUser = () => {
    const updatedUserObj = authService.currentUser;
    setUserObj({
      ...userObj,
      userObj: {
        displayName: updatedUserObj.displayName,
        photoURL: updatedUserObj.photoURL,
      },
    });
  };

  return (
    <>
      {init ? (
        <Router
          isLoggedIn={userObj}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
