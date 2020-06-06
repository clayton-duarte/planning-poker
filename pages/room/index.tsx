import React, { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";

import { db } from "../../lib/firebase";

const EmptyRoomPage: FunctionComponent = () => {
  const router = useRouter();

  const createRoom = async () => {
    const room = await db.collection("rooms").add({
      host: "host name",
    });
    router.push(`/room/${room.id}`);
  };

  useEffect(() => {
    createRoom();
  }, []);

  return <p>creating room...</p>;
};

export default EmptyRoomPage;
