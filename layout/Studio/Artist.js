const StudioArtistPage = () => <p>Studio Artist</p>;

StudioArtistPage.getInitialProps = async () => ({
  namespacesRequired: ["header", "footer", "sidebar"],
});

export default StudioArtistPage;
