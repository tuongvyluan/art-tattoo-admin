const AdminArtistPage = () => <p>Admin Artist</p>;

AdminArtistPage.getInitialProps = async () => ({
  namespacesRequired: ["header", "footer", "sidebar"],
});

export default AdminArtistPage;
