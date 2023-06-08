import {
  CancelButton,
  ConfirmButton,
  ModalContainer,
  ModalOverlay,
  DivButton,
} from "@/src/styles/components/modalRascunho/style";
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

export const ModalRascunho = ({ closeModal }: any) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <h1>
          Você deseja salvar o <span>rascunho</span> dessa requisição?
        </h1>
        <DivButton>
          <CancelButton onClick={closeModal}>
            <AiFillCloseCircle size={32} color="red" />
          </CancelButton>
          <ConfirmButton>
            <AiOutlineCheckCircle size={32} color="white" />
          </ConfirmButton>
        </DivButton>
      </ModalContainer>
    </ModalOverlay>
  );
};
