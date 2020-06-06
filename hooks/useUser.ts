import Axios from "axios";
import { User } from "firebase";

import { auth } from "../lib/firebase";

const axiosInstance = Axios.create({
  baseURL: "https://swapi.dev/api/people/",
});

const useUser = () => {
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

  const createUser = async () => {
    if (!auth.currentUser) await auth.signInAnonymously();
  };

  const userObserver = (cb: (user: User) => void) => {
    auth.onAuthStateChanged(async (user) => {
      if (user && auth.currentUser) {
        if (!user.displayName) {
          const displayName = await createDisplayName();
          auth.currentUser.updateProfile({ displayName });
        }
        return cb(user);
      }
      throw new Error("User not found");
    });
  };

  return { createUser, userObserver };
};

export default useUser;
