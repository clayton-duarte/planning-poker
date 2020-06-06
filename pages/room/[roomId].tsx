import React, { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { styled } from "../../providers/theme";
import { auth } from "../../lib/firebase";
import useRoom from "../../hooks/useRoom";
import { Room } from "../../lib/types";

const P = styled.p``;

const RoomPage: FunctionComponent = () => {
  const router = useRouter();
  const roomId = router.query.roomId as string;
  const { observeRoom, updateCounter } = useRoom();
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    if (roomId)
      observeRoom(roomId, setRoom, () => {
        router.push("/");
      });
  }, [roomId]);

  if (!room) return <P>loading room...</P>;

  const increment = () => {
    updateCounter(roomId, 1);
  };

  const decrement = () => {
    updateCounter(roomId, -1);
  };

  return (
    <>
      <pre>{JSON.stringify(room, null, 2)}</pre>
      <p>Room: {room.displayName}</p>
      <p>isHost: {String(room.host === auth.currentUser?.uid)}</p>
      <p>displayName: {auth.currentUser?.displayName}</p>
      <button onClick={decrement}>decrement</button>
      <button onClick={increment}>increment</button>
    </>
  );
};

export default RoomPage;
