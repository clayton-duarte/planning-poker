import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";

import { styled } from "../providers/theme";

const Button = styled.button`
  background: ${(props) => props.theme.palette.PRIMARY};
  font-family: ${(props) => props.theme.font.FAMILY};
  padding: ${(props) => props.theme.shape.PADDING};
  margin: ${(props) => props.theme.shape.MARGIN};
  color: ${(props) => props.theme.palette.BG};
  text-transform: uppercase;
  border: none;
  &:active,
  &:focus {
    outline: none;
  }
`;

const HomePage: FunctionComponent = () => {
  const router = useRouter();
  return (
    <>
      <h1>Home</h1>
      <Button onClick={() => router.push("/room/asd")}>join room</Button>
      <Button onClick={() => router.push("/room")}>create room</Button>
    </>
  );
};

export default HomePage;
