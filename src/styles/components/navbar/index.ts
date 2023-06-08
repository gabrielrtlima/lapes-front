import styled from "styled-components";

export const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  h1 {
    margin: 0;
    font-family: "Jost";
    font-weight: 700;
    background-color: ${(props) => props.theme.colors.box[1]};
    color: ${(props) => props.theme.colors.background};
    padding: 6px 12px 6px 12px;
  }

  span {
    font-family: "Jost";
    font-weight: 700;
    font-style: italic;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
