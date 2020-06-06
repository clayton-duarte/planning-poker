import { User } from "firebase";
import Axios from "axios";

import { auth, db, FieldValue } from "../lib/firebase";
import { useRoomContext } from "../providers/room";
import { Room } from "../lib/types";
import useUser from "./useUser";

const axiosInstance = Axios.create({
  baseURL: "https://swapi.dev/api/starships",
});

const useRoom = () => {
  const { currentRoom, setRoom } = useRoomContext();
  const { createUser } = useUser();

  const createDisplayName = async () => {
    const {
      data: { count },
    } = await axiosInstance.get(`/`);
    const randomId = Math.ceil(Math.random() * count);
    const {
      data: { name },
    } = await axiosInstance.get(`/${randomId}`);

    return name;
  };

  const addParticipant = async (roomId: string) => {
    if (!auth.currentUser) await createUser();
    if (auth.currentUser) {
      db.collection("rooms")
        .doc(roomId)
        .update({
          participants: FieldValue.arrayUnion(auth.currentUser.uid),
        });
    }
  };

  const createNewRoom = async (host: User["uid"]) => {
    const displayName = await createDisplayName();
    const newRoom: Room = {
      participants: [],
      displayName,
      counter: 0,
      host,
    };
    const room = await db.collection("rooms").add(newRoom);
    return room;
  };

  const observeRoom = async (roomId: string) => {
    const doc = db.collection("rooms").doc(roomId);

    if (!(await doc.get()).exists) {
      throw new Error("Room not found");
    }

    await addParticipant(roomId);

    doc.onSnapshot(
      (roomSnapshot) => {
        if (roomSnapshot.exists) {
          return setRoom(roomSnapshot.data() as Room);
        }
      },
      (error) => {
        throw new Error(JSON.stringify(error));
      }
    );
  };

  const updateCounter = (roomId: string, newValue: Room["counter"]) => {
    db.collection("rooms")
      .doc(roomId)
      .update({
        counter: FieldValue.increment(newValue),
      });
  };

  return { currentRoom, observeRoom, updateCounter, createNewRoom };
};

export default useRoom;
