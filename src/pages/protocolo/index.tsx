import { parseCookies } from "nookies";
import { ListaProtocolo } from "@/src/components/pages/protocolo/ListaProtocolo";
import { ProtocoloRascunho } from "@/src/components/pages/protocolo/FormProtocolo";
import { NextPageContext } from "next";
import { getFilesFromCookie } from "@/src/utils/protocolo/manageCookieData";

export default function Home({ protocoloRascunho }: { protocoloRascunho: ProtocoloRascunho }) {
  return(
    <>
      <ListaProtocolo protocolos={protocoloRascunho}/>
    </>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { protocoloRascunho } = parseCookies(ctx)
  getFilesFromCookie()
  return {
    props: {
      protocoloRascunho: JSON.parse(protocoloRascunho)
    }
  }
}