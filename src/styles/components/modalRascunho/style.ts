import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${(props) => props.theme.colors.box[2]};
  padding: 20px;
  border-radius: 12px;
  position: relative;
  max-height: 25vh;
  width: 25vw;

  h1 {
    text-align: center;
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    color: ${(props) => props.theme.colors.textlink2};

  span {
    font-weight: 600;
    color: ${(props) => props.theme.colors.box[3]};
  }
  
`;

export const DivButton = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: flex-end;
  margin-top: 8px;
`;

export const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  border: 0;
  background-color: ${(props) => props.theme.colors.failed};
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
    transition: 0.2s;
  }
`;

export const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  border: 0;
  background-color: ${(props) => props.theme.colors.success};
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
    transition: 0.2s;
  }
`;
