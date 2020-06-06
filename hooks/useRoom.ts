import { User } from "firebase";

import { auth, db, FieldValue } from "../lib/firebase";
import Axios from "axios";

import { Room } from "../lib/types";
import useUser from "./useUser";

const axiosInstance = Axios.create({
  baseURL: "https://swapi.dev/api/starships",
});

const useRoom = () => {
  const { createUser } = useUser();

  const createDisplayName = async () => {
    const {
      data: { count },
    } = await axiosInstance.get(`/`);

    const randomId = Math.ceil(Math.random() * count);

    const {
      data: { name },
    } = await axiosInstance.get(`/${randomId}`);
    console.log("createDisplayName", name);

    return name;
  };

  const addParticipant = async (roomId: string) => {
    if (!auth.currentUser) await createUser();
    if (auth.currentUser) {
      console.log("addParticipant", auth.currentUser.uid);
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

  const observeRoom = async (
    roomId: string,
    cb: (data: Room) => void,
    err: (error: Error) => void
  ) => {
    const doc = db.collection("rooms").doc(roomId);
    if (!(await doc.get()).exists) return err(new Error("Room not found"));
    await addParticipant(roomId);

    doc.onSnapshot(
      (roomSnapshot) => {
        if (roomSnapshot.exists) return cb(roomSnapshot.data() as Room);
      },
      (err) => console.log(err)
    );
  };

  const updateCounter = (roomId: string, newValue: Room["counter"]) => {
    db.collection("rooms")
      .doc(roomId)
      .update({
        counter: FieldValue.increment(newValue),
      });
  };

  return { observeRoom, updateCounter, createNewRoom };
};

export default useRoom;
