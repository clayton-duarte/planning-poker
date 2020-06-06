import React, { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";

import Button from "../../components/Button";
import { auth } from "../../lib/firebase";
import useRoom from "../../hooks/useRoom";

const RoomPage: FunctionComponent = () => {
  const router = useRouter();
  const roomId = router.query.roomId as string;
  const { currentRoom, observeRoom, updateCounter } = useRoom();

  useEffect(() => {
    if (roomId) observeRoom(roomId);
  }, [roomId]);

  if (!currentRoom) return <p>loading room...</p>;

  const increment = () => {
    updateCounter(roomId, 1);
  };

  const decrement = () => {
    updateCounter(roomId, -1);
  };

  return (
    <>
      <pre>{JSON.stringify(currentRoom, null, 2)}</pre>
      <p>isHost: {String(currentRoom.host === auth.currentUser?.uid)}</p>
      <p>displayName: {auth.currentUser?.displayName}</p>
      <Button secondary onClick={decrement}>
        decrement
      </Button>
      <Button onClick={increment}>increment</Button>
    </>
  );
};

export default RoomPage;
