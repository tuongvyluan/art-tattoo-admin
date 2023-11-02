import { Link, Ripple } from "ui";

import HTTPStatus from "http-status";
import Illustration from "public/images/illustrations/undraw_filing_system_b5d2.svg";
import { useTranslation } from "i18n";

const NotFound = ({ code }) => {
  const { t } = useTranslation("notFound");
  const title = code === 404 ? t("404") : HTTPStatus[code] || t("unexpected");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full text-center">
      <div className="w-full">
        <Illustration width={300} height={300} className="inline-block" />
        <h1
          className={`${
            code === 404 ? "text-yellow-500" : "text-red-500"
          } text-4xl mb-0 font-bold leading-none uppercase`}
        >
          {t("error")} {code}
        </h1>
        <h6 className="mt-0 mb-2">
          {t("title")} {title}{" "}
        </h6>
        <Link href="/" as={``}>
          <a className="relative inline-flex justify-center rounded-lg border border-transparent px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
            {t("backButton")}
            <Ripple color="black" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
