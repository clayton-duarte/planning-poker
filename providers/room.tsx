import React, {
  createContext,
  FunctionComponent,
  useState,
  useContext,
  Dispatch,
} from "react";

import { Room } from "../lib/types";

const RoomStateCtx = createContext<Room | undefined>(undefined);
const RoomDispatchCtx = createContext<Dispatch<Room> | undefined>(undefined);

const Provider: FunctionComponent = ({ children }) => {
  const [room, setRoom] = useState<Room>();

  return (
    <RoomStateCtx.Provider value={room}>
      <RoomDispatchCtx.Provider value={setRoom}>
        {children}
      </RoomDispatchCtx.Provider>
    </RoomStateCtx.Provider>
  );
};

export const useRoomContext = () => {
  const currentRoom = useContext(RoomStateCtx);
  const setRoom = useContext(RoomDispatchCtx);

  if (!setRoom) throw new Error("useRoomContext called outside RoomProvider");

  return { currentRoom, setRoom };
};
export default Provider;
