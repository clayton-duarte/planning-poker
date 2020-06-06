import { styled, Theme } from "../providers/theme";

const Button = styled.button`
  color: ${({ theme, secondary }: { theme: Theme; secondary?: boolean }) =>
    secondary ? theme.palette.SECONDARY : theme.palette.PRIMARY};
  border-color: ${({
    theme,
    secondary,
  }: {
    theme: Theme;
    secondary?: boolean;
  }) => (secondary ? theme.palette.SECONDARY : theme.palette.PRIMARY)};
  font-family: ${(props) => props.theme.font.FAMILY};
  background: ${(props) => props.theme.palette.BG};
  padding: ${(props) => props.theme.shape.PADDING};
  margin: ${(props) => props.theme.shape.MARGIN};
  text-transform: uppercase;
  border-width: 0.125rem;
  border-style: outset;
  cursor: pointer;
  &:active,
  &:focus,
  &:hover {
    border-style: inset;
    outline: none;
  }
  &:disabled {
    border-color: ${(props) => props.theme.palette.DISABLED};
    color: ${(props) => props.theme.palette.DISABLED};
    pointer-events: none;
  }
`;

export default Button;
