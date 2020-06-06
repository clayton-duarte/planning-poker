import React, { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";

import useRoom from "../../hooks/useRoom";
import useUser from "../../hooks/useUser";

const EmptyRoomPage: FunctionComponent = () => {
  const { createUser, userObserver } = useUser();
  const { createNewRoom } = useRoom();
  const router = useRouter();

  useEffect(() => {
    createUser(true);
    userObserver(async (user) => {
      const room = await createNewRoom(user.uid);
      router.push(`/room/${room.id}`);
    });
  }, []);

  return <p>creating room...</p>;
};

export default EmptyRoomPage;
