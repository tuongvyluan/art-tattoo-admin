import Dashboard from "components/Dashboard";

const DashboardPage = () => <Dashboard />;

DashboardPage.getInitialProps = async () => ({
  namespacesRequired: ["header", "footer", "sidebar", "dashboard"],
});

export default DashboardPage;
