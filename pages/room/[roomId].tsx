import React, { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";

import { styled } from "../../providers/theme";
import { auth } from "../../lib/firebase";
import useRoom from "../../hooks/useRoom";

const P = styled.p``;

const RoomPage: FunctionComponent = () => {
  const router = useRouter();
  const roomId = router.query.roomId as string;
  const { currentRoom, observeRoom, updateCounter } = useRoom();

  useEffect(() => {
    if (roomId) observeRoom(roomId);
  }, [roomId]);

  if (!currentRoom) return <P>loading room...</P>;

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
      <button onClick={decrement}>decrement</button>
      <button onClick={increment}>increment</button>
    </>
  );
};

export default RoomPage;
