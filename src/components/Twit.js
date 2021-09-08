import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../fbase";
import { ref, deleteObject } from "firebase/storage";

function Twit({ twitObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTwit, setNewTwit] = useState(twitObj.twit);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete this twit?");
    console.log(twitObj);
    if (ok) {
      await deleteDoc(doc(dbService, "twits", `${twitObj.id}`));
    }
  };

  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async e => {
    e.preventDefault();
    await updateDoc(doc(dbService, "twits", `${twitObj.id}`), {
      twit: newTwit,
    });
    toggleEditing();
  };
  const onChange = e => {
    setNewTwit(e.target.value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your twit"
              value={newTwit}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Twit" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{twitObj.twit}</h4>

          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Twit</button>
              <button onClick={toggleEditing}>Edit Twit</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Twit;
