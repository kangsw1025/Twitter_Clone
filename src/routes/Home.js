import React, { useRef, useEffect, useState } from "react";
import { dbService, storageService } from "../fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Twit from "../components/Twit";
import { v4 as uuidv4 } from "uuid";

function Home({ userObj }) {
  const [twits, setTwits] = useState([]);
  const [twit, setTwit] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

  useEffect(() => {
    const q = query(collection(dbService, "twits"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const newArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTwits(newArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmit = async e => {
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
    <div>
      <>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={twit}
            onChange={onChange}
            maxLength={120}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={onFileChange}
          />
          <input type="submit" value="Twit" />
          {attachment && (
            <div>
              <img src={attachment} width="30%" />
              <button onClick={onClearAttachment}>Clear</button>
            </div>
          )}
        </form>
      </>
      <div>
        {twits.map(twit => (
          <Twit
            key={twit.id}
            twitObj={twit}
            isOwner={twit.userId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
