import styled from "styled-components";

export const SobreContainer = styled.div`
  display: flex;
  width: 50%;
  height: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 2px;
`;

export const SobreContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: 0.2s;

  img {
    width: 40%;
    height: 100%;
  }
  p {
    width: 60%;
  }

  &:hover {
    transition: 0.5s;
    transform: scale(1.04);
  }
`;
