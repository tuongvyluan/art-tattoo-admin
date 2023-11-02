import Register from "components/Register";

const RegisterPage = () => <Register />;

RegisterPage.getInitialProps = async () => ({
  namespacesRequired: ["register"],
});

export default RegisterPage;
