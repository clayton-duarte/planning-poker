import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";

import Button from "../components/Button";

const HomePage: FunctionComponent = () => {
  const router = useRouter();
  return (
    <>
      <h1>Home</h1>
      <Button disabled onClick={() => router.push("/room/asd")}>
        join room
      </Button>
      <Button onClick={() => router.push("/room")}>create room</Button>
    </>
  );
};

export default HomePage;
