import Login from "components/Login";

const LoginPage = () => <Login />;

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ["login"],
});

export default LoginPage;
