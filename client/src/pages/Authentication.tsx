import AutheticationPage from "../features/authentication/index";

export interface AuthenticationProps {
  type: string;
}

const Authentication = ({ type }: AuthenticationProps) => {
  return (
    <>
      <AutheticationPage login={type} />
    </>
  );
};

export default Authentication;
