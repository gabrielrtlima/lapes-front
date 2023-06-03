import React from "react";
import { FileData } from "./FormProtocolo";
import { ModalClose, ModalConfirm, ModalContainer, ModalContent } from "@/src/styles/components/formProtocolo/style";
import { AiOutlineClose } from "react-icons/ai";

interface ChildComponent {
  closeModal: () => void,
  handleFileData: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index: number, label: keyof FileData) => void,
  handleFileStatus: (index: number, status: string) => void,
  file: FileData,
  index: number
}

export const ModalFileData: React.FC<ChildComponent> = ({ closeModal, handleFileData, handleFileStatus, file, index }) => {

  return (
    <ModalContainer>
      <ModalContent>
        <ModalClose onClick={closeModal}><AiOutlineClose size={24} color="red" /></ModalClose>
        <h1>Adicionar informações ao certificado: <span>{file.name}</span></h1>
        <label htmlFor="titulo">Titulo do certificado</label>
        <input
          type="text"
          id="titulo"
          onChange={(e) => handleFileData(e, index, "titulo")}
          {...(file.titulo && { value: file.titulo })}
        />
        <label htmlFor="descricao">Descrição do certificado</label>
        <textarea
          id="descricao"
          onChange={(e) => handleFileData(e, index, "descricao")}
          {...(file.descricao && { value: file.descricao })}
        />
        <label htmlFor="horas">Carga horária</label>
        <input
          type="number"
          id="horas"
          placeholder="Horas em minutos. Ex: 2 horas = 120"
          onChange={(e) => handleFileData(e, index, "horas")}
          {...(file.horas && { value: file.horas })}
        />
        <label htmlFor="eixo">Eixo</label>
        <select
          id="eixo"
          onChange={(e) => handleFileData(e, index, "eixo")}
          {...(file.eixo && { value: file.eixo })}
        >
          <option disabled selected>Escolha o eixo</option>
          <option value="1">Ensino</option>
          <option value="2">Pesquisa</option>
          <option value="3">Extensão</option>
          <option value="4">Gestão</option>
        </select>
        <ModalConfirm
          onClick={() => handleFileStatus(index, "pronto")}
        >Salvar informações</ModalConfirm>
      </ModalContent>
    </ModalContainer>
  )
}