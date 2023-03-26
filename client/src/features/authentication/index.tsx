import { useParams } from "react-router";
import { BackgroundAuthStyled } from "../../component/ui/authBackground/BackgroundAuthStyled";
import Login from "./login/index";
import Signup from "./signup/index";

interface Props {
  login: string;
}

const AutheticationPage = ({ login }: Props) => {
  const { type } = useParams();
  const auth = login ? login : type;

  return (
    <>
      <BackgroundAuthStyled
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {auth === "login" ? (
          <Login />
        ) : auth === "signup" ? (
          <Signup />
        ) : (
          <h1>404</h1>
        )}
      </BackgroundAuthStyled>
    </>
  );
};

export default AutheticationPage;
