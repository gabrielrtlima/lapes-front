import styled from "styled-components";

export const DivButton = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;

  button {
    display: flex;
    gap: 4px;
    align-items: center;
    border: 0;
    background-color: ${(props) => props.theme.colors.success};
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    color: ${(props) => props.theme.colors.textlink2};
    font-weight: bold;
    font-size: 16px;

    &:hover {
      transition: 0.3s;
      filter: brightness(0.9);
    }
  }
`;

export const ListaContainer = styled.table`
  background-color: ${(props) => props.theme.colors.primary};
  height: 70vh;
  width: 80vw;
  margin: 15px auto;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ListaHeader = styled.thead`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;

  tr {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
  }

  th {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    border-right: 1px solid ${(props) => props.theme.colors.background};
    height: 32px;
    gap: 12px;
    cursor: pointer;

    &:last-child {
      border-right: none;
      cursor: default;
    }

    span {
      width: 90%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`;

export const ListaBody = styled.tbody<{
  isRascunho: boolean;
  isEmpty?: boolean;
}>`
  display: ${(props) => (props.isEmpty ? "none" : "flex")};
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  gap: 4px;
  width: 100%;

  ${(props) => props.isRascunho && "border-bottom 1px dashed #000"};
`;

export const ProtocoloContainer = styled.tr<{ status: string }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 6px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.status === "rascunho"
      ? props.theme.colors.box[2]
      : props.theme.colors.box[1]};

  &:last-child {
    margin-bottom: 4px;
  }

  td {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    gap: 8px;
    text-transform: capitalize;

    svg {
      color: ${(props) => props.theme.colors.primary};
      cursor: pointer;
    }
  }
`;
