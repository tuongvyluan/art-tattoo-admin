import NotFound from "components/NotFound";
import React from "react";
import { withTranslation } from "i18n";

const Error = ({ statusCode }) => statusCode && <NotFound code={statusCode} />;
Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { namespacesRequired: ["not-found"], statusCode };
};

export default withTranslation("not-found")(Error);
