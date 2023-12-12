import NotFound from "components/NotFound";
import PropTypes from "prop-types";
import React from "react";

const Error = ({ statusCode }) => statusCode && <NotFound code={statusCode} />;
Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

NotFound.getInitialProps = () => ({
	namespacesRequired: ['header']
});

NotFound.propTypes = {
  statusCode: PropTypes.string
}

export default Error;
