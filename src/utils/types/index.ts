export interface CertificadoDTO {
  titulo: string;
  descricao: string;
  dataCertificado: string;
  horas: number;
  atividadeId: number;
  status: string;
  nomeArquivo: string;
}

export interface CertificadoVO {
  id: number;
  titulo: string;
  descricao: string;
  dataCertificado: string;
  chMaxima: number;
  chTotal: number;
  certificadoArquivo: File;
}

export interface ProtocoloDadosDTO {
  dataProtocolo: string;
  cursoId: number;
  qtdCertificados: number;
  usuarioId: number;
  semestre: number;
}

export interface ProtocoloDTO {
  protocoloArquivo: File | null;
  certificadosArquivos: File[];
  dadosCertificados: CertificadoDTO[];
}

export interface ProtocoloVO {
  id: number;
  descricao: string;
  dataProtocolo: string;
  qtdCertificados: number;
  token: string;
  protocoloArquivo: File[];
  dadosCertificados: CertificadoDTO[];
}
