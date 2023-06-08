import { FormLogin } from "../components/pages/home/FormLogin";
import { Sobre } from "../components/pages/home/Sobre";
import { HomeContainer } from "../styles/pages/home";

export default function Home() {
  return (
    <HomeContainer>
      <Sobre />
      <FormLogin />
    </HomeContainer>
  );
}
