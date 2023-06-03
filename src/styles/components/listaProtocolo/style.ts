import styled from "styled-components";

export const ListaContainer = styled.table`
  background-color: ${props => props.theme.colors.primary};
  height: 70vh;
  width: 80vw;
  margin: 15px auto;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const ListaHeader = styled.thead`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;


  tr {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
  }

  th {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    border-right: 1px solid ${props => props.theme.colors.background};
    height: 32px;
    gap: 12px;

    &:last-child {
      border-right: none;
    }

    span {
      width: 90%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`

export const ListaBody = styled.tbody`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  gap: 4px;
  width: 100%;
  
  tr {
    display: flex;
    justify-content: space-between;
    padding: 6px;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.background};
  }

  td {
    text-align: center;
    width: 100%;
  }
`