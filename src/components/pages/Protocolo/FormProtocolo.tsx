import { useContext, useEffect, useState } from "react";
import {
  DragContainer,
  FileEdit,
  FileContainer,
  FormContainer,
  NullContainer,
  SubmitButton,
  FileContent,
  FileHeader,
  DivButtons,
  CancelButton,
} from "@/src/styles/components/formProtocolo/style";
import { AiOutlineClose } from "react-icons/ai";
import { BsFiletypePdf } from "react-icons/bs";
import { ModalFileData } from "./ModalFileData";
import { FilesContext } from "@/src/contexts/files-context";
import {
  CertificadoDTO,
  ProtocoloDTO,
  ProtocoloDadosDTO,
} from "@/src/utils/types";
import { ModalRascunho } from "./ModalRascunho";

export const FormProtocolo = ({ closeProtocoloModal }: any) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [openModalSalvarRascunho, setOpenModalSalvarRascunho] =
    useState<boolean>(false);
  const [isFilesDataComplete, setIsFilesDataComplete] = useState(false);
  const [protocoloDTO, setProtocoloDTO] = useState<ProtocoloDTO>();
  const [certificadoDTO, setCertificadoDTO] = useState<CertificadoDTO[]>([]);
  const [protocoloDadosDTO, setProtocoloDadosDTO] =
    useState<ProtocoloDadosDTO>();

  const {
    setFiles: setFilesInContext,
    setCertificadoDTO: setCertificadoInContext,
  } = useContext(FilesContext);

  useEffect(() => {
    verifyCertificadoPreenchido();
  }, [certificadoDTO]);
  const openModal = (index: number) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    console.log("close");
    setOpenModalIndex(null);
  };

  const openModalRascunho = () => {
    setOpenModalSalvarRascunho(true);
  };

  //TODO: Criar lógica de salvar rascunho
  const closeModalRascunhoSemSalvar = () => {
    setOpenModalSalvarRascunho(false);
    closeProtocoloModal();
  };

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setDragging(false);

    const newFiles = Array.from(event.dataTransfer.files as File[]);

    const newCertificadoDTO = newFiles.map((file) => ({
      titulo: "",
      descricao: "",
      atividadeId: 1,
      dataCertificado: "",
      horas: 0,
      status: "rascunho",
      nomeArquivo: file.name,
    }));

    setFiles([...files, ...newFiles]);
    setCertificadoDTO([...certificadoDTO, ...newCertificadoDTO]);
    setFilesInContext([...files, ...newFiles]);
    setCertificadoInContext([...certificadoDTO, ...newCertificadoDTO]);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    const updatedCertificadoDTO = [...certificadoDTO];
    updatedFiles.splice(index, 1);
    updatedCertificadoDTO.splice(index, 1);
    setFiles(updatedFiles);
    setCertificadoDTO(updatedCertificadoDTO);
  };

  const handleCertificadoDTO = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number,
    label: keyof CertificadoDTO
  ) => {
    const updatedCertificado = [...certificadoDTO];

    updatedCertificado[index] = {
      ...updatedCertificado[index],
      [label]: event.target.value,
    };

    setCertificadoDTO(updatedCertificado);
  };

  const handleFileStatus = (index: number, status: string) => {
    const updatedCertificadoDTO = [...certificadoDTO];
    updatedCertificadoDTO[index] = {
      ...updatedCertificadoDTO[index],
      status,
    };
    setCertificadoDTO(updatedCertificadoDTO);
    closeModal();
  };

  const submitCertificate = async () => {
    setProtocoloDadosDTO({
      dataProtocolo: new Date().toISOString(),
      cursoId: 1, //TODO: MODIFICAR QND TIVER AUTENTICAÇÃO
      usuarioId: 1, //TODO: MODIFICAR QND TIVER AUTENTICAÇÃO
      qtdCertificados: certificadoDTO.length,
      semestre: 1, //TODO: MODIFICAR QUANDO TIVER AUTENTICAÇÃO
    });

    setProtocoloDTO({
      protocoloArquivo: null, //TODO: MODIFICAR QUANDO DISCUTIR SE VAI SER ENVIADO OU GERADO
      certificadosArquivos: files,
      dadosCertificados: certificadoDTO,
    });

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`certificados`, file);
    });
    formData.append(
      "certificadoMetadados",
      new Blob([JSON.stringify(certificadoDTO)], { type: "application/json" })
    );
    formData.append("protocolo", protocoloDTO?.protocoloArquivo!);

    const url = `http://localhost:8080/api/protocolo?data=${protocoloDadosDTO?.dataProtocolo}
                  &usuarioId=${protocoloDadosDTO?.usuarioId}&cursoId=${protocoloDadosDTO?.cursoId}
                  &semestre=${protocoloDadosDTO?.semestre}&qtdCertificados=${protocoloDadosDTO?.qtdCertificados}`;
    await fetch(url, {
      method: "POST",
      body: formData,
    });
  };

  const verifyCertificadoPreenchido = () => {
    const certificadoDTOCompleto = certificadoDTO.filter(
      (certificado) => certificado.status == "pronto" //TODO: DEFINIR NOME DOS STATUS
    );

    if (certificadoDTOCompleto.length == certificadoDTO.length) {
      setIsFilesDataComplete(true);
    } else {
      setIsFilesDataComplete(false);
    }
  };

  return (
    <FormContainer
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <DragContainer isDragging={dragging}>
        {certificadoDTO.length > 0 ? (
          <div>
            Você pode adicionar mais certificados!
            <span>
              Você já adicionou {certificadoDTO.length}{" "}
              {certificadoDTO.length == 1 ? "certificado" : "certificados"}
            </span>
          </div>
        ) : (
          <div>
            <BsFiletypePdf size={32} />
            Arraste os certificados e solte aqui
          </div>
        )}
      </DragContainer>
      {files.length == 0 ? (
        <NullContainer>
          Você ainda não adicionou nenhum certificado!<span>☹️</span>
        </NullContainer>
      ) : (
        <FileContainer>
          {certificadoDTO.map((file, index) => (
            <FileContent key={index} isRascunho={file.status == "rascunho"}>
              <FileHeader onClick={() => openModal(index)}>
                <BsFiletypePdf size={24} />
                <p>{file.nomeArquivo}</p>
              </FileHeader>
              <FileEdit isRascunho={file.status == "rascunho"}>
                <button onClick={() => openModal(index)}>
                  {file.status == "rascunho"
                    ? "Adicionar informações"
                    : "Editar informações"}
                </button>
                <button onClick={() => handleRemoveFile(index)}>
                  <AiOutlineClose size={18} />
                </button>
              </FileEdit>
              {openModalIndex === index && (
                <ModalFileData
                  closeModal={closeModal}
                  handleCertificadoDTO={handleCertificadoDTO}
                  handleFileStatus={handleFileStatus}
                  index={index}
                  certificadoDTO={file}
                  file={files[index]}
                />
              )}
            </FileContent>
          ))}
        </FileContainer>
      )}
      <DivButtons>
        <CancelButton onClick={openModalRascunho}>Cancelar</CancelButton>
        {files.length > 0 && (
          <SubmitButton
            // onClick={submitCertificate}
            disabled={!isFilesDataComplete}
          >
            enviar
          </SubmitButton>
        )}
      </DivButtons>
      {openModalSalvarRascunho && (
        <ModalRascunho closeModal={closeModalRascunhoSemSalvar} />
      )}
    </FormContainer>
  );
};
