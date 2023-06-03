import { useContext, useEffect, useState } from "react";
import { DragContainer, FileEdit, FileContainer, FormContainer, NullContainer, SubmitButton, FileContent, FileHeader } from "@/src/styles/components/formProtocolo/style";
import { AiOutlineClose } from "react-icons/ai";
import { BsFiletypePdf } from "react-icons/bs";
import { ModalFileData } from "./ModalFileData";
import { saveDataInCookie } from "@/src/utils/protocolo/manageCookieData";
import { FilesContext } from "@/src/contexts/files-context";
import Link from "next/link";

export interface FileData {
  name: string,
  size: number,
  type: string,
  status: string,
  titulo: string | null,
  descricao: string | null,
  horas: number | null,
  eixo: string | null,
  semestre: number | null,
  chMaxima: number | null,
  chTotal: number | null,
  data: string | null,
  atividadeId: number | null,
  protocoloId: number | null
}

export interface ProtocoloRascunho {
  cursoId: number | null,
  certificados: {
    descricao: string | null,
    data: string | null,
    semestre: number | null,
    horas: number | null,
    chMaxima: number | null,
    chTotal: number | null,
    atividadeId: number | null,
    protocoloId: number | null
  }[]
  data: string,
  qtdCertificado: number,
  status: string,
  certificadosFile: File[]
}

export const FormProtocolo = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [isFilesDataComplete, setIsFilesDataComplete] = useState(false);
  const [protocoloRascunho, setProtocoloRascunho] = useState<ProtocoloRascunho>({
    cursoId: null,
    certificados: [],
    data: new Date().toISOString(),
    qtdCertificado: 0,
    status: 'rascunho',
    certificadosFile: []
  })

  const {
    setFiles: setFilesInContext,
    setFilesData: setFilesDataInContext
  } = useContext(FilesContext)

  useEffect(() => {
    verifyFilesDataIsComplete()
  }, [filesData])

  const openModal = (index: number) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    saveDataInCookie([protocoloRascunho], "protocoloRascunho")
    setOpenModalIndex(null);
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
    const newFilesData = newFiles.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'rascunho',
      titulo: null,
      descricao: null,
      horas: null,
      eixo: null,
      semestre: 12,
      chMaxima: null,
      chTotal: null,
      atividadeId: null,
      protocoloId: null,
      data: null
    }));

    const newProtocoloJson = {
      qtdCertificado: newFiles.length,
      certificados: newFilesData.map(file => ({
        "descricao": file.descricao,
        "data": file.data,
        "semestre": file.semestre,
        "horas": file.horas,
        "chMaxima": file.chMaxima,
        "chTotal": file.chTotal,
        "atividadeId": file.atividadeId,
        "protocoloId": file.protocoloId
      })),
      certificadosFile: newFiles,
    }

    setFilesInContext([...files, ...newFiles])
    setFilesDataInContext([...filesData, ...newFilesData])

    setFiles([...files, ...newFiles]);
    setFilesData([...filesData, ...newFilesData]);
    setProtocoloRascunho({
      ...protocoloRascunho,
      ...newProtocoloJson
    })
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    const updatedFilesData = [...filesData];
    updatedFiles.splice(index, 1);
    updatedFilesData.splice(index, 1);
    setFiles(updatedFiles);
    setFilesData(updatedFilesData);
  }

  const handleFileData = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index: number, label: keyof FileData) => {
    const updatedData = [...filesData];
    updatedData[index] = {
      ...updatedData[index],
      [label]: event.target.value
    };
    setFilesData(updatedData);
  }

  const handleFileStatus = (index: number, status: string) => {
    const updatedData = [...filesData];
    updatedData[index] = {
      ...updatedData[index],
      status
    };
    setFilesData(updatedData);
    closeModal();
    console.log(filesData)
  }

  // const submitCertificate = async () => {

  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append(`certificados`, file);
  //   })
  //   formData.append('protocoloJson', new Blob([JSON.stringify(protocoloJson)], {type: 'application/json'}));
  //   formData.append('protocolo', files[0]);

  //   await fetch('http://localhost:8080/api/protocolo', {
  //     method: 'POST',
  //     body: formData
  //   })

  // }

  const verifyFilesDataIsComplete = () => {
    const filesDataComplete = filesData.filter(file => file.status == 'pronto');
    if (filesDataComplete.length == filesData.length) {
      setIsFilesDataComplete(true);
    } else {
      setIsFilesDataComplete(false);
    }
  }

  return (
    <FormContainer>
      <DragContainer
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        isDragging={dragging}
      >
        {filesData.length > 0 ? <div>Você pode adicionar mais certificados!
          <span>Você já adicionou {filesData.length} {filesData.length == 1 ? 'certificado' : 'certificados'}</span>
        </div> : <div><BsFiletypePdf size={32} />Arraste os certificados e solte aqui</div>}
      </DragContainer>
      {files.length == 0 ? <NullContainer>Você ainda não adicionou nenhum certificado!<span>☹️</span></NullContainer> :
        <FileContainer>
          {filesData.map((file, index) => (
            <FileContent
              key={index}
              isRascunho={file.status == 'rascunho'}
            >
              <FileHeader onClick={() => openModal(index)}>
                <BsFiletypePdf size={24} />
                <p>{file.name}</p>
              </FileHeader>
              <FileEdit isRascunho={file.status == 'rascunho'}>
                <button onClick={() => openModal(index)}>{file.status == 'rascunho' ? "Adicionar informações" : "Editar informações"}</button>
                <button onClick={() => handleRemoveFile(index)}><AiOutlineClose size={18} /></button>
              </FileEdit>
              {openModalIndex === index && (
                <ModalFileData closeModal={closeModal} handleFileData={handleFileData} handleFileStatus={handleFileStatus} index={index} file={file} />
              )}
            </FileContent>
          ))}
        </FileContainer>
      }
      {files.length > 0 && <SubmitButton
        // onClick={submitCertificate}
        disabled={!isFilesDataComplete}
      >enviar</SubmitButton>}
      <Link href={"/protocolo"}>
        <button>Teste</button>
      </Link>
    </FormContainer>

  )
}
