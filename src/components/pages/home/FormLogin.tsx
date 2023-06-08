import {
  BodyForm,
  InputContainer,
  FormContainer,
} from "@/src/styles/components/formLogin";
import Link from "next/link";

export const FormLogin = () => {
  return (
    <FormContainer>
      <h1>Login</h1>
      <BodyForm>
        <InputContainer>
          <label>Email</label>
          <input />
        </InputContainer>
        <InputContainer>
          <label>Senha</label>
          <input />
        </InputContainer>
        <Link href={""}>Ainda não tem sua conta? Clique aqui</Link>
        <button>Entrar</button>
      </BodyForm>
    </FormContainer>
  );
};
