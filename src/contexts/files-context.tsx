import { useState, ReactNode, createContext } from 'react'

type Files = File[]

type FilesData = {
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
}[]

type FilesContextProviderProps = {
    children: ReactNode
}

type FilesContextProps = {
    files: Files
    setFiles: (files: Files) => void
    filesData: FilesData
    setFilesData: (filesData: FilesData) => void
}

export const FilesContext = createContext({} as FilesContextProps)

export function FilesContextProvider({ children }: FilesContextProviderProps) {
    const [filesData, setFilesData] = useState<FilesData>({} as FilesData)
    const [files, setFiles] = useState<Files>({} as Files)

    return (
        <FilesContext.Provider value={{
            files,
            setFiles,
            filesData,
            setFilesData
        }}>
            {children}
        </FilesContext.Provider>       
    )
}
