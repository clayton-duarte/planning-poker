import React from "react";

import useRoom from "../hooks/useRoom";
import { styled } from "../providers/theme";

const Header = styled.header`
  color: ${(props) => props.theme.palette.PRIMARY};
  padding: ${(props) => props.theme.shape.PADDING};
  text-transform: capitalize;
`;

export default () => {
  const { currentRoom } = useRoom();
  if (!currentRoom) return null;

  return (
    <Header>
      Room: {currentRoom.displayName} [{currentRoom.participants.length}]
    </Header>
  );
};
