import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Twit from "../components/Twit";
import TwitFactory from "../components/TwitFactory";

function Home({ userObj }) {
  const [twits, setTwits] = useState([]);

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

  return (
    <div>
      <TwitFactory userObj={userObj} />
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
