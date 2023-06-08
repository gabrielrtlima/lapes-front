import { useState, ReactNode, createContext } from "react";
import { CertificadoDTO } from "../utils/types";

type FilesContextProviderProps = {
  children: ReactNode;
};

type FilesContextProps = {
  files: File[];
  setFiles: (files: File[]) => void;
  certificadoDTO: CertificadoDTO[];
  setCertificadoDTO: (certificadoDTO: CertificadoDTO[]) => void;
};

export const FilesContext = createContext({} as FilesContextProps);

export function FilesContextProvider({ children }: FilesContextProviderProps) {
  const [certificadoDTO, setCertificadoDTO] = useState<CertificadoDTO[]>();
  const [files, setFiles] = useState<File[]>();

  //TODO: Verificar os tipos (undefined)
  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
        certificadoDTO,
        setCertificadoDTO,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
}
