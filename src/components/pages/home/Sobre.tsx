import { SobreContainer, SobreContent } from "@/src/styles/components/sobre";
import Image from "next/image";
export const Sobre = () => {
  return (
    <>
      <SobreContainer>
        <h1>ACs - UPE</h1>
        <SobreContent>
          <Image src="/home_image.png" alt={""} width={300} height={300} />
          <p>
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
          </p>
        </SobreContent>
      </SobreContainer>
    </>
  );
};
