import React from "react";

import useRoom from "../hooks/useRoom";

export default () => {
  const { currentRoom } = useRoom();
  if (!currentRoom) return null;

  return (
    <header>
      Room: {currentRoom.displayName} [{currentRoom.participants.length}]
    </header>
  );
};
