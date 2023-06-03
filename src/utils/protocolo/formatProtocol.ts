export const formatProtocol = async (data: any) => {
  const formatedProtocol = await data.map((item: any) => {
    const newItem = {
      protocoloId: 'rascunho',
      quantidadeCertificados: item.certificados.length,
      ...item
    }
    return newItem
  })
}