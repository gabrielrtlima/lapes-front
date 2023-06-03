import nookies, { parseCookies } from "nookies"
import { ProtocoloRascunho } from "@/src/components/pages/protocolo/FormProtocolo"

export const saveDataInCookie = async (data: ProtocoloRascunho[], key: string) => {
  if (data[0].certificados.length < 0) {
    return
  }
  
  const dataJson = JSON.stringify(data)
  nookies.set(null, key, dataJson, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/protocolo"
  })

  const fileBlobs = []
  for (let i = 0; i < data[0].certificadosFile.length; i++) {
    const blob = new Blob([data[0].certificadosFile[i]], { type: "application/pdf" })
    fileBlobs.push(blob)
  }
  const base64Array = fileBlobs.map(file => {
    return new Promise(async (resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.readAsDataURL(file);
    });
  });
  

  Promise.all(base64Array).then((base64Strings) => {
    const maxCookies = 10; // Número máximo de cookies
    const totalStrings = base64Strings.length;
    const chunkSize = Math.ceil(totalStrings / maxCookies);
    
    let remainingStrings = base64Strings.slice(); // Cria uma cópia da matriz original
    
    for (let i = 0; i < maxCookies; i++) {
      const base64Chunk = remainingStrings.splice(0, chunkSize);
      const cookieName = `filesBase64_${i}`;
      console.log(base64Chunk)
      nookies.set(null, cookieName, JSON.stringify(base64Chunk), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/protocolo",
      });
    
      if (remainingStrings.length === 0) {
        break;
      }
    }
    
    nookies.set(null, "numFilesCookies", maxCookies.toString(), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/protocolo",
    });
  });
}

export function getFilesFromCookie() {
  const cookies = parseCookies();
  const numCookies = parseInt(cookies.numFilesCookies);

  let base64Strings: any[] = [];
  for (let i = 0; i < numCookies; i++) {
    const cookieName = `filesBase64_${i}`;
    const cookieValue = cookies[cookieName];

    if (cookieValue) {
      const base64Chunk = JSON.parse(cookieValue);
      base64Strings = base64Strings.concat(base64Chunk);
    }
  }

  const blobs = base64Strings.map((base64String) => base64ToBlob(base64String));
  const files = blobs.map((blob) => new File([blob], "file")); // Pode ajustar o nome do arquivo conforme necessário

  // Agora você tem o array de objetos File recuperados do cookie
  return files;
}

function base64ToBlob(base64String: string) {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "application/octet-stream" });
  return blob;
}

const blobToFile = (blob: any, fileName: any) => {
  const file = new File([blob], fileName)
  return file
}