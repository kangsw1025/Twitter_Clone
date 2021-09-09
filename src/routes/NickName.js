import { updateProfile } from "firebase/auth";
import React, { useState } from "react";

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
    <form onSubmit={onSubmit}>
      <div>Write nickname which you want</div>
      <input
        type="text"
        placeholder="Write Your Nickname"
        onChange={onChange}
        value={nickname}
      />
      <input type="button" value="생성" />
    </form>
  );
}

export default NickName;
