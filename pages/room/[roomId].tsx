import React, { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { styled } from "../../providers/theme";
import { db } from "../../lib/firebase";

interface Room {
  host: string;
  counter: number;
}

const P = styled.p``;

const RoomPage: FunctionComponent = () => {
  const [room, setRoom] = useState<Room>();
  const router = useRouter();
  const roomId = router.query.roomId as string;

  const observeRoom = (id: string, cb: (data: Room) => void) => {
    db.collection("rooms")
      .doc(id)
      .onSnapshot(
        (roomSnapshot) => {
          if (roomSnapshot.exists) return cb(roomSnapshot.data() as Room);
        },
        (err) => console.log(err)
      );
  };

  const updateCounter = (id: string, newValue: Room["counter"]) => {
    db.collection("rooms")
      .doc(id)
      .set({
        ...room,
        counter: newValue,
      });
  };

  useEffect(() => {
    if (roomId) observeRoom(roomId, setRoom);
  }, [roomId]);

  if (!room) return <P>loading room...</P>;

  const increment = () => {
    updateCounter(roomId, room.counter ? room.counter + 1 : 1);
  };

  const decrement = () => {
    updateCounter(roomId, room.counter ? room.counter - 1 : 0);
  };

  return (
    <>
      <pre>{JSON.stringify(room, null, 2)}</pre>
      <button onClick={decrement}>decrement</button>
      <button onClick={increment}>increment</button>
    </>
  );
};

export default RoomPage;
