import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { authService } from "../fbase";

function Profile({ userObj, refreshUser }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [update, setUpdate] = useState(false);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = e => {
    setNewDisplayName(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
    toggleUpdate();
  };

  const toggleUpdate = () => {
    setUpdate(update => !update);
  };

  return (
    <>
      {update ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            value={newDisplayName}
            onChange={onChange}
            minLength="2"
          />
          <input type="submit" value="Update Profile" />
        </form>
      ) : (
        <input type="button" onClick={toggleUpdate} value="Update Profile" />
      )}
      <button onClick={onLogOutClick}>LogOut</button>
    </>
  );
}

export default Profile;
