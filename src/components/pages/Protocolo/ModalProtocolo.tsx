import React from "react";
import { Protocolos } from "./ListaProtocolo";
import {
  ModalContainer,
  ModalContent,
} from "@/src/styles/components/formProtocolo/style";
import { FormProtocolo } from "./FormProtocolo";

interface ComponentProps {
  closeModal: () => void;
}

export const ModalProtocolo: React.FC<ComponentProps> = ({ closeModal }) => {
  return (
    <ModalContainer>
      <FormProtocolo closeProtocoloModal={closeModal} />
    </ModalContainer>
  );
};
