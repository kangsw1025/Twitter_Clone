import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../fbase";
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Twit({ twitObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTwit, setNewTwit] = useState(twitObj.twit);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete this twit?");
    console.log(twitObj);
    if (ok) {
      await deleteDoc(doc(dbService, "twits", `${twitObj.id}`));
      await deleteObject(ref(storageService, twitObj.attachmentUrl));
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
    <div className="twit">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container twitEdit">
            {twitObj.attachmentUrl && <img src={twitObj.attachmentUrl} />}
            <input
              type="text"
              placeholder="Edit your twit"
              value={newTwit}
              onChange={onChange}
              autoFocus
              required
              className="formInput"
            />
            <input type="submit" value="Update Twit" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{twitObj.twit}</h4>
          {twitObj.attachmentUrl && <img src={twitObj.attachmentUrl} />}
          {isOwner && (
            <div className="twit_actions">
              <button onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Twit;
