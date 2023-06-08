import styled from "styled-components";

export const FormContainer = styled.form`
  max-height: 50%;
  width: 30%;
  max-width: 35%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  padding: 4px;

  h1 {
    text-align: center;
    width: 100%;
  }
`;

export const BodyForm = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  margin-bottom: 4px;

  a {
    display: flex;
    justify-content: flex-start;
    width: 90%;
    margin: 0 auto;
    gap: 2px;
    text-decoration: none;
    color: ${(props) => props.theme.colors.textlink1};

    &:hover {
      filter: brightness(0.8);
      transition: 0.2s;
    }
  }

  button {
    display: flex;
    margin: 0 auto;
    padding: 12px 32px;
    width: fit-content;
    border-radius: 10px;
    border: 0;
    background-color: ${(props) => props.theme.colors.success};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  label {
    width: 90%;
    margin: 0 auto;
    color: ${(props) => props.theme.colors.box[1]};
    font-size: 16px;
  }

  input {
    width: 90%;
    background-color: ${(props) => props.theme.colors.background};
    border: 0;
    border-radius: 8px;
    padding: 12px;
    margin: 0 auto;
  }
  gap: 2px;
`;
