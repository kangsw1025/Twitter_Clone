import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function TwitFactory({ userObj }) {
  const [twit, setTwit] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

  const onSubmit = async e => {
    if (twit === "" && attachment === "") return;

    e.preventDefault();

    let attachmentUrl = "";

    if (attachment) {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(fileRef);
    }

    const twitObj = {
      twit,
      createdAt: Date.now(),
      userId: userObj.uid,
      attachmentUrl,
    };
    try {
      const docRef = await addDoc(collection(dbService, "twits"), twitObj);
      setTwit("");
      setAttachment("");
      fileInput.current.value = "";
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding documnet: ", e);
    }
  };

  const onChange = e => {
    setTwit(e.target.value);
  };

  const onFileChange = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = finishedEvent => {
        setAttachment(finishedEvent.currentTarget.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onClearAttachment = () => {
    fileInput.current.value = "";
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput_container">
        <input
          type="text"
          className="factoryInput_input"
          placeholder="What's on your mind?"
          value={twit}
          onChange={onChange}
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput_arrow" />
      </div>
      <label for="attach-file" className="factoryInput_label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={onFileChange}
        style={{ opacity: 0 }}
      />
      {attachment && (
        <div className="factoryForm_attachment">
          <img
            src={attachment}
            width="30%"
            style={{ backgroundImage: attachment }}
          />
          <div className="factoryForm_clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
}

export default TwitFactory;
