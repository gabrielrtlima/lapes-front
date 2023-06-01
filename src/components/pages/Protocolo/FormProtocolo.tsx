import { useEffect, useState } from "react";
import { DragContainer, FileEdit, FileContainer, FormContainer, ModalContainer, ModalContent, ModalConfirm, NullContainer, SubmitButton, FileContent, FileHeader, ModalClose} from "@/src/styles/components/formProtocolo";
import { AiOutlineClose } from "react-icons/ai";
import { BsFiletypePdf } from "react-icons/bs";

interface FileData {
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

export const FormProtocolo = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [isFilesDataComplete, setIsFilesDataComplete] = useState(false);

  useEffect(() => {
    verifyFilesDataIsComplete()
  }, [filesData])
  

  const openModal = (index: number) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
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
    setFiles([...files, ...newFiles]);
    setFilesData([...filesData, ...newFilesData]);

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

  const submitCertificate = async () => {

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`certificados`, file);
    })

    const protocoloJson = {
      "cursoId": null,
      "certificados": filesData.map(file => ({
        "descricao": file.descricao,
        "data": file.data,
        "semestre": file.semestre,
        "horas": file.horas,
        "chMaxima": file.chMaxima,
        "chTotal": file.chTotal,
        "atividadeId": file.atividadeId,
        "protocoloId": file.protocoloId
      }))
    }

    formData.append('protocoloJson', new Blob([JSON.stringify(protocoloJson)], {type: 'application/json'}));
    formData.append('protocolo', files[0]);

    const response = await fetch('http://localhost:8080/api/protocolo', {
      method: 'POST',
      body: formData
    })
    const data = await response.json();
    console.log(data);
  }

  const verifyFilesDataIsComplete = () => {
    const filesDataComplete = filesData.filter(file => file.status == 'pronto');
    if(filesDataComplete.length == filesData.length) {
      setIsFilesDataComplete(true);
    } else {
      setIsFilesDataComplete(false);
    }
  }

  return(
    <>
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
          </div> : <div><BsFiletypePdf size={32}/>Arraste os certificados e solte aqui</div>}
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
                  <ModalContainer>
                    <ModalContent>
                      <ModalClose onClick={closeModal}><AiOutlineClose size={24} color="red" /></ModalClose>
                      <h1>Adicionar informações ao certificado: <span>{file.name}</span></h1>
                      <label htmlFor="titulo">Titulo do certificado</label>
                      <input 
                        type="text" 
                        id="titulo" 
                        onChange={(e) => handleFileData(e, index, "titulo")}
                        {...(file.titulo && {value: file.titulo})}
                      />
                      <label htmlFor="descricao">Descrição do certificado</label>
                      <textarea 
                        id="descricao" 
                        onChange={(e) => handleFileData(e, index, "descricao")}
                        {...(file.descricao && {value: file.descricao})} 
                      />
                      <label htmlFor="horas">Carga horária</label>
                      <input 
                        type="number" 
                        id="horas" 
                        placeholder="Horas em minutos. Ex: 2 horas = 120"
                        onChange={(e) => handleFileData(e, index, "horas")} 
                        {...(file.horas && {value: file.horas})}
                      />
                      <label htmlFor="eixo">Eixo</label>
                      <select 
                        id="eixo" 
                        onChange={(e) => handleFileData(e, index, "eixo")}
                        {...(file.eixo && {value: file.eixo})}
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
                )}
              </FileContent>
            ))}
          </FileContainer>
        }
        {files.length > 0 && <SubmitButton 
          onClick={submitCertificate}
          disabled={!isFilesDataComplete}
        >enviar</SubmitButton>}
      </FormContainer>
    </>
    )
}
