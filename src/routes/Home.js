import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Twit from "../components/Twit";

function Home({ userObj }) {
  const [twits, setTwits] = useState([]);
  const [twit, setTwit] = useState("");

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

    const twitObj = {
      twit,
      createdAt: Date.now(),
      userId: userObj.uid,
    };
    try {
      const docRef = await addDoc(collection(dbService, "twits"), twitObj);
      setTwit("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding documnet: ", e);
    }
  };

  const onChange = e => {
    setTwit(e.target.value);
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
          <input type="submit" value="Twit" />
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
