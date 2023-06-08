import { FilesContext } from "@/src/contexts/files-context";
import {
  DivButton,
  ListaBody,
  ListaContainer,
  ListaHeader,
  ProtocoloContainer,
} from "@/src/styles/components/listaProtocolo/style";
import React, { useContext, useEffect, useState } from "react";
import { ModalProtocolo } from "./ModalProtocolo";
import {
  AiFillFileAdd,
  AiFillEye,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

//TODO: Arrumar o tipo
export interface Protocolos {
  id: number | string;
  data: string;
  certificados: number;
  status: string;
}
export const ListaProtocolo = () => {
  const { files, certificadoDTO } = useContext(FilesContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [protocoloRascunho, setProtocoloRascunho] = useState<Protocolos>(
    {} as Protocolos
  );

  useEffect(() => {
    if (files?.length > 0) {
      setProtocoloRascunho({
        id: "#",
        data: new Date().toLocaleDateString(),
        certificados: files.length,
        status: "rascunho",
      });
    }
  }, [files]);

  const [sortConfig, setSortConfig] = useState<{
    key: null;
    direction: string | null;
  }>({ key: null, direction: "asc" });

  const [data, setData] = useState([
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

  const closeProtocoloModal = () => {
    console.log("chegou");
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
        <button onClick={() => setOpenModal(true)}>
          <AiFillFileAdd />
          Adicionar Protocolo
        </button>
      </DivButton>
      <ListaContainer>
        <ListaHeader>
          <tr>
            <th onClick={() => handleSort("id" as keyof {})}>
              ID{" "}
              {sortConfig.key === "id" && (
                <span>
                  {sortConfig.direction === "asc" ? (
                    <AiOutlineArrowUp />
                  ) : (
                    <AiOutlineArrowDown />
                  )}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("data" as keyof {})}>
              Data{" "}
              {sortConfig.key === "data" && (
                <span>
                  {sortConfig.direction === "asc" ? (
                    <AiOutlineArrowUp />
                  ) : (
                    <AiOutlineArrowDown />
                  )}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("certificados" as keyof {})}>
              Qtd. Certificados{" "}
              {sortConfig.key === "certificados" && (
                <span>
                  {sortConfig.direction === "asc" ? (
                    <AiOutlineArrowUp />
                  ) : (
                    <AiOutlineArrowDown />
                  )}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("status" as keyof {})}>
              Status{" "}
              {sortConfig.key === "status" && (
                <span>
                  {sortConfig.direction === "asc" ? (
                    <AiOutlineArrowUp />
                  ) : (
                    <AiOutlineArrowDown />
                  )}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("opcoes" as keyof {})}>Opções</th>
          </tr>
        </ListaHeader>
        <ListaBody
          isRascunho={true}
          isEmpty={Object.keys(protocoloRascunho).length == 0}
        >
          {protocoloRascunho && (
            <ProtocoloContainer
              key={protocoloRascunho.status}
              status={protocoloRascunho.status}
            >
              <td>{protocoloRascunho.id}</td>
              <td>{protocoloRascunho.data}</td>
              <td>{protocoloRascunho.certificados}</td>
              <td>{protocoloRascunho.status}</td>
              <td>
                <FaEdit />
                <BsTrash3 color="red" />
              </td>
            </ProtocoloContainer>
          )}
        </ListaBody>
        <ListaBody isRascunho={false}>
          {sortedData.map((protocolo, index) => (
            <ProtocoloContainer key={index} status={protocolo.status}>
              <td>{protocolo.id}</td>
              <td>{protocolo.data}</td>
              <td>{protocolo.certificados}</td>
              <td>{protocolo.status}</td>
              <td>
                <AiFillEye size={18} />
              </td>
            </ProtocoloContainer>
          ))}
        </ListaBody>
      </ListaContainer>
      {openModal && <ModalProtocolo closeModal={closeProtocoloModal} />}
    </>
  );
};
