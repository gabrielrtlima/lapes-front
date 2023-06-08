import React from "react";
import {
  ModalClose,
  ModalConfirm,
  ModalContainer,
  ModalContent,
} from "@/src/styles/components/formProtocolo/style";
import { AiOutlineClose } from "react-icons/ai";
import { CertificadoDTO } from "@/src/utils/types";

interface ChildComponent {
  closeModal: () => void;
  handleCertificadoDTO: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number,
    label: keyof CertificadoDTO
  ) => void;
  handleFileStatus: (index: number, status: string) => void;
  certificadoDTO: CertificadoDTO;
  file: File;
  index: number;
}

export const ModalFileData: React.FC<ChildComponent> = ({
  closeModal,
  handleCertificadoDTO,
  handleFileStatus,
  certificadoDTO,
  file,
  index,
}) => {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalClose onClick={closeModal}>
          <AiOutlineClose size={24} color="red" />
        </ModalClose>
        <h1>
          Adicionar informações ao certificado: <span>{file.name}</span>
        </h1>
        <label htmlFor="titulo">Titulo do certificado</label>
        <input
          type="text"
          id="titulo"
          onChange={(e) => handleCertificadoDTO(e, index, "titulo")}
          {...(certificadoDTO.titulo && { value: certificadoDTO.titulo })}
        />
        <label htmlFor="descricao">Descrição do certificado</label>
        <textarea
          id="descricao"
          onChange={(e) => handleCertificadoDTO(e, index, "descricao")}
          {...(certificadoDTO.descricao && { value: certificadoDTO.descricao })}
        />
        <label htmlFor="horas">Carga horária</label>
        <input
          type="number"
          id="horas"
          placeholder="Horas em minutos. Ex: 2 horas = 120"
          onChange={(e) => handleCertificadoDTO(e, index, "horas")}
          {...(certificadoDTO.horas && { value: certificadoDTO.horas })}
        />
        <label htmlFor="eixo">Eixo</label>
        <select
          id="eixo"
          defaultValue={0}
          // onChange={(e) => handleFileData(e, index, "eixo")}
          // {...(certificadoDTO.eixo && { value: certificadoDTO.eixo })}
        >
          <option disabled value={0}>
            Escolha o eixo
          </option>
          <option value="1">Ensino</option>
          <option value="2">Pesquisa</option>
          <option value="3">Extensão</option>
          <option value="4">Gestão</option>
        </select>
        <ModalConfirm onClick={() => handleFileStatus(index, "pronto")}>
          Salvar informações
        </ModalConfirm>
      </ModalContent>
    </ModalContainer>
  );
};
