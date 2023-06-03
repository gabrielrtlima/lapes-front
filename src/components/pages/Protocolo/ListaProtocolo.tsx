import { FilesContext } from "@/src/contexts/files-context";
import {
  DivButton,
  ListaBody,
  ListaContainer,
  ListaHeader,
  ProtocoloContainer,
} from "@/src/styles/components/listaProtocolo/style";
import React, { useContext, useState } from "react";
import { ModalProtocolo } from "./ModalProtocolo";

export interface Protocolos {
  id: number;
  data: string;
  certificados: number;
  status: string;
}

export const ListaProtocolo = () => {
  const { files, filesData } = useContext(FilesContext);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [sortConfig, setSortConfig] = useState<{
    key: null;
    direction: string | null;
  }>({ key: null, direction: "asc" });

  const [data, setData] = useState([
    {
      id: 10,
      data: "22-10-2004",
      certificados: 4,
      status: "rascunho",
    },
    {
      id: 19,
      data: "22-10-2003",
      certificados: 12,
      status: "em análise",
    },
    {
      id: 5,
      data: "22-10-2001",
      certificados: 3,
      status: "em análise",
    },
    {
      id: 1,
      data: "22-10-2010",
      certificados: 6,
      status: "em análise",
    },
  ]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key!] < b[sortConfig.key!]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key!] > b[sortConfig.key!]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: keyof {}) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <DivButton>
        <button onClick={() => setOpenModal(true)}>Enviar Protocolo</button>
      </DivButton>
      <ListaContainer>
        <ListaHeader>
          <tr>
            <th onClick={() => handleSort("id" as keyof {})}>
              ID{" "}
              {sortConfig.key === "id" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("data" as keyof {})}>
              Data{" "}
              {sortConfig.key === "data" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("certificados" as keyof {})}>
              Qtd. Certificados{" "}
              {sortConfig.key === "certificados" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("status" as keyof {})}>
              Status{" "}
              {sortConfig.key === "status" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("opcoes" as keyof {})}>
              Opções{" "}
              {sortConfig.key === "options" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
          </tr>
        </ListaHeader>
        <ListaBody>
          {sortedData.map((protocolo, index) => (
            <ProtocoloContainer key={index} status={protocolo.status}>
              <td>{protocolo.id}</td>
              <td>{protocolo.data}</td>
              <td>{protocolo.certificados}</td>
              <td>{protocolo.status}</td>
              <td>
                <a>Adicionar</a>
                <a>Excluir</a>
              </td>
            </ProtocoloContainer>
          ))}
        </ListaBody>
      </ListaContainer>
      {/* Abrir modal para o form protocolo*/}
      {openModal && <ModalProtocolo closeModal={closeModal} />}
    </>
  );
};
