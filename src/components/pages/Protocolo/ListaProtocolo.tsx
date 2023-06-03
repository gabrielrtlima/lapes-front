import { ListaBody, ListaContainer, ListaHeader } from "@/src/styles/components/listaProtocolo/style"
import React, { useEffect, useState } from "react";


export interface Protocolos {
  id: number,
  data: string,
  certificados: number,
  status: string
}

export const ListaProtocolo = () => {
  const [protocolosData, setProtocolosData] = useState<Protocolos[]>([
    {
      id: 1,
      data: '01/01/2021',
      certificados: 10,
      status: 'enviado'
    },
    {
      id: 2,
      data: '01/01/2021',
      certificados: 3,
      status: 'aguardando avaliação'
    },
    {
      id: 3,
      data: '01/01/2021',
      certificados: 6,
      status: 'rascunho'
    },
    {
      id: 4,
      data: '01/01/2021',
      certificados: 4,
      status: 'rascunho'
    }
  ]);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const [sortConfig, setSortConfig] = useState<{ key: null; direction: string | null }>({ key: null, direction: 'asc' });

  const openModal = (index: number) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  const handleSort = (key: keyof {}) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <ListaContainer>
        <ListaHeader>
          <tr>
            <th>id</th>
            <th>data</th>
            <th>Qtd. Certificados</th>
            <th>Status</th>
            <th>Opções</th>
          </tr>
          {/* <tr>
            <th onClick={() => handleSort('id' as keyof {})}>ID {sortConfig.key === 'id' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}</th>
            <th onClick={() => handleSort('certificados' as keyof {} )}>Certificados {sortConfig.key === 'certificados' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}</th>
            <th onClick={() => handleSort('data' as keyof {})}>Data {sortConfig.key === 'data' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}</th>
            <th onClick={() => handleSort('status' as keyof {})}>Status {sortConfig.key === 'status' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}</th>
            <th onClick={() => handleSort('options' as keyof {})}>Opções {sortConfig.key === 'options' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}</th>
          </tr> */}
        </ListaHeader>
        <ListaBody>
          {protocolosData.map((protocolo, index) => (
            <>
              <tr key={index}>
                <td>{protocolo.id}</td>
                <td>{protocolo.data}</td>
                <td>{protocolo.certificados}</td>
                <td>{protocolo.status}</td>
                <td>
                  <button>Editar</button>
                  <button>Excluir</button>
                </td>
              </tr>
            </>
          ))}
        </ListaBody>
      </ListaContainer>
    </>
  )
}
