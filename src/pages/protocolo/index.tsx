import { parseCookies } from "nookies";
import { ListaProtocolo } from "../../components/pages/Protocolo/ListaProtocolo";
import { ProtocoloRascunho } from "../../components/pages/Protocolo/FormProtocolo";
import { NextPageContext } from "next";
import { getFilesFromCookie } from "@/src/utils/protocolo/manageCookieData";

export default function Home({ protocoloRascunho }: { protocoloRascunho: ProtocoloRascunho }) {
  return(
    <>
      <ListaProtocolo/>
    </>
  )
}

// export async function getServerSideProps(ctx: NextPageContext) {
//   const { protocoloRascunho } = parseCookies(ctx)
//   getFilesFromCookie()
//   return {
//     props: {
//       protocoloRascunho: JSON.parse(protocoloRascunho)
//     }
//   }
// }
