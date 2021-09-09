import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import "../css/profile.css";

function NickName({ userObj, refreshUser }) {
  const [nickname, setNickname] = useState("");

  const onChange = e => {
    setNickname(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await updateProfile(userObj, {
      displayName: nickname,
    });
    refreshUser();
  };

  return (
    <form onSubmit={onSubmit} className="profileForm">
      <input
        type="text"
        autoFocus
        placeholder="Display Name"
        value={nickname}
        onChange={onChange}
        minLength="2"
        className="formInput"
      />
      <input
        type="submit"
        value="Make profile"
        className="formBtn"
        stype={{ marginTop: 10 }}
      />
    </form>
  );
}

export default NickName;
