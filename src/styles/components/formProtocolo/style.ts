import styled from "styled-components";

export const FormContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${(props) => props.theme.colors.primary};
  height: 60vh;
  width: 60vw;
  margin: 30px auto;
  border-radius: 8px;
`;

export const SubmitButton = styled.button`
  border: 0;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.success};
  padding: 12px;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  text-transform: capitalize;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const NullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;

  span {
    font-size: 5rem;
  }
`;

export const DragContainer = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(isDragging) =>
    isDragging
      ? (props) => props.theme.colors.secondary
      : (props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textlink2};
  width: 90%;
  margin: 12px auto;
  min-height: 15%;
  border: #ccc dashed 1px;
  border-radius: 8px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  span {
    font-size: 12px;
    color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
  }
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60%;
  gap: 8px;
  overflow-y: auto;
`;

export const FileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

export const FileContent = styled.div<{ isRascunho: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.isRascunho ? props.theme.colors.failed : props.theme.colors.success};
  gap: 2px;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  border: 0;
  border-radius: 8px;
  flex-wrap: wrap;
`;

export const FileEdit = styled.div<{ isRascunho: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 100%;

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;

    text-transform: uppercase;
    color: ${(props) =>
      props.isRascunho
        ? props.theme.colors.textlink1
        : props.theme.colors.textlink2};
    font-weight: ${(props) => (props.isRascunho ? "600" : "400")};

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

export const ModalContainer = styled.div`
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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  border-radius: 4px;
  position: relative;

  height: 60vh;
  width: 60vw;

  h1 {
    text-align: center;
    width: 100%;
    font-weight: 500;
    font-size: 28px;
    color: ${(props) => props.theme.colors.textprimary};

    span {
      color: ${(props) => props.theme.colors.secondary};
    }
  }

  label {
    margin-top: 10px;
    font-weight: 400;
    font-size: 18px;
  }

  input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  textarea {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
  }

  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: 0;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const ModalConfirm = styled.button`
  padding: 8px;
  margin: 6px auto;
  border: 0;
  width: fit-content;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.success};
  color: #fff;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.98);
  }
`;

export const CancelButton = styled.button`
  background-color: ${(props) => props.theme.colors.box[1]};
  border: 0;
  padding: 12px;
  font-weight: 600;
  font-size: 18px;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
`;

export const DivButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  padding: 6px;
`;
