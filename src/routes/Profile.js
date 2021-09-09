import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { authService } from "../fbase";
import "../css/profile.css";

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
    <div className="container">
      {update ? (
        <form onSubmit={onSubmit} className="profileForm">
          <input
            type="text"
            autoFocus
            placeholder="Display Name"
            value={newDisplayName}
            onChange={onChange}
            minLength="2"
            className="formInput"
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            stype={{ marginTop: 10 }}
          />
        </form>
      ) : (
        <input
          type="button"
          className="formBtn"
          onClick={toggleUpdate}
          value="Modify Profile"
        />
      )}
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        LogOut
      </span>
    </div>
  );
}

export default Profile;
